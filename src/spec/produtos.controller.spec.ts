import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ConfigModule } from '@nestjs/config';
import { ProdutosController } from '../Controllers/produtos.controller';
import { ProdutosDto } from '../dto/produtos.dto';
import { IProduto } from '../interfaces/iProduto';

describe('ProdutosController', () => {
  let produtosController: ProdutosController;
  let code: string;

  beforeAll(async () => {
    const produtos: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env/.${process.env.ENVIRONMENT}`,
        }),
      ],
      controllers: [ProdutosController],
      providers: [AppService],
    }).compile();

    produtosController = produtos.get<ProdutosController>(ProdutosController);
  });

  describe('add', () => {
    it('O retorno deve ser um objeto classProdutos', async () => {
      const newProduto: ProdutosDto = {
        nome: 'Teste automatizado',
        cor: 'preto',
        tamanho: 'P',
        valor: 100,
      };
      const result: IProduto = await produtosController.add(newProduto);
      code = result.code;
    });
  });

  describe('findAll', () => {
    it('O retorno deve ser um array de objetos classProdutos', async () => {
      return await produtosController.findAll();
    });
  });

  describe('findOne', () => {
    it('O retorno deve ser um objeto classProdutos', async () => {
      return await produtosController.findOne(code);
    });
  });

  describe('update', () => {
    it('O retorno deve ser um objeto classProdutos', async () => {
      const produtoData: ProdutosDto = {
        nome: 'Teste automatizado alterado',
        cor: 'branco',
        tamanho: 'P',
        valor: 100,
      };
      return await produtosController.update(code, produtoData);
    });
  });

  describe('delete', () => {
    it('O retorno deve ser um objeto classProdutos', async () => {
      return await produtosController.delete(code);
    });
  });
});
