# Option: Python + AWS + VPC + S3 Bucket + KMS Encryption
import pulumi
import pulumi_aws as aws

common_tags = {
    "Project": "pulumi-infrastructure",
    "Owner": "talari-pradeep",
    "Environment": "production",
    "ManagedBy": "Pulumi",
}

# Encryption KMS key
kms_key = aws.kms.Key("sre-key",
    description="KMS Key for SRE resources protection",
    enable_key_rotation=True,
    tags=common_tags)

# Net topologies
vpc = aws.ec2.Vpc("sre-vpc",
    cidr_block="10.0.0.0/16",
    enable_dns_hostnames=True,
    enable_dns_support=True,
    tags=common_tags)

bucket = aws.s3.Bucket("sre-bucket",
    bucket="sre-production-bucket-talari-pradeep",
    force_destroy=True,
    tags=common_tags)