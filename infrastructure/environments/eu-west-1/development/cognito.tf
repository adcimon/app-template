resource "aws_cognito_user_pool" "app_user_pool" {
  name                     = "${local.PROJECT}_${local.ENVIRONMENT}_user_pool"
  auto_verified_attributes = ["email"]
  verification_message_template {
    default_email_option  = "CONFIRM_WITH_LINK"
    email_subject_by_link = "Welcome"
    email_message_by_link = "Please click the next link to verify your email address. {##Click Here##}"
  }
  user_attribute_update_settings {
    attributes_require_verification_before_update = ["email"]
  }
  password_policy {
    minimum_length                   = 6
    require_lowercase                = true
    require_uppercase                = true
    require_numbers                  = true
    require_symbols                  = false
    temporary_password_validity_days = 7
  }
}

# https://github.com/amazon-archives/amazon-cognito-identity-js/issues/512
resource "aws_cognito_user_pool_domain" "app_user_pool_domain" {
  domain       = "${local.PROJECT}-${local.ENVIRONMENT}"
  user_pool_id = aws_cognito_user_pool.app_user_pool.id
}

# https://github.com/hashicorp/terraform-provider-aws/issues/10958
resource "aws_cognito_user_pool_client" "app_user_pool_client" {
  name         = "${local.PROJECT}_${local.ENVIRONMENT}_user_pool_client"
  user_pool_id = aws_cognito_user_pool.app_user_pool.id
  explicit_auth_flows = [
    "USER_PASSWORD_AUTH",
  ]
}
