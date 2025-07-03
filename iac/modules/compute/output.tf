output "nombre_cluster" {
  value = aws_ecs_cluster.cluster_jeress_servicios.name
}

output "task_definition_arn" {
  value = aws_ecs_cluster.cluster_jeress_servicios.arn
}

output "load_balancer_url" {
  description = "URL pública del Load Balancer"
  value       = aws_lb.jeress_load_balancer.dns_name
}
