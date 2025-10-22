module "api" {
  for_each = var.DEPLOY_API ? toset(["enabled"]) : toset([])

  source = "./api"

  PROJECT     = var.PROJECT
  ENVIRONMENT = var.ENVIRONMENT
  DOMAIN      = var.DOMAIN
  SUBDOMAIN   = var.SUBDOMAIN

  API_IMAGE_URL   = var.API_IMAGE_URL
  API_IMAGE_TAG   = var.API_IMAGE_TAG
  EXTERNAL_DNS    = var.EXTERNAL_DNS
  DNS_ZONE_ID     = try(module.dns["enabled"].DNS_ZONE_ID, null)
  CERTIFICATE_ARN = try(module.certificate["enabled"].CERTIFICATE_ARN, null)
}

module "app" {
  for_each = var.DEPLOY_APP ? toset(["enabled"]) : toset([])

  source = "./app"

  PROJECT     = var.PROJECT
  ENVIRONMENT = var.ENVIRONMENT
  DOMAIN      = var.DOMAIN
  SUBDOMAIN   = var.SUBDOMAIN

  EXTERNAL_DNS    = var.EXTERNAL_DNS
  DNS_ZONE_ID     = try(module.dns["enabled"].DNS_ZONE_ID, null)
  CERTIFICATE_ARN = try(module.certificate["enabled"].CERTIFICATE_ARN, null)
}

module "auth" {
  source = "./auth"

  PROJECT     = var.PROJECT
  ENVIRONMENT = var.ENVIRONMENT
}

module "certificate" {
  for_each = (var.DEPLOY_APP || var.DEPLOY_API) ? toset(["enabled"]) : toset([])

  source = "./certificate"

  DOMAIN = var.DOMAIN
}

module "dns" {
  for_each = ((var.DEPLOY_APP || var.DEPLOY_API) && !var.EXTERNAL_DNS) ? toset(["enabled"]) : toset([])

  source = "./dns"

  PROJECT     = var.PROJECT
  ENVIRONMENT = var.ENVIRONMENT
  DOMAIN      = var.DOMAIN
}
