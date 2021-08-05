import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ClientesController } from '../Controllers/clientes.controller';
import { ConfigModule } from '@nestjs/config';
import { IResponse } from '../interfaces/response';
import { PedidosController } from '../Controllers/pedidosController';
import { PedidosDto } from '../dto/pedidos.dto';
import { ItensController } from '../Controllers/itens.controller';
import { ProdutosController } from '../Controllers/produtos.controller';
import { ItensDto } from '../dto/itens.dto';

describe('ItensController', () => {
  let produtosController: ProdutosController;
  let pedidosController: PedidosController;
  let itensController: ItensController;
  let codigo: string;
  let pedido: string;
  let produto: string;

  beforeEach(async () => {
    const itens: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env/.dev`,
        }),
      ],
      controllers: [ItensController, PedidosController, ProdutosController],
      providers: [AppService],
    }).compile();

    produtosController = itens.get<ProdutosController>(ProdutosController);
    pedidosController = itens.get<PedidosController>(PedidosController);
    itensController = itens.get<ItensController>(ItensController);
  });

  describe('add', () => {
    it('O retorno deve ser um objeto Response', async () => {
      pedido = (await pedidosController.findAll()).pedidos[0].getDataValue(
        'codigo',
      );
      produto = (await produtosController.findAll()).produtos[0].getDataValue(
        'codigo',
      );
      const newItem: ItensDto = {
        pedido: pedido,
        produto: produto,
        quantidade: 10,
      };
      const result: IResponse = await itensController.add(pedido, newItem);
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('item');
      codigo = result.item.getDataValue('codigo');
    });
  });

  describe('findAll', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const result: IResponse = await itensController.findAll(pedido);
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('itens');
    });
  });

  describe('findOne', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const result: IResponse = await itensController.findOne(codigo);
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('item');
    });
  });

  describe('update', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const itemData: ItensDto = {
        pedido: pedido,
        produto: produto,
        quantidade: 1,
      };
      const result: IResponse = await itensController.update(
        codigo,
        itemData,
      );
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('item');
    });
  });

  describe('delete', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const result: IResponse = await itensController.delete(codigo);
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('item');
    });
  });
});
