import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ConfigModule } from '@nestjs/config';
import { PedidosController } from '../Controllers/pedidosController';
import { ItensController } from '../Controllers/itens.controller';
import { ProdutosController } from '../Controllers/produtos.controller';
import { ItensDto } from '../dto/itens.dto';
import { iItem } from '../interfaces/iItem';
import { iPedido } from '../interfaces/iPedido';
import { IProduto } from '../interfaces/iProduto';
import { Logger } from '@nestjs/common';
import { ProdutosDto } from '../dto/produtos.dto';
import { ClientesController } from '../Controllers/clientes.controller';
import { iCliente } from '../interfaces/ICliente';
import { ClientesDto } from '../dto/clientes.dto';
import { PedidosDto } from '../dto/pedidos.dto';
import {logger} from "sequelize/types/lib/utils/logger";

describe('ItensController', () => {
  let produtosController: ProdutosController;
  let clientesController: ClientesController;
  let pedidosController: PedidosController;
  let itensController: ItensController;
  let code: string;
  let clientes: iCliente[];
  let pedidos: iPedido[];
  let produtos: IProduto[];
  let clienteNovo = false;
  let pedidoNovo = false;
  let cliente: string;
  let pedido: string;
  let produtoNovo = false;
  let produto: string;

  beforeAll(async () => {
    const itens: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env/.${process.env.ENVIRONMENT}`,
        }),
      ],
      controllers: [
        ItensController,
        PedidosController,
        ProdutosController,
        ClientesController,
      ],
      providers: [AppService],
    }).compile();

    produtosController = itens.get<ProdutosController>(ProdutosController);
    clientesController = itens.get<ClientesController>(ClientesController);
    pedidosController = itens.get<PedidosController>(PedidosController);
    itensController = itens.get<ItensController>(ItensController);
  });

  describe('add', () => {
    it('O retorno deve ser um objeto classItens', async () => {
      produtos = await produtosController.findAll();
      Logger.log(JSON.stringify(produtos, null, 4));
      if (produtos.length === 0) {
        Logger.debug('Nenhum produto encontrado criando um!');
        produtoNovo = true;
        const novoProduto: ProdutosDto = {
          nome: 'produto de teste de itens',
          cor: 'azul',
          tamanho: 'grande',
          valor: 100,
        };
        produto = (await produtosController.add(novoProduto)).code;
      } else {
        produto = produtos[Math.floor(Math.random() * produtos.length)].code;
      }
      pedidos = await pedidosController.findAll();
      if (pedidos.length === 0) {
        Logger.debug('Nenhum pedido encontrado!');
        pedidoNovo = true;
        clientes = await clientesController.findAll();
        if (clientes.length === 0) {
          clienteNovo = true;
          const novoCliente: ClientesDto = {
            nome: 'Cliente testes itens',
            cpf: '11111111111',
            sexo: 'M',
            email: 'joao@consultorweb.cnt.br',
          };
          cliente = (await clientesController.add(novoCliente)).code;
        }
        const novoPedido: PedidosDto = {
          cliente,
          obs: 'teste itens',
          pagamento: 'dinheiro',
          data: new Date(),
        };
        pedido = (await pedidosController.add(novoPedido)).code;
      } else {
        pedido = pedidos[Math.floor(Math.random() * pedidos.length)].code;
      }
      const newItem: ItensDto = {
        pedido: pedido,
        produto: produto,
        quantidade: 10,
      };
      const result: iItem = await itensController.add(pedido, newItem);
      code = result.code;
    });
  });

  describe('findAll', () => {
    it('O retorno deve ser um array de objetos classItens', async () => {
      if (pedidos.length === 0) {
        return [];
      }
      return await itensController.findAll(pedido);
    });
  });

  describe('findOne', () => {
    it('O retorno deve ser um objeto classItens', async () => {
      return await itensController.findOne(code);
    });
  });

  describe('update', () => {
    it('O retorno deve ser um objeto classItens', async () => {
      const itemData: ItensDto = {
        pedido: pedido,
        produto: produto,
        quantidade: 1,
      };
      Logger.log(`itemData: ${JSON.stringify(itemData, null, 4)}`);
      return await itensController.update(code, itemData);
    });
  });

  describe('delete', () => {
    it('O retorno deve ser um objeto classItens', () => {
      return itensController.delete(code).then(async () => {
        if (produtoNovo) {
          await produtosController.delete(produto);
        }
        if (pedidoNovo) {
          await pedidosController.delete(pedido);
        }
        if (clienteNovo) {
          await clientesController.delete(cliente);
        }
      });
    });
  });
});
