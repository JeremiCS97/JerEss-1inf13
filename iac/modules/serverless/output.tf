output "crear_docventa_funcion_arn" {
  description = "ARN de la función para crear ordenes"
  value       = aws_lambda_function.crear_docventa.arn
}
output "crear_docventa_funcion_name" {
  description = "Nombre de la función Lambda para crear ordenes"
  value       = aws_lambda_function.crear_docventa.function_name
}
output "procesar_carrito_funcion_arn" {
  description = "ARN de la función para procesar carrito"
  value       = aws_lambda_function.procesar_carrito.arn
}
output "crear_carrito_funcion_name" {
  description = "Nombre de la función Lambda para procesar carrito"
  value       = aws_lambda_function.procesar_carrito.function_name
}