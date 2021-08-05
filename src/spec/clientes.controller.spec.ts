import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ClientesController } from '../Controllers/clientes.controller';
import { ConfigModule } from '@nestjs/config';
import { IResponse } from '../interfaces/response';
import { ClientesDto } from '../dto/clientes.dto';

describe('ClientesController', () => {
  let clientesController: ClientesController;
  let codigo: string;

  beforeEach(async () => {
    const clientes: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env/.dev`,
        }),
      ],
      controllers: [ClientesController],
      providers: [AppService],
    }).compile();

    clientesController = clientes.get<ClientesController>(ClientesController);
  });

  describe('add', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const newCliente: ClientesDto = {
        nome: 'Teste automatizado',
        cpf: '11111111111',
        sexo: 'M',
        email: 'joao@consultorweb.cnt.br',
      };
      const result: IResponse = await clientesController.add(newCliente);
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('cliente');
      codigo = result.cliente.getDataValue('codigo');
    });
  });

  describe('findAll', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const result: IResponse = await clientesController.findAll();
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('clientes');
    });
  });

  describe('findOne', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const result: IResponse = await clientesController.findOne(codigo);
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('cliente');
    });
  });

  describe('update', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const clienteData: ClientesDto = {
        nome: 'Teste automatizado alterado',
        cpf: '11111111111',
        sexo: 'M',
        email: 'joao@consultorweb.cnt.br',
      };
      const result: IResponse = await clientesController.update(
        codigo,
        clienteData,
      );
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('cliente');
    });
  });

  describe('delete', () => {
    it('O retorno deve ser um objeto Response', async () => {
      const result: IResponse = await clientesController.delete(codigo);
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('cliente');
    });
  });
});
