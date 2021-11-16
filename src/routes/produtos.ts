import { Router } from "express";
import connector from "../database/connector";
import {IResponse} from "../interfaces/response";
import {classProdutos, Produtos} from "../database/models/produtos";

const produtos = Produtos(connector());
const produtosRouter = Router();

produtosRouter.route('/').get(async (req, res) => {
    let response: IResponse;
    try {
        const produtosList: classProdutos[] = await produtos.findAll();
        response = {
            success: true,
            produtos: produtosList
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
            produto: produtoFound
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
            produto: newProduto
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
                produto: foundProduto
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
                produto: foundProduto
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

export default produtosRouter;