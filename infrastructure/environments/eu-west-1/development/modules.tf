module "auth" {
  source      = "./auth"
  PROJECT     = local.PROJECT
  ENVIRONMENT = local.ENVIRONMENT
}
