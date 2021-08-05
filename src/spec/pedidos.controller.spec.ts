import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ClientesController } from '../Controllers/clientes.controller';
import { ConfigModule } from '@nestjs/config';
import { IResponse } from '../interfaces/response';
import { ClientesDto } from '../dto/clientes.dto';
import { PedidosController } from '../Controllers/pedidosController';
import { PedidosDto } from '../dto/pedidos.dto';

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
    it('O retorno deve ser um objeto Response', async () => {
      cliente = (await clientesController.findAll()).clientes[0].getDataValue('codigo');
      const newPedido: PedidosDto = {
        cliente,
        data: new Date(),
        observacao: '',
        pagamento: 'dinheiro',
      };
      const result: IResponse = await pedidosController.add(newPedido);
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('pedido');
      codigo = result.pedido.getDataValue('codigo');
    });
  });

  describe('findAll', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const result: IResponse = await pedidosController.findAll();
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('pedidos');
    });
  });

  describe('findOne', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const result: IResponse = await pedidosController.findOne(codigo);
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('pedido');
    });
  });

  describe('update', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const pedidoData: PedidosDto = {
        cliente,
        data: new Date(),
        observacao: 'Alterado',
        pagamento: 'dinheiro',
      };
      const result: IResponse = await pedidosController.update(
        codigo,
        pedidoData,
      );
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('pedido');
    });
  });

  describe('delete', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const result: IResponse = await pedidosController.delete(codigo);
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('pedido');
    });
  });
});
