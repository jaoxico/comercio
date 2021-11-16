import * as dotenv from "dotenv";
import express from "express";
import {modelClientes} from "./database/models/modelClientes";
import connector from "./database/connector";
import {Itens} from "./database/models/itens";
import {Pedidos} from "./database/models/pedidos";
import {Produtos} from "./database/models/produtos";
import {Sequelize} from "sequelize";
import clientesRouter from "./routes/clientes";
import cors from "cors";
import itensRouter from "./routes/itens";
import pedidosRouter from "./routes/pedidos";
import produtosRouter from "./routes/produtos";

dotenv.config({
    "path": `${process.cwd()}/.env/.${process.env.ENVIRONMENT}`
});

const connection: Sequelize = connector(),
    tblClientes = modelClientes(connection),
    tblItens = Itens(connection),
    tblPedidos = Pedidos(connection),
    tblProdutos = Produtos(connection);

const database = async () => {

    try {

        await connection.authenticate();
        await tblClientes.sync();
        await tblProdutos.sync();
        await tblPedidos.sync();
        await tblItens.sync();

    } catch (reason) {

        console.log(`Failed to connect or sync to database.
${JSON.stringify(
            reason,
            null,
            4
        )}`);
        process.exit();

    }

};

database().then(() => {

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get(
        "/",
        (req: express.Request, resp: express.Response) => {

            console.log("Rota base.");
            resp.send("Rota base.");

        }
    );

    app.use(
        "/clientes",
        clientesRouter
    );
    app.use(
        "/produtos",
        produtosRouter
    );
    app.use(
        "/pedidos",
        pedidosRouter
    );
    app.use(
        "/itens",
        itensRouter
    );

    const port: number = Number(process.env.PORT) || 3000;
    app.listen(
        port,
        'localhost',
        () => {

            console.log(`Servidor em execução na porta ${port}`);

        }
    );

});
