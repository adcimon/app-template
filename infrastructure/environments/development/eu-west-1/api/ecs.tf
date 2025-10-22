resource "aws_ecs_cluster" "cluster" {
  name = "${var.PROJECT}_${var.ENVIRONMENT}_cluster"
}

resource "aws_ecs_capacity_provider" "cluster_capacity_provider" {
  name = "${var.PROJECT}_${var.ENVIRONMENT}_cluster_capacity_provider"

  auto_scaling_group_provider {
    auto_scaling_group_arn = aws_autoscaling_group.auto_scaler.arn

    managed_scaling {
      minimum_scaling_step_size = 1
      maximum_scaling_step_size = 1000
      target_capacity           = 2
      status                    = "ENABLED"
    }
  }
}

resource "aws_ecs_cluster_capacity_providers" "cluster_capacity_providers" {
  cluster_name       = aws_ecs_cluster.cluster.name
  capacity_providers = [aws_ecs_capacity_provider.cluster_capacity_provider.name]

  default_capacity_provider_strategy {
    base              = 1
    weight            = 100
    capacity_provider = aws_ecs_capacity_provider.cluster_capacity_provider.name
  }
}

resource "aws_iam_role" "cluster_task_role" {
  name = "${var.PROJECT}_${var.ENVIRONMENT}_cluster_task_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

# Policy to pull images, retrieve secrets and write to logs.
resource "aws_iam_role_policy_attachment" "cluster_task_policy" {
  role       = aws_iam_role.cluster_task_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_ecs_task_definition" "cluster_task_definition" {
  family             = "${var.PROJECT}_${var.ENVIRONMENT}_cluster_task_definition"
  network_mode       = "awsvpc"
  execution_role_arn = aws_iam_role.cluster_task_role.arn
  cpu                = 256

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  container_definitions = jsonencode([
    {
      name      = "${var.PROJECT}_${var.ENVIRONMENT}_container"
      image     = "${var.API_IMAGE_URL}:${var.API_IMAGE_TAG}"
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "cluster_service" {
  name                 = "${var.PROJECT}_${var.ENVIRONMENT}_cluster_service"
  cluster              = aws_ecs_cluster.cluster.id
  task_definition      = aws_ecs_task_definition.cluster_task_definition.arn
  desired_count        = 2
  force_new_deployment = true

  network_configuration {
    subnets         = [for subnet in aws_subnet.private_subnet : subnet.id]
    security_groups = [aws_security_group.instance_security_group.id]
  }

  placement_constraints {
    type = "distinctInstance"
  }

  triggers = {
    redeployment = timestamp()
  }

  capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.cluster_capacity_provider.name
    weight            = 100
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.load_balancer_target_group.arn
    container_name   = "${var.PROJECT}_${var.ENVIRONMENT}_container"
    container_port   = 80
  }

  depends_on = [aws_autoscaling_group.auto_scaler]
}
