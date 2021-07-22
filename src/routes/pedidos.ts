import { Router } from "express";
import Connector from "../database/connector";
import {IResponse} from "../interfaces/response";
import {classPedidos, Pedidos} from "../database/models/pedidos";

const pedidos = Pedidos(Connector());
const pedidosRouter = Router();

pedidosRouter.route('/').get(async (req, res) => {
    let response: IResponse;
    try {
        const pedidosList: classPedidos[] = await pedidos.findAll();
        response = {
            success: true,
            pedidos: pedidosList
        };
    } catch (reason) {
        response = {
            success: false,
            message: reason
        }
    }
    res.json(response)
});

pedidosRouter.route('/:id').get(async (req, res) => {
    let response: IResponse;
    try {
        const pedidoFound: classPedidos = await pedidos.findByPk(req.params.id);
        response = {
            success: true,
            pedido: pedidoFound
        };
    } catch (reason) {
        response = {
            success: false,
            message: reason
        };
    }
    res.json(response);
});

pedidosRouter.route('/').post(async (req, res) => {
    let response: IResponse;
    try {
        const newPedido = await pedidos.create(req.body);
        response = {
            success: true,
            pedido: newPedido
        };
    } catch (reason) {
        response = {
            success: false,
            message: reason
        };
    }
    res.json(response);
});

pedidosRouter.route('/:id').put(async (req, res) => {
    let response: IResponse;
    const foundPedido = await pedidos.findByPk(req.params.id);
    if (foundPedido === null) response = {
        success: false,
        message: 'Pedido não encontrado!'
    };
    else {
        try {
            await foundPedido.update(req.body);
            response = {
                success: true,
                pedido: foundPedido
            };
        } catch (reaason) {
            response = {
                success: false,
                message: reaason
            };
        }
    }
    res.json(response)
});


pedidosRouter.route('/:id').delete(async (req, res) => {
    let response: IResponse;
    const foundPedido = await pedidos.findByPk(req.params.id);
    if (foundPedido === null) response = {
        success: false,
        message: 'Pedido não encontrado!'
    };
    else {
        try {
            await foundPedido.destroy();
            response = {
                success: true,
                pedido: foundPedido
            };
        } catch (reaason) {
            response = {
                success: false,
                message: reaason
            };
        }
    }
    res.json(response)
});

export default pedidosRouter;