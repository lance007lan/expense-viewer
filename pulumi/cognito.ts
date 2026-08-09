import * as aws from '@pulumi/aws';
import { appName } from './config';

export const userPool = new aws.cognito.UserPool(appName, {
    name: appName,
    usernameAttributes: ['email'],
    autoVerifiedAttributes: ['email'],
    passwordPolicy: {
        minimumLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: false,
    },
});

export const userPoolClient = new aws.cognito.UserPoolClient(`${appName}-frontend`, {
    name: `${appName}-frontend`,
    userPoolId: userPool.id,
    explicitAuthFlows: ['ALLOW_USER_SRP_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH'],
});
