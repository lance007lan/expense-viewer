import { k3sInstance } from './compute';
import { userPool, userPoolClient } from './cognito';
import { frontendBucket, frontendWebsite } from './frontend';

export const k3sPublicIp = k3sInstance.publicIp;
export const cognitoUserPoolId = userPool.id;
export const cognitoUserPoolClientId = userPoolClient.id;
export const frontendBucketName = frontendBucket.id;
export const frontendUrl = frontendWebsite.websiteEndpoint.apply(
    (endpoint) => `http://${endpoint}`,
);
