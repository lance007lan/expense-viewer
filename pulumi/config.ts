import * as pulumi from '@pulumi/pulumi';

const config = new pulumi.Config();

export const appName = config.get('appName') ?? 'expense-viewer';
