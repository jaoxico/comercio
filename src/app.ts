const Dotenv = require('dotenv');
const Express = require('express');

import {Request, Response} from "express";
import { DotenvConfigOptions } from "dotenv";
import cors from 'cors';
import Connector from "./database/connector";
import {Clientes} from "./database/models/clientes";
import {Produtos} from "./database/models/produtos";
import {Pedidos} from "./database/models/pedidos";
import {Itens} from "./database/models/itens";
import clientesRouter from "./routes/clientes";
import produtosRouter from "./routes/produtos";
import pedidosRouter from "./routes/pedidos";
import itensRouter from "./routes/itens";

const config: DotenvConfigOptions = {
    path: `${process.cwd()}/.env/.${process.env.ENVIRONMENT}`
};
Dotenv.config(config);

const connection = Connector();
const clientes = Clientes(connection);
const produtos = Produtos(connection);
const pedidos = Pedidos(connection);
const itens = Itens(connection);

const database = async () => {
    try {

        await connection.authenticate();
        await clientes.sync();
        await produtos.sync();
        await pedidos.sync();
        await itens.sync();
    } catch (reason) {

        console.log(`Failed to connect or sync to database.
${JSON.stringify(reason, null, 4)}`);
        process.exit();
    }
};

database().then(() => {
    const app = new Express();
    app.use(Express.json());
    app.use(cors());

    app.get('/', (req: Request, resp: Response) => {
        console.log('Rota base.');
        resp.send('Rota base.');
    });

    app.use('/clientes', clientesRouter);
    app.use('/produtos', produtosRouter);
    app.use('/pedidos', pedidosRouter);
    app.use('/itens', itensRouter);

    const port: number = Number(process.env.PORT) || 3000;
    app.listen(port, () => {
        console.log(`Servidor em execução na porta ${port}`);
    });
});