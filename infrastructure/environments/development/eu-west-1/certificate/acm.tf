locals {
  domain = "*.${var.DOMAIN}"
}

data "aws_acm_certificate" "certificate" {
  domain      = local.domain
  statuses    = ["ISSUED"]
  most_recent = true
}

locals {
  certificate_exists = length(data.aws_acm_certificate.certificate.arn) > 0
}

check "certificate_exists" {
  assert {
    condition     = local.certificate_exists
    error_message = "❌ No issued certificate found for '${local.domain}'. Please import or request one before running Terraform."
  }
}
