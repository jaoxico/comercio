import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ClientesController } from '../Controllers/clientes.controller';
import { ConfigModule } from '@nestjs/config';
import { PedidosController } from '../Controllers/pedidosController';
import { PedidosDto } from '../dto/pedidos.dto';
import { iPedido } from '../interfaces/iPedido';
import { iCliente } from '../interfaces/ICliente';
import { Logger } from '@nestjs/common';

describe('PedidosController', () => {
  let clientesController: ClientesController;
  let pedidosController: PedidosController;
  let code: string;
  let cliente: string;
  let clientes: iCliente[];

  beforeAll(async () => {
    const pedidos: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env/.${process.env.ENVIRONMENT}`,
        }),
      ],
      controllers: [PedidosController, ClientesController],
      providers: [AppService],
    }).compile();

    clientesController = pedidos.get<ClientesController>(ClientesController);
    pedidosController = pedidos.get<PedidosController>(PedidosController);
  });

  describe('add', () => {
    it('O retorno deve ser um objeto classPedidos', async () => {
      clientes = await clientesController.findAll();
      if (clientes.length === 0) {
        Logger.debug('Nenhum cliente encontrado.');
        return;
      }

      const newPedido: PedidosDto = {
        cliente,
        data: new Date(),
        obs: '',
        pagamento: 'dinheiro',
      };
      const result: iPedido = await pedidosController.add(newPedido);
      code = result.code;
    });
  });

  describe('findAll', () => {
    it('O retorno deve ser um objeto classPedidos', async () => {
      await pedidosController.findAll();
    });
  });

  describe('findOne', () => {
    it('O retorno deve ser um objeto classPedidos', async () => {
      if (!code) {
        return;
      }
      await pedidosController.findOne(code);
    });
  });

  describe('update', () => {
    it('O retorno deve ser um objeto classPedidos', async () => {
      if (!code) {
        return;
      }
      const pedidoData: PedidosDto = {
        cliente,
        data: new Date(),
        obs: 'Alterado',
        pagamento: 'dinheiro',
      };
      await pedidosController.update(code, pedidoData);
    });
  });

  describe('delete', () => {
    if (!code) {
      return;
    }
    it('O retorno deve ser um objeto classPedidos', async () => {
      await pedidosController.delete(code);
    });
  });
});
