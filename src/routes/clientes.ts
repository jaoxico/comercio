import { Router } from "express";
import connector from "../database/connector";
import {classClientes, modelClientes} from "../database/models/modelClientes";
import {IResponse} from "../interfaces/response";

const clientes = modelClientes(connector());
const clientesRouter = Router();

clientesRouter.route('/').get(async (req, res) => {
    let response: IResponse;
    try {
        const clientesList: classClientes[] = await clientes.findAll();
        response = {
            success: true,
            clientes: clientesList
        };
    } catch (reason) {
        response = {
            success: false,
            message: reason
        }
    }
    res.json(response)
});

clientesRouter.route('/:id').get(async (req, res) => {
    let response: IResponse;
    try {
        const clienteFound: classClientes = await clientes.findByPk(req.params.id);
        response = {
            success: true,
            cliente: clienteFound
        };
    } catch (reason) {
        response = {
            success: false,
            message: reason
        };
    }
    res.json(response);
});

clientesRouter.route('/').post(async (req, res) => {
    let response: IResponse;
    try {
        const newCliente = await clientes.create(req.body);
        response = {
            success: true,
            cliente: newCliente
        };
    } catch (reason) {
        response = {
            success: false,
            message: reason
        };
    }
    res.json(response);
});

clientesRouter.route('/:id').put(async (req, res) => {
    let response: IResponse;
    const foundCliente = await clientes.findByPk(req.params.id);
    if (foundCliente === null) response = {
        success: false,
        message: 'Cliente não encontrado!'
    };
    else {
        try {
            await foundCliente.update(req.body);
            response = {
                success: true,
                cliente: foundCliente
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


clientesRouter.route('/:id').delete(async (req, res) => {
    let response: IResponse;
    const foundCliente = await clientes.findByPk(req.params.id);
    if (foundCliente === null) response = {
        success: false,
        message: 'Cliente não encontrado!'
    };
    else {
        try {
            await foundCliente.destroy();
            response = {
                success: true,
                cliente: foundCliente
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

export default clientesRouter;