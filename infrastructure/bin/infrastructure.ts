#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WebInfrastructureStack } from '../lib/web-infrastructure-stack';
import { ServerInfrastructureStack } from '../lib/server-infrastructure-stack';

const app = new cdk.App();
new WebInfrastructureStack(app, 'WebInfrastructureStack', {});
new ServerInfrastructureStack(app, 'ServerInfrastructureStack', {});