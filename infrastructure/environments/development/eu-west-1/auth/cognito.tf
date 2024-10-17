resource "aws_cognito_user_pool" "user_pool" {
  name                     = "${var.PROJECT}_${var.ENVIRONMENT}_user_pool"
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

  schema {
    name                = "roles"
    attribute_data_type = "String"
    mutable             = true
    string_attribute_constraints {
      min_length = 0
      max_length = 2048
    }
  }
}

resource "aws_cognito_user_pool_domain" "user_pool_domain" {
  domain       = "${var.PROJECT}-${var.ENVIRONMENT}"
  user_pool_id = aws_cognito_user_pool.user_pool.id
}

resource "aws_cognito_user_pool_client" "user_pool_client" {
  name         = "${var.PROJECT}_${var.ENVIRONMENT}_user_pool_client"
  user_pool_id = aws_cognito_user_pool.user_pool.id
  explicit_auth_flows = [
    "USER_PASSWORD_AUTH",
  ]
}
