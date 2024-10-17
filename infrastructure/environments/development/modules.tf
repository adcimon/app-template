module "eu-west-1" {
  source      = "./eu-west-1"
  PROJECT     = local.PROJECT
  ENVIRONMENT = local.ENVIRONMENT
  providers = {
    aws = aws.eu_west_1
  }
}
