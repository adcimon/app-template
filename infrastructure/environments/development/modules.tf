module "eu-west-1" {
  source = "./eu-west-1"

  PROJECT     = local.PROJECT
  ENVIRONMENT = local.ENVIRONMENT
  DOMAIN      = local.DOMAIN
  SUBDOMAIN   = local.SUBDOMAIN

  DEPLOY_APP    = local.DEPLOY_APP
  DEPLOY_API    = local.DEPLOY_API
  API_IMAGE_URL = local.API_IMAGE_URL
  API_IMAGE_TAG = local.API_IMAGE_TAG
  EXTERNAL_DNS  = local.EXTERNAL_DNS

  providers = {
    aws = aws.eu_west_1
  }
}
