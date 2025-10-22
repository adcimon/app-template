locals {
  PROJECT     = "app"
  ENVIRONMENT = basename(abspath(path.module))
  DOMAIN      = "example.com"
  SUBDOMAIN   = "app"

  DEPLOY_APP    = false
  DEPLOY_API    = false
  API_IMAGE_URL = "docker/getting-started"
  API_IMAGE_TAG = "latest"
  EXTERNAL_DNS  = false
}
