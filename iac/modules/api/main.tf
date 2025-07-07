resource "aws_apigatewayv2_api" "http_api" {
  name          = "jeress-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allow_headers = ["*"]
  }
}

resource "aws_apigatewayv2_integration" "productos_integration_get_all" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/productos"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "productos_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/productos/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "clientes_integration_get_all" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/clientes"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "clientes_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/clientes/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "carritos_integration_get_all" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/carritos"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "carritos_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/carritos/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

# Integraciones DocVentas (antes Ordenes)
resource "aws_apigatewayv2_integration" "docventas_integration_get_all" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/docventas"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}


resource "aws_apigatewayv2_integration" "docventas_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/docventas/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

#Integraciones Usuarios
resource "aws_apigatewayv2_integration" "usuarios_integration_get_all" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/usuarios"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "usuarios_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/usuarios/{proxy}"
  integration_method     = "ANY"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_integration" "usuarios_login_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "HTTP_PROXY"
  integration_uri        = "http://${var.load_balancer_url}/api/usuarios/login"
  integration_method     = "POST"
  payload_format_version = "1.0"
}

# EventBridge Integration (solo si lo usas para docventas POST/PUT)
resource "aws_apigatewayv2_integration" "eventbridge_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_subtype    = "EventBridge-PutEvents"
  credentials_arn        = var.rol_lab_arn
  request_parameters = {
    Source       = "pe.com.jeress"
    DetailType   = "crear-docventa"
    Detail       = "$request.body"
    EventBusName = var.event_bus_name
  }
  payload_format_version = "1.0"
  timeout_milliseconds   = 10000
}

resource "aws_apigatewayv2_stage" "default_stage" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
  default_route_settings {
    throttling_burst_limit = 500
    throttling_rate_limit  = 1000
  }
  route_settings {
    route_key     = "$default"
    logging_level = "INFO"
  }
  
}

#########################################
#########################################
# Routes - DocVentas (antes Ordenes)
#########################################
#########################################
resource "aws_apigatewayv2_route" "docventas_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /docventas"
  target    = "integrations/${aws_apigatewayv2_integration.eventbridge_integration.id}"
}
resource "aws_apigatewayv2_route" "docventas_put_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "PUT /docventas/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.eventbridge_integration.id}"
}
resource "aws_apigatewayv2_route" "docventas_get_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /docventas"
  target    = "integrations/${aws_apigatewayv2_integration.docventas_integration_get_all.id}"
}
resource "aws_apigatewayv2_route" "docventas_get_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /docventas/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.docventas_integration.id}"
}
resource "aws_apigatewayv2_route" "docventas_delete_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "DELETE /docventas/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.docventas_integration.id}"
}


#########################################
# Routes - Clientes
#########################################
resource "aws_apigatewayv2_route" "clientes_get_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /clientes"
  target    = "integrations/${aws_apigatewayv2_integration.clientes_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "clientes_get_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /clientes/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.clientes_integration.id}"
}

resource "aws_apigatewayv2_route" "clientes_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /clientes"
  target    = "integrations/${aws_apigatewayv2_integration.clientes_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "clientes_put_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "PUT /clientes/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.clientes_integration.id}"
}

resource "aws_apigatewayv2_route" "clientes_delete_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "DELETE /clientes/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.clientes_integration.id}"
}

#########################################
# Routes - Productos
#########################################

resource "aws_apigatewayv2_route" "producto_get_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /productos"
  target    = "integrations/${aws_apigatewayv2_integration.productos_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "producto_get_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /productos/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.productos_integration.id}"
}

resource "aws_apigatewayv2_route" "producto_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /productos"
  target    = "integrations/${aws_apigatewayv2_integration.productos_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "producto_put_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "PUT /productos/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.productos_integration.id}"
}

resource "aws_apigatewayv2_route" "producto_delete_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "DELETE /productos/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.productos_integration.id}"
}

#########################################
# Routes - Carritos
#########################################
resource "aws_apigatewayv2_route" "carritos_get_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /carritos"
  target    = "integrations/${aws_apigatewayv2_integration.carritos_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "carritos_get_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /carritos/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.carritos_integration.id}"
}

resource "aws_apigatewayv2_route" "carritos_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /carritos/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.carritos_integration.id}"
}

resource "aws_apigatewayv2_route" "carritos_put_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "PUT /carritos/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.carritos_integration.id}"
}

resource "aws_apigatewayv2_route" "carritos_delete_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "DELETE /carritos/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.carritos_integration.id}"
}


#########################################
# Routes - Usuarios
#########################################

resource "aws_apigatewayv2_route" "usuarios_get_all" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /usuarios"
  target    = "integrations/${aws_apigatewayv2_integration.usuarios_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "usuarios_get_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /usuarios/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.usuarios_integration.id}"
}

resource "aws_apigatewayv2_route" "usuarios_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /usuarios"
  target    = "integrations/${aws_apigatewayv2_integration.usuarios_integration_get_all.id}"
}

resource "aws_apigatewayv2_route" "usuarios_put_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "PUT /usuarios/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.usuarios_integration.id}"
}

resource "aws_apigatewayv2_route" "usuarios_delete_proxy" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "DELETE /usuarios/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.usuarios_integration.id}"
}


resource "aws_apigatewayv2_route" "usuarios_login_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /usuarios/login"
  target    = "integrations/${aws_apigatewayv2_integration.usuarios_login_integration.id}"
}