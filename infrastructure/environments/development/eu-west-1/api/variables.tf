variable "PROJECT" {
  type = string
}

variable "ENVIRONMENT" {
  type = string
}

variable "DOMAIN" {
  type = string
}

variable "SUBDOMAIN" {
  type = string
}

variable "API_IMAGE_URL" {
  type = string
}

variable "API_IMAGE_TAG" {
  type = string
}

variable "EXTERNAL_DNS" {
  type = bool
}

variable "DNS_ZONE_ID" {
  type = string
}

variable "CERTIFICATE_ARN" {
  type = string
}
