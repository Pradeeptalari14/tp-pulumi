// Option: TypeScript + AWS + VPC + Security Group + S3 Bucket + KMS Encryption
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const commonTags = {
    Project: "pulumi-infrastructure",
    Owner: "talari-pradeep",
    Environment: "production",
    ManagedBy: "Pulumi",
};

// Customer Managed KMS Encryption Key
const kmsKey = new aws.kms.Key("sre-key", {
    description: "KMS Key for SRE resources protection",
    enableKeyRotation: true,
    tags: commonTags,
});

// Core VPC egress network
const vpc = new aws.ec2.Vpc("sre-vpc", {
    cidrBlock: "10.0.0.0/16",
    enableDnsHostnames: true,
    enableDnsSupport: true,
    tags: commonTags,
});

const subnetPublic = new aws.ec2.Subnet("public-subnet", {
    vpcId: vpc.id,
    cidrBlock: "10.0.1.0/24",
    mapPublicIpOnLaunch: true,
    tags: { ...commonTags, Name: "sre-public-subnet" },
});

const webSg = new aws.ec2.SecurityGroup("web-secgroup", {
    vpcId: vpc.id,
    ingress: [
        { protocol: "tcp", fromPort: 80, toPort: 80, cidrBlocks: ["0.0.0.0/0"] },
        { protocol: "tcp", fromPort: 443, toPort: 443, cidrBlocks: ["0.0.0.0/0"] },
    ],
    egress: [{ protocol: "-1", fromPort: 0, toPort: 0, cidrBlocks: ["0.0.0.0/0"] }],
    tags: commonTags,
});

const bucket = new aws.s3.Bucket("sre-bucket", {
    bucket: "sre-production-bucket-talari-pradeep",
    forceDestroy: true,
    tags: commonTags,
});

const bucketSse = new aws.s3.BucketServerSideEncryptionConfigurationV2("bucket-sse", {
    bucket: bucket.id,
    rules: [{
        applyServerSideEncryptionByDefault: {
            kmsMasterKeyId: kmsKey.arn,
            sseAlgorithm: "aws:kms",
        },
    }],
});