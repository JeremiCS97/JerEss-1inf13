output "crear_docventa_funcion_arn" {
  description = "ARN de la función para crear ordenes"
  value       = aws_lambda_function.crear_docventa.arn
}
output "crear_docventa_funcion_name" {
  description = "Nombre de la función Lambda para crear ordenes"
  value       = aws_lambda_function.crear_docventa.function_name
}