# https://docs.aws.amazon.com/AmazonECS/latest/developerguide/retrieve-ecs-optimized_AMI.html
data "aws_ssm_parameter" "instance_ami" {
  name = "/aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id"
}

resource "aws_iam_role" "instance_role" {
  name = "ecsInstanceRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "ec2.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "instance_policy" {
  role       = aws_iam_role.instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "instance_profile" {
  role = aws_iam_role.instance_role.name
}

resource "aws_launch_template" "instance_template" {
  name                   = "${var.PROJECT}_${var.ENVIRONMENT}_instance_template"
  image_id               = data.aws_ssm_parameter.instance_ami.value
  instance_type          = "t3.micro"
  vpc_security_group_ids = [aws_security_group.instance_security_group.id]

  iam_instance_profile {
    name = aws_iam_instance_profile.instance_profile.name
  }

  block_device_mappings {
    device_name = "/dev/xvda"
    ebs {
      volume_size = 30
      volume_type = "gp2"
    }
  }

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name = "${var.PROJECT}_${var.ENVIRONMENT}_instance"
    }
  }

  user_data = base64encode(<<-EOF
    #!/bin/bash
    echo ECS_CLUSTER=${var.PROJECT}_${var.ENVIRONMENT}_cluster >> /etc/ecs/ecs.config
  EOF
  )
}

resource "aws_lb" "load_balancer" {
  # Only alphanumeric characters and hyphens are allowed.
  name               = "${var.PROJECT}-${var.ENVIRONMENT}-lb"

  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.load_balancer_security_group.id]
  subnets            = [for subnet in aws_subnet.public_subnet : subnet.id]

  tags = {
    Name = "${var.PROJECT}_${var.ENVIRONMENT}_load_balancer"
  }
}

resource "aws_lb_listener" "load_balancer_listener" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port              = 443
  protocol          = "HTTPS"

  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.CERTIFICATE_ARN

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.load_balancer_target_group.arn
  }
}

# HTTP → HTTPS redirect listener.
resource "aws_lb_listener" "load_balancer_redirect_listener" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_target_group" "load_balancer_target_group" {
  # Only alphanumeric characters and hyphens are allowed.
  name        = "${var.PROJECT}-${var.ENVIRONMENT}-lb-tg"

  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.vpc.id

  health_check {
    path = "/"
  }
}

resource "aws_autoscaling_group" "auto_scaler" {
  name                = "${var.PROJECT}_${var.ENVIRONMENT}_auto_scaler"
  vpc_zone_identifier = [for subnet in aws_subnet.private_subnet : subnet.id]
  min_size            = 1
  max_size            = 2
  desired_capacity    = 2

  launch_template {
    id      = aws_launch_template.instance_template.id
    version = "$Latest"
  }

  tag {
    key                 = "AmazonECSManaged"
    value               = true
    propagate_at_launch = true
  }
}

resource "aws_security_group" "instance_security_group" {
  name   = "${var.PROJECT}_${var.ENVIRONMENT}_instance_security_group"
  vpc_id = aws_vpc.vpc.id

  # Inbound via load balancer.
  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.load_balancer_security_group.id]
  }

  # Outbound via NAT gateway.
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.PROJECT}_${var.ENVIRONMENT}_instance_security_group"
  }
}

resource "aws_security_group" "load_balancer_security_group" {
  name   = "${var.PROJECT}_${var.ENVIRONMENT}_load_balancer_security_group"
  vpc_id = aws_vpc.vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    self        = "false"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    self        = "false"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.PROJECT}_${var.ENVIRONMENT}_load_balancer_security_group"
  }
}
