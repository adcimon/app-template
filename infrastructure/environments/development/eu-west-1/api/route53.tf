locals {
  dns_name = "${var.SUBDOMAIN}-${var.ENVIRONMENT}-api.${var.DOMAIN}"
  dns_records = (
    var.ENVIRONMENT == "prod" || var.ENVIRONMENT == "production"
    ? toset([
      local.dns_name,                      # app-prod-api.example.com
      "${var.SUBDOMAIN}-api.${var.DOMAIN}" # app-api.example.com
    ])
    : toset([
      local.dns_name                       # app-dev-api.example.com
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
    name                   = aws_lb.load_balancer.dns_name
    zone_id                = aws_lb.load_balancer.zone_id
    evaluate_target_health = true
  }
}
