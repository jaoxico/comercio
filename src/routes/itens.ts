import { Router } from "express";
import Connector from "../database/connector";
import {IResponse} from "../interfaces/response";
import {classPedidos, Pedidos} from "../database/models/pedidos";
import {classItens, Itens} from "../database/models/itens";

const pedidos = Pedidos(Connector());
const itens = Itens(Connector());
const itensRouter = Router();

itensRouter.route('/pedido/:pedido').get(async (req, res) => {
    let response: IResponse;
    try {
        const foundPedido: classPedidos = await pedidos.findByPk(req.params.pedido);
        if (foundPedido === null) response = {
            success: false,
            message: `Pedido (${req.params.pedido}) não encontrado!`
        };
        else {
            const foundItensList: classItens[] = await itens.findAll({
                where: {
                    pedido: foundPedido.getDataValue('codigo')
                }
            });
            response = {
                success: true,
                itens: foundItensList
            };
        }
    } catch (reason) {
        response = {
            success: false,
            message: reason
        }
    }
    res.json(response)
});

itensRouter.route('/:id').get(async (req, res) => {
    let response: IResponse;
    try {
        const itemFound: classItens = await itens.findByPk(req.params.id);
        response = {
            success: true,
            cliente: itemFound
        };
    } catch (reason) {
        response = {
            success: false,
            message: reason
        };
    }
    res.json(response);
});

itensRouter.route('/pedido/:pedido').post(async (req, res) => {
    let response: IResponse;
    try {
        const foundPedido: classPedidos = await pedidos.findByPk(req.params.pedido);
        if (foundPedido === null) response = {
            success: false,
            message: `Pedido (${req.params.pedido}) não encontrado!`
        };
        else {
            const newItem = await itens.create({pedido: req.params.pedido, ...req.body});
            response = {
                success: true,
                cliente: newItem
            };
        }
    } catch (reason) {
        response = {
            success: false,
            message: reason
        };
    }
    res.json(response);
});

itensRouter.route('/:id').put(async (req, res) => {
    let response: IResponse;
    const foundItem = await itens.findByPk(req.params.id);
    if (foundItem === null) response = {
        success: false,
        message: 'Ítem não encontrado!'
    };
    else {
        try {
            await foundItem.update(req.body);
            response = {
                success: true,
                cliente: foundItem
            };
        } catch (reaason) {
            response = {
                success: false,
                cliente: reaason
            };
        }
    }
    res.json(response)
});


itensRouter.route('/:id').delete(async (req, res) => {
    let response: IResponse;
    const foundItem = await itens.findByPk(req.params.id);
    if (foundItem === null) response = {
        success: false,
        message: 'Item não encontrado!'
    };
    else {
        try {
            await foundItem.destroy();
            response = {
                success: true,
                cliente: foundItem
            };
        } catch (reaason) {
            response = {
                success: false,
                cliente: reaason
            };
        }
    }
    res.json(response)
});

export default itensRouter;