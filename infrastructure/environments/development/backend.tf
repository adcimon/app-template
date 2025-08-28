terraform {
  backend "s3" {
    bucket         = "app-development-terraform"
    key            = "terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "app_development_terraform"
  }
}
