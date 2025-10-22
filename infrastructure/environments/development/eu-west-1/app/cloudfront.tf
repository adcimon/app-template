locals {
  origin_id = "app_origin"
}

resource "aws_cloudfront_distribution" "app_cdn" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  # Edge locations.
  price_class = "PriceClass_100"

  origin {
    domain_name              = aws_s3_bucket.app_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.app_cdn_access.id
    origin_id                = local.origin_id
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.origin_id

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.CERTIFICATE_ARN
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

# Restrict origin access to only CloudFront.
resource "aws_cloudfront_origin_access_control" "app_cdn_access" {
  name = aws_s3_bucket.app_bucket.bucket_regional_domain_name

  # The origin type must be the same type as origin domain.
  origin_access_control_origin_type = "s3"

  signing_behavior = "always"
  signing_protocol = "sigv4"
}
