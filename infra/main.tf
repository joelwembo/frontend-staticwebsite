terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

variable "region" {
  description = "AWS region for the S3 bucket."
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Globally-unique S3 bucket name to host the VxCloud landing page."
  type        = string
}

resource "aws_s3_bucket" "site" {
  bucket        = var.bucket_name
  force_destroy = true

  tags = {
    Project = "VxCloud Landing"
    Managed = "Terraform"
  }
}

# Enable static website hosting and set index document
resource "aws_s3_bucket_website_configuration" "site" {
  bucket = aws_s3_bucket.site.id

  index_document {
    suffix = "index.html"
  }

  # For simple static sites, serve index.html for errors as well
  error_document {
    key = "index.html"
  }
}

# Allow public reads of objects (required for static website hosting)
data "aws_iam_policy_document" "public_read" {
  statement {
    sid     = "PublicReadGetObject"
    effect  = "Allow"
    actions = ["s3:GetObject"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    resources = ["${aws_s3_bucket.site.arn}/*"]
  }
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.public_read.json

  depends_on = [aws_s3_bucket_public_access_block.site]
}

output "website_endpoint" {
  description = "S3 static website endpoint URL"
  value       = aws_s3_bucket_website_configuration.site.website_endpoint
}