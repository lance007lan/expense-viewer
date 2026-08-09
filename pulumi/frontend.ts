import * as path from 'path';
import * as aws from '@pulumi/aws';
import * as synced from '@pulumi/synced-folder';
import { appName } from './config';

// ── S3 — static hosting for both frontend apps ───────────────────────────
//
// One shared bucket serves both host (frontend/host) and its Module
// Federation remote (frontend/charts-remote) — e.g. host's build at the
// bucket root, charts-remote's build under a /charts-remote/ prefix.
// Sharing one bucket/domain also means they're same-origin, so the
// remote's JS doesn't need CORS the way it would if each app had its own
// bucket/domain.

const current = aws.getCallerIdentity({});

export const frontendBucket = new aws.s3.Bucket(`${appName}-frontend`, {
    bucket: current.then((c) => `${appName}-frontend-${c.accountId}`),
});

export const frontendWebsite = new aws.s3.BucketWebsiteConfigurationV2(
    `${appName}-frontend-website`,
    {
        bucket: frontendBucket.id,
        indexDocument: { suffix: 'index.html' },
        // Route all 404s back to index.html so React Router works.
        errorDocument: { key: 'index.html' },
    },
);

const frontendPublicAccess = new aws.s3.BucketPublicAccessBlock(
    `${appName}-frontend-public-access`,
    {
        bucket: frontendBucket.id,
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
    },
);

new aws.s3.BucketPolicy(
    `${appName}-frontend-policy`,
    {
        bucket: frontendBucket.id,
        policy: frontendBucket.arn.apply((arn) =>
            JSON.stringify({
                Version: '2012-10-17',
                Statement: [
                    {
                        Effect: 'Allow',
                        Principal: '*',
                        Action: 's3:GetObject',
                        Resource: `${arn}/*`,
                    },
                ],
            }),
        ),
    },
    { dependsOn: [frontendPublicAccess] },
);

// AWS defaults new buckets to ACLs disabled ("Bucket owner enforced").
// S3BucketFolder below requires an acl, so ACLs need to be explicitly
// allowed — public read access itself still comes from the bucket
// policy above, not from these per-object ACLs.
const frontendOwnershipControls = new aws.s3.BucketOwnershipControls(
    `${appName}-frontend-ownership`,
    {
        bucket: frontendBucket.id,
        rule: { objectOwnership: 'ObjectWriter' },
    },
);

// Syncs frontend/dist-deploy/ (see frontend/build-for-deploy.sh) to the
// bucket root: host's build at the root, charts-remote's build under
// dist-deploy/charts-remote/ → served at <site>/charts-remote/.
// managedObjects: false delegates to the aws CLI instead of tracking
// every hashed build artifact as an individual Pulumi resource.
new synced.S3BucketFolder(
    `${appName}-frontend-folder`,
    {
        path: path.join(__dirname, '..', 'frontend', 'dist-deploy'),
        bucketName: frontendBucket.bucket,
        acl: 'public-read',
        managedObjects: false,
    },
    { dependsOn: [frontendOwnershipControls, frontendPublicAccess] },
);
