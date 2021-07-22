import {classClientes} from "../database/models/clientes";
import {classProdutos} from "../database/models/produtos";
import {classPedidos} from "../database/models/pedidos";
import {classItens} from "../database/models/itens";

export interface IResponse {
    success: boolean;
    message?: string;
    clientes?: classClientes[];
    cliente?: classClientes;
    produto?: classProdutos;
    produtos?: classProdutos[];
    pedido?: classPedidos;
    pedidos?: classPedidos[];
    itens?: classItens[];
    item?: classItens;
}