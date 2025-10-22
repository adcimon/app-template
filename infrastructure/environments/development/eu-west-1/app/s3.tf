resource "aws_s3_bucket" "app_bucket" {
  # Only lowercase alphanumeric characters and hyphens are allowed.
  bucket = "${var.PROJECT}-${var.ENVIRONMENT}-app"

  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "app_bucket_access" {
  bucket = aws_s3_bucket.app_bucket.id

  block_public_acls       = true
  block_public_policy     = false
  ignore_public_acls      = true
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "app_bucket_policy" {
  depends_on = [aws_s3_bucket_public_access_block.app_bucket_access]

  bucket = aws_s3_bucket.app_bucket.id

  #   # Public policy.
  #   policy = jsonencode({
  #     "Version": "2012-10-17",
  #     "Id": "AllowGetObjects",
  #     "Statement": [
  #       {
  #         "Sid": "AllowPublic",
  #         "Effect": "Allow",
  #         "Principal": "*",
  #         "Action": "s3:GetObject",
  #         "Resource": "${aws_s3_bucket.app_bucket.arn}/**"
  #       }
  #     ]
  #   })

  # CloudFront policy.
  policy = jsonencode({
    "Version" : "2008-10-17",
    "Id" : "PolicyForCloudFrontPrivateContent",
    "Statement" : [
      {
        "Sid" : "AllowCloudFrontServicePrincipal",
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "cloudfront.amazonaws.com"
        },
        "Action" : "s3:GetObject",
        "Resource" : "${aws_s3_bucket.app_bucket.arn}/*",
        "Condition" : {
          "StringEquals" : {
            "AWS:SourceArn" : "${aws_cloudfront_distribution.app_cdn.arn}"
          }
        }
      }
    ]
  })
}
