import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ClientesController } from '../Controllers/clientes.controller';
import { ConfigModule } from '@nestjs/config';
import { IResponse } from '../interfaces/response';
import { ClientesDto } from '../dto/clientes.dto';
import { ProdutosController } from '../Controllers/produtos.controller';
import { ProdutosDto } from '../dto/produtos.dto';

describe('ProdutosController', () => {
  let produtosController: ProdutosController;
  let codigo: string;

  beforeEach(async () => {
    const produtos: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env/.dev`,
        }),
      ],
      controllers: [ProdutosController],
      providers: [AppService],
    }).compile();

    produtosController = produtos.get<ProdutosController>(ProdutosController);
  });

  describe('add', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const newProduto: ProdutosDto = {
        nome: 'Teste automatizado',
        cor: 'preto',
        tamanho: 'P',
        valor: 100,
      };
      const result: IResponse = await produtosController.add(newProduto);
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('produto');
      codigo = result.produto.getDataValue('codigo');
    });
  });

  describe('findAll', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const result: IResponse = await produtosController.findAll();
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('produtos');
    });
  });

  describe('findOne', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const result: IResponse = await produtosController.findOne(codigo);
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('produto');
    });
  });

  describe('update', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const produtoData: ProdutosDto = {
        nome: 'Teste automatizado alterado',
        cor: 'branco',
        tamanho: 'P',
        valor: 100,
      };
      const result: IResponse = await produtosController.update(
        codigo,
        produtoData,
      );
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('produto');
    });
  });

  describe('delete', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const result: IResponse = await produtosController.delete(codigo);
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('produto');
    });
  });
});
