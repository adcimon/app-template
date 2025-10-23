# Infrastructure

The project stores the infrastructure files in the `infrastructure` directory. These files are used to deploy the required infrastructure services in [AWS](https://aws.amazon.com/) using [Terrafom](https://www.terraform.io/), an infrastructure-as-code software tool.

## Environments

Currently there is 1 environment:
* `development`

The `variables.tf` file defines the `PROJECT` and `ENVIRONMENT` local variables (e.g. `studiocall` and `development`). These must be copied in the backend `.env` file variables `AWS_PROJECT` and `AWS_ENVIRONMENT`.

## State

Infrastructure state files are stored in AWS S3 buckets via Terraform backends. A state locking mechanism is implemented using AWS DynamoDB tables with `LockID` as the partition key. These resources must be created manually before the deployment. Each environment has its own backend resources defined in the `backend.tf` file.

## Deployment

1. Install Terraform.
2. Go to the workspace directory (e.g. `/infrastructure/environments/development`).
3. Execute `terraform apply`.
