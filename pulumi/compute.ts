import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as aws from '@pulumi/aws';
import { appName } from './config';
import { vpc, publicSubnets } from './networking';

// ── Security group — SSH, HTTP/HTTPS, k3s API ────────────────────────────

const k3sSecurityGroup = new aws.ec2.SecurityGroup(`${appName}-k3s-sg`, {
    description: 'SSH, HTTP/HTTPS, and k3s API access',
    vpcId: vpc.id,
    ingress: [
        { description: 'SSH', fromPort: 22, toPort: 22, protocol: 'tcp', cidrBlocks: ['0.0.0.0/0'] },
        { description: 'HTTP', fromPort: 80, toPort: 80, protocol: 'tcp', cidrBlocks: ['0.0.0.0/0'] },
        { description: 'HTTPS', fromPort: 443, toPort: 443, protocol: 'tcp', cidrBlocks: ['0.0.0.0/0'] },
        { description: 'k3s API (kubectl access)', fromPort: 6443, toPort: 6443, protocol: 'tcp', cidrBlocks: ['0.0.0.0/0'] },
    ],
    egress: [{ fromPort: 0, toPort: 0, protocol: '-1', cidrBlocks: ['0.0.0.0/0'] }],
});

// ── SSH key pair — imports your existing local public key ───────────────

const localPublicKeyPath = path.join(os.homedir(), '.ssh', 'id_rsa.pub');

const keyPair = new aws.ec2.KeyPair(`${appName}-k3s-key`, {
    keyName: `${appName}-k3s`,
    publicKey: fs.readFileSync(localPublicKeyPath, 'utf-8'),
});

// ── EC2 instance running k3s ──────────────────────────────────────────────

const ubuntuArm64Ami = aws.ec2.getAmi({
    mostRecent: true,
    owners: ['099720109477'], // Canonical
    filters: [
        { name: 'name', values: ['ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-arm64-server-*'] },
        { name: 'virtualization-type', values: ['hvm'] },
        { name: 'architecture', values: ['arm64'] },
    ],
});

export const k3sInstance = new aws.ec2.Instance(`${appName}-k3s`, {
    ami: ubuntuArm64Ami.then((ami) => ami.id),
    instanceType: 't4g.micro',
    subnetId: publicSubnets[0].id,
    vpcSecurityGroupIds: [k3sSecurityGroup.id],
    keyName: keyPair.keyName,
    associatePublicIpAddress: true,
    rootBlockDevice: {
        volumeSize: 20,
        volumeType: 'gp3',
    },
    // Installs k3s automatically on first boot — no manual SSH step needed.
    userData: `#!/bin/bash\ncurl -sfL https://get.k3s.io | sh -\n`,
    tags: { Name: `${appName}-k3s` },
});
