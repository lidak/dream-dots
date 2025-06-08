import { CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { BlockPublicAccess, Bucket, ObjectOwnership } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { resolve } from 'path';

export class WebInfrastructureStack extends Stack {
  webBucket: Bucket;
  webBucketDeployment: BucketDeployment;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.webBucket = new Bucket(this, 'WebHostingBucket', {
      autoDeleteObjects: true,
      blockPublicAccess: new BlockPublicAccess({
        blockPublicAcls: false,
        ignorePublicAcls: false,
        blockPublicPolicy: false,
        restrictPublicBuckets: false,
      }),
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      objectOwnership: ObjectOwnership.OBJECT_WRITER,
      removalPolicy: RemovalPolicy.DESTROY
    });

    this.webBucketDeployment = new BucketDeployment(this, 'WebHostingBucketDeployment', {
      sources: [Source.asset(resolve(__dirname, '..', '..', 'web', 'out'))],
      destinationBucket: this.webBucket,
    })

    new CfnOutput(this, 'WebUrl', {value: this.webBucket.bucketWebsiteUrl});
  }
}
