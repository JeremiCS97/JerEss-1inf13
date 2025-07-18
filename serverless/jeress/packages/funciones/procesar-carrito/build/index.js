"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = process.env.URL_BASE_SERVICIO;
    if (!baseUrl) {
        console.error('SERVICE_BASE_URL no está definida en las variables de entorno.');
        return;
    }
    console.log('Evento Recibido:', JSON.stringify(event, null, 2));
    try {
        const response = yield fetch(`${baseUrl}/docventas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event.detail),
        });
        const responseBody = yield response.json();
        console.log('Respuesta API:', responseBody);
    }
    catch (error) {
        console.error('No se pudo llamar al servicio ECS:', error);
    }
});
exports.handler = handler;
