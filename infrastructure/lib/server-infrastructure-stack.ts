import * as path from 'path';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class ServerInfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const backend = new NodejsFunction(this, 'BackendLambda', {
      entry: path.join(__dirname, '../../server/src/handler.ts'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        externalModules: ['aws-sdk'],
        nodeModules: ['express', '@vendia/serverless-express'],
      }
    });

    new apigateway.LambdaRestApi(this, 'BackendAPI', {
      handler: backend
    });
  }
}
