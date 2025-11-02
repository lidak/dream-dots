import { CfnOutput, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import { BlockPublicAccess, Bucket, IBucket, ObjectOwnership } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { resolve } from 'path';

export class WebInfrastructureStack extends Stack {
  webBucket: IBucket;
  webBucketDeployment: BucketDeployment;
  cloudFrontDistribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const domainName = 'dream-dots.com';
    const siteDomain = `www.${domainName}`;

    // Look up the hosted zone in Route 53
    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: domainName,
    });

    // Create an ACM SSL certificate for the custom domain.
    // Note: This certificate must be in the us-east-1 region for CloudFront.
    const certificate = new acm.Certificate(this, 'SiteCertificate', {
      domainName: domainName,
      subjectAlternativeNames: [siteDomain],
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });

    this.webBucket = new Bucket(this, 'WebHostingBucket', {
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
      removalPolicy: RemovalPolicy.DESTROY
    });

    this.cloudFrontDistribution = new cloudfront.Distribution(this, 'WebHostingDistribution', {
      certificate: certificate,
      domainNames: [domainName, siteDomain],
      defaultBehavior: {
        // Use S3 as the origin, with an Origin Access Control to keep it private.
        origin: new origins.S3Origin(this.webBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        compress: true,
        functionAssociations: [
          {
            function: new cloudfront.Function(this, 'ViewerRequestFunction', {
              code: cloudfront.FunctionCode.fromFile({
                filePath: 'lib/viewer-request-function.js',
              }),
            }),
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      // Serve index.html for root requests.
      defaultRootObject: 'index.html',
    });

    // Create Route 53 A records to point the domain to the CloudFront distribution.
    new route53.ARecord(this, 'SiteAliasRecord', {
      zone: hostedZone,
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(new route53Targets.CloudFrontTarget(this.cloudFrontDistribution)),
    });

    new route53.ARecord(this, 'WwwSiteAliasRecord', {
      zone: hostedZone,
      recordName: siteDomain,
      target: route53.RecordTarget.fromAlias(new route53Targets.CloudFrontTarget(this.cloudFrontDistribution)),
    });

    // Deploy the static website assets from the 'web/out' directory to the S3 bucket.
    this.webBucketDeployment = new BucketDeployment(this, 'WebHostingBucketDeployment', {
      sources: [Source.asset(resolve(__dirname, '..', '..', 'web', 'out'))],
      destinationBucket: this.webBucket,
      // Invalidate the CloudFront cache after deployment to ensure new content is served.
      distribution: this.cloudFrontDistribution,
      distributionPaths: ['/*'],
    });

    // Output the website URL.
    new CfnOutput(this, 'WebUrl', { value: `https://${domainName}` });
    new CfnOutput(this, 'CloudFrontDistributionId', { value: this.cloudFrontDistribution.distributionId });
  }
}
