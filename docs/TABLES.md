# Tables

## Users

Cognito users are base ond the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims).

| Username | name   | family_name | birthdate | email  | email_verified | phone_number | phone_number_verified | locale | timezone | picture |
| -------- | ------ | ----------- | --------- | ------ | -------------- | ------------ | --------------------- | ------ | -------- | ------- |
| string   | string | string      | string    | string | boolean        | string       | boolean               | string | string   | string  |

Service: Cognito
Primary key: Username
