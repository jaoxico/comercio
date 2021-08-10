import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ConfigModule } from '@nestjs/config';
import { PedidosController } from '../Controllers/pedidosController';
import { ItensController } from '../Controllers/itens.controller';
import { ProdutosController } from '../Controllers/produtos.controller';
import { ItensDto } from '../dto/itens.dto';
import { classItens } from '../database/models/itens';

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
    it('O retorno deve ser um objeto classItens', async () => {
      pedido = (await pedidosController.findAll())[0].getDataValue('codigo');
      produto = (await produtosController.findAll())[0].getDataValue('codigo');
      const newItem: ItensDto = {
        pedido: pedido,
        produto: produto,
        quantidade: 10,
      };
      const result: classItens = await itensController.add(pedido, newItem);
      codigo = result.getDataValue('codigo');
    });
  });

  describe('findAll', () => {
    it('O retorno deve ser um array de objetos classItens', async () => {
      return await itensController.findAll(pedido);
    });
  });

  describe('findOne', () => {
    it('O retorno deve ser um objeto classItens', async () => {
      return await itensController.findOne(codigo);
    });
  });

  describe('update', () => {
    it('O retorno deve ser um objeto classItens', async () => {
      const itemData: ItensDto = {
        pedido: pedido,
        produto: produto,
        quantidade: 1,
      };
      return await itensController.update(codigo, itemData);
    });
  });

  describe('delete', () => {
    it('O retorno deve ser um objeto classItens', async () => {
      return await itensController.delete(codigo);
    });
  });
});
