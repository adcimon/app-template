# Infrastructure

[Terrafom](https://www.terraform.io/) is an infrastructure-as-code software tool.
The repository stores the Terraform files in the `infrastructure` directory.
These files are used to deploy de required infrastructure services in AWS.

## Environments

Currently there is 1 environment:
* `development`

The file `variables.tf` defines the `PROJECT` and `ENVIRONMENT` local variables (e.g. `app`, `development`).
These variables MUST be copied in the `.env` file of the backend, variables `AWS_PROJECT` and `AWS_ENVIRONMENT` respectively.

## Deploy

1. Install Terraform.
2. Go to the workspace directory (e.g. `/infrastructure/environments/eu-west-1/development`).
3. Execute `terraform apply`.
