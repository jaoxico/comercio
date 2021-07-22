import { Router } from "express";
import Connector from "../database/connector";
import {IResponse} from "../interfaces/response";
import {classProdutos, Produtos} from "../database/models/produtos";

const produtos = Produtos(Connector());
const produtosRouter = Router();

produtosRouter.route('/').get(async (req, res) => {
    let response: IResponse;
    try {
        const produtosList: classProdutos[] = await produtos.findAll();
        response = {
            success: true,
            clientes: produtosList
        };
    } catch (reason) {
        response = {
            success: false,
            message: reason
        }
    }
    res.json(response)
});

produtosRouter.route('/:id').get(async (req, res) => {
    let response: IResponse;
    try {
        const produtoFound: classProdutos = await produtos.findByPk(req.params.id);
        response = {
            success: true,
            cliente: produtoFound
        };
    } catch (reason) {
        response = {
            success: false,
            message: reason
        };
    }
    res.json(response);
});

produtosRouter.route('/').post(async (req, res) => {
    let response: IResponse;
    try {
        const newProduto = await produtos.create(req.body);
        response = {
            success: true,
            cliente: newProduto
        };
    } catch (reason) {
        response = {
            success: false,
            message: reason
        };
    }
    res.json(response);
});

produtosRouter.route('/:id').put(async (req, res) => {
    let response: IResponse;
    const foundProduto = await produtos.findByPk(req.params.id);
    if (foundProduto === null) response = {
        success: false,
        message: 'Produto não encontrado!'
    };
    else {
        try {
            await foundProduto.update(req.body);
            response = {
                success: true,
                cliente: foundProduto
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


produtosRouter.route('/:id').delete(async (req, res) => {
    let response: IResponse;
    const foundProduto = await produtos.findByPk(req.params.id);
    if (foundProduto === null) response = {
        success: false,
        message: 'Produto não encontrado!'
    };
    else {
        try {
            await foundProduto.destroy();
            response = {
                success: true,
                cliente: foundProduto
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

export default produtosRouter;