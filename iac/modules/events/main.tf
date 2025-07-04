resource "aws_cloudwatch_event_bus" "docventas_bus" {
    name = "docventas-bus"
}

resource "aws_cloudwatch_event_rule" "crear_docventa" {
    name           = "crear-docventa"
    description    = "Regla para crear orden desde evento personalizado"
    event_bus_name = aws_cloudwatch_event_bus.docventas_bus.name
    event_pattern = jsonencode({
        source       = ["pe.com.jeress"],
        "detail-type": ["crear-docventa"]
    })
}

resource "aws_cloudwatch_event_target" "target_lambda_crear_docventa" {
    rule      = aws_cloudwatch_event_rule.crear_docventa.name
    target_id = "crear-docventa-lambda"
    arn       = var.crear_docventa_funcion_arn
    event_bus_name = aws_cloudwatch_event_bus.docventas_bus.name
}

resource "aws_lambda_permission" "allow_eventbridge" {
    statement_id  = "AllowExecutionFromEventBridge"
    action        = "lambda:InvokeFunction"
    function_name = var.crear_docventa_funcion_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.crear_docventa.arn
}

resource "aws_cloudwatch_event_bus" "procesacarrito_bus" {
    name = "procesacarrito-bus"
}

resource "aws_cloudwatch_event_rule" "procesar_carrito" {
    name           = "procesar-carrito"
    description    = "Regla para procesar carrito desde evento personalizado"
    event_bus_name = aws_cloudwatch_event_bus.procesacarrito_bus.name
    event_pattern = jsonencode({
        source       = ["pe.com.jeress"],
        "detail-type": ["procesar-carrito"]
    })
}

resource "aws_cloudwatch_event_target" "target_lambda_procesar_carrito" {
    rule      = aws_cloudwatch_event_rule.procesar_carrito.name
    target_id = "procesar-carrito-lambda"
    arn       = var.procesar_carrito_funcion_arn
    event_bus_name = aws_cloudwatch_event_bus.procesacarrito_bus.name
}

resource "aws_lambda_permission" "allow_eventbridge_procesar_carrito" {
    statement_id  = "AllowExecutionFromEventBridgeProcesarCarrito"
    action        = "lambda:InvokeFunction"
    function_name = var.procesar_carrito_funcion_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.procesar_carrito.arn
}