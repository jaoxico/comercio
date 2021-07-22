import {classClientes} from "../database/models/clientes";
import {classProdutos} from "../database/models/produtos";
import {classPedidos} from "../database/models/pedidos";
import {classItens} from "../database/models/itens";

export interface IResponse {
    success: boolean;
    message?: string;
    clientes?: classClientes[];
    cliente?: classClientes;
    produtos?: classProdutos[];
    produto?: classProdutos;
    pedidos?: classPedidos[];
    pedido?: classPedidos;
    itens?: classItens[];
    item?: classItens;
}