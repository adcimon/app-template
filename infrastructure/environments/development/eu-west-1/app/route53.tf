locals {
  dns_name = "${var.SUBDOMAIN}-${var.ENVIRONMENT}.${var.DOMAIN}"
  dns_records = (
    var.ENVIRONMENT == "prod" || var.ENVIRONMENT == "production"
    ? toset([
      local.dns_name,                  # app-prod.example.com
      "${var.SUBDOMAIN}.${var.DOMAIN}" # app.example.com
    ])
    : toset([
      local.dns_name                   # app-dev.example.com
    ])
  )
}

resource "aws_route53_record" "dns_record" {
  for_each = var.EXTERNAL_DNS ? toset([]) : local.dns_records

  zone_id = var.DNS_ZONE_ID
  name    = each.value

  # Use alias, not raw CNAME because the load balancer gives a DNS name.
  type = "A"

  alias {
    name                   = aws_cloudfront_distribution.app_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.app_cdn.hosted_zone_id
    evaluate_target_health = true
  }
}
