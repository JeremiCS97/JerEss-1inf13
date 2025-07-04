data "archive_file" "archivo_crear_docventa_lambda" {
  type        = "zip"
  source_dir  = "${path.root}/../serverless/jeress/packages/funciones/crear-docventa/build"
  output_path = "${path.root}/data/crear_docventa_lambda.zip"
}

resource "aws_lambda_function" "crear_docventa" {
  function_name    = "crear-docventa"
  handler          = "index.handler"
  runtime          = var.entorno_ejecucion
  role             = var.rol_lambda_arn
  filename         = data.archive_file.archivo_crear_docventa_lambda.output_path
  source_code_hash = filebase64sha256(data.archive_file.archivo_crear_docventa_lambda.output_path)
  timeout          = 60
  memory_size      = 512
  environment {
    variables = {
        URL_BASE_SERVICIO = var.url_base_servicio
    }
  }
}

data "archive_file" "archivo_procesar_carrito_lambda" {
  type        = "zip"
  source_dir  = "${path.root}/../serverless/jeress/packages/funciones/procesar-carrito/build"
  output_path = "${path.root}/data/procesar_carrito_lambda.zip"
}

resource "aws_lambda_function" "procesar_carrito" {
  function_name    = "procesar-carrito"
  handler          = "index.handler"
  runtime          = var.entorno_ejecucion
  role             = var.rol_lambda_arn
  filename         = data.archive_file.archivo_procesar_carrito_lambda.output_path
  source_code_hash = filebase64sha256(data.archive_file.archivo_procesar_carrito_lambda.output_path)
  timeout          = 60
  memory_size      = 512
  environment {
    variables = {
        URL_BASE_SERVICIO = var.url_base_servicio
    }
  }
}