import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ClientesController } from '../Controllers/clientes.controller';
import { ConfigModule } from '@nestjs/config';
import { IResponse } from '../interfaces/response';
import { PedidosController } from '../Controllers/pedidosController';
import { PedidosDto } from '../dto/pedidos.dto';
import { classPedidos } from '../database/models/pedidos';

describe('PedidosController', () => {
  let clientesController: ClientesController;
  let pedidosController: PedidosController;
  let codigo: string;
  let cliente: string;

  beforeEach(async () => {
    const pedidos: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env/.dev`,
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
      cliente = (await clientesController.findAll())[0].getDataValue('codigo');
      const newPedido: PedidosDto = {
        cliente,
        data: new Date(),
        observacao: '',
        pagamento: 'dinheiro',
      };
      const result: classPedidos = await pedidosController.add(newPedido);
      codigo = result.getDataValue('codigo');
    });
  });

  describe('findAll', () => {
    it('O retorno deve ser um objeto classPedidos', async () => {
      await pedidosController.findAll();
    });
  });

  describe('findOne', () => {
    it('O retorno deve ser um objeto classPedidos', async () => {
      await pedidosController.findOne(codigo);
    });
  });

  describe('update', () => {
    it('O retorno deve ser um objeto classPedidos', async () => {
      const pedidoData: PedidosDto = {
        cliente,
        data: new Date(),
        observacao: 'Alterado',
        pagamento: 'dinheiro',
      };
      await pedidosController.update(
        codigo,
        pedidoData,
      );
    });
  });

  describe('delete', () => {
    it('O retorno deve ser um objeto classPedidos', async () => {
      await pedidosController.delete(codigo);
    });
  });
});
