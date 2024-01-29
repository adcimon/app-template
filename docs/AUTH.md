# Auth

[Cognito](https://aws.amazon.com/cognito/) is used to authenticate and authorize users.

It is configured with the following features:
* Verification code changed to verification link.
* Keep the original email attribute active when an update is pending.

Once the infrastructure is deployed, update the backend environment variables:
* `AWS_USER_POOL_ID=<cognito_user_pool_id>`
* `AWS_USER_POOL_CLIENT_ID=<cognito_user_pool_client_id>`
