locals {
  # Number of availability zones to deploy. Application load balancers need at least 2 zones.
  availability_zones_count = 2

  availability_zones_max = local.availability_zones_count > length(data.aws_availability_zones.availability_zones.names) ? length(data.aws_availability_zones.availability_zones.names) : local.availability_zones_count
  selected_availability_zones = slice(data.aws_availability_zones.availability_zones.names, 0, local.availability_zones_max)
}

resource "aws_vpc" "vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    Name = "${var.PROJECT}_${var.ENVIRONMENT}_vpc"
  }
}

data "aws_availability_zones" "availability_zones" {
  state = "available"
}

resource "aws_subnet" "public_subnet" {
  for_each = { for index, name in local.selected_availability_zones: index => name }

  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = cidrsubnet(aws_vpc.vpc.cidr_block, 8, each.key * 2) # 10.0.0.0/24, 10.0.2.0/24, etc.
  availability_zone       = each.value
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.PROJECT}_${var.ENVIRONMENT}_public_subnet${each.key}"
  }
}

resource "aws_subnet" "private_subnet" {
  for_each = { for index, name in local.selected_availability_zones: index => name }

  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = cidrsubnet(aws_vpc.vpc.cidr_block, 8, each.key * 2 + 1) # 10.0.1.0/24, 10.0.3.0/24, etc.
  availability_zone       = each.value
  map_public_ip_on_launch = false

  tags = {
    Name = "${var.PROJECT}_${var.ENVIRONMENT}_private_subnet${each.key}"
  }
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "${var.PROJECT}_${var.ENVIRONMENT}_internet_gateway"
  }
}

resource "aws_eip" "nat_ip" {
  for_each = aws_subnet.public_subnet

  domain = "vpc"

  depends_on = [aws_internet_gateway.internet_gateway]

  tags = {
    Name = "${var.PROJECT}_${var.ENVIRONMENT}_nat_ip${each.key}"
  }
}

resource "aws_nat_gateway" "nat_gateway" {
  for_each = aws_subnet.public_subnet

  allocation_id = aws_eip.nat_ip[each.key].id
  subnet_id     = each.value.id

  depends_on = [aws_internet_gateway.internet_gateway]

  tags = {
    Name = "${var.PROJECT}_${var.ENVIRONMENT}_nat_gateway${each.key}"
  }
}

resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet_gateway.id
  }

  tags = {
    Name = "${var.PROJECT}_${var.ENVIRONMENT}_public_route_table"
  }
}

resource "aws_route_table" "private_route_table" {
  for_each = aws_subnet.private_subnet

  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gateway[each.key].id
  }

  tags = {
    Name = "${var.PROJECT}_${var.ENVIRONMENT}_private_route_table${each.key}"
  }
}

resource "aws_route_table_association" "public_route_table_association" {
  for_each = aws_subnet.public_subnet

  subnet_id      = each.value.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "private_route_table_association" {
  for_each = aws_subnet.private_subnet

  subnet_id      = each.value.id
  route_table_id = aws_route_table.private_route_table[each.key].id
}
