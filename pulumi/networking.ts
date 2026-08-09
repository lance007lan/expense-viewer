import * as aws from '@pulumi/aws';
import { appName } from './config';

const azs = aws.getAvailabilityZones({ state: 'available' });

export const vpc = new aws.ec2.Vpc(`${appName}-vpc`, {
    cidrBlock: '10.0.0.0/16',
    enableDnsHostnames: true,
    enableDnsSupport: true,
    tags: { Name: `${appName}-vpc` },
});

const igw = new aws.ec2.InternetGateway(`${appName}-igw`, {
    vpcId: vpc.id,
    tags: { Name: `${appName}-igw` },
});

export const publicSubnets = [0, 1].map(
    (i) =>
        new aws.ec2.Subnet(`${appName}-public-${i}`, {
            vpcId: vpc.id,
            cidrBlock: `10.0.${i}.0/24`,
            availabilityZone: azs.then((a) => a.names[i]),
            mapPublicIpOnLaunch: true,
            tags: {
                Name: `${appName}-public-${i}`,
                'kubernetes.io/role/elb': '1',
                [`kubernetes.io/cluster/${appName}`]: 'owned',
            },
        }),
);

const publicRouteTable = new aws.ec2.RouteTable(`${appName}-public-rt`, {
    vpcId: vpc.id,
    routes: [{ cidrBlock: '0.0.0.0/0', gatewayId: igw.id }],
    tags: { Name: `${appName}-public-rt` },
});

publicSubnets.forEach(
    (subnet, i) =>
        new aws.ec2.RouteTableAssociation(`${appName}-public-rta-${i}`, {
            subnetId: subnet.id,
            routeTableId: publicRouteTable.id,
        }),
);
