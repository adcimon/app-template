resource "aws_route53_zone" "dns_zone" {
  name = var.DOMAIN

  tags = {
    Name = "${var.PROJECT}_${var.ENVIRONMENT}_dns_zone"
  }
}
