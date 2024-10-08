# Tables

## Users

Cognito users are base ond the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims).

| Username |
| -------- |
| string   |

| name   | family_name | birthdate        | email  | email_verified | phone_number | phone_number_verified | locale | zoneinfo | picture |
| ------ | ----------- | ---------------- | ------ | -------------- | ------------ | --------------------- | ------ | -------- | ------- |
| string | string      | string (ISO8601) | string | boolean        | string       | boolean               | string | string   | string  |

Service: Cognito
Primary key: Username

Internally Cognito records are transformed to user DTOs (Data Transfer Objects).

| id     | name   | surname | birthdate | email  | emailVerified | phone  | phoneVerified | country | timezone | avatar |
| ------ | ------ | ------- | --------- | ------ | ------------- | ------ | ------------- | ------- | -------- | ------ |
| string | string | string  | string    | string | boolean       | string | boolean       | string  | string   | string |
