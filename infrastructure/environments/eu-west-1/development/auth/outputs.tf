output "USER_POOL_ID" {
  value = "${aws_cognito_user_pool.app_user_pool.id}"
}

output "USER_POOL_CLIENT_ID" {
  value = "${aws_cognito_user_pool_client.app_user_pool_client.id}"
}
