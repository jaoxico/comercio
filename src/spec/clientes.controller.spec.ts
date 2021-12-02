import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ClientesController } from '../Controllers/clientes.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientesDto } from '../dto/clientes.dto';
import { iCliente } from '../interfaces/ICliente';

describe('ClientesController', () => {
  let clientesController: ClientesController;
  let code: string;

  beforeAll(async () => {
    const clientes: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env/.${process.env.ENVIRONMENT}`,
        }),
      ],
      controllers: [ClientesController],
      providers: [AppService],
    }).compile();

    clientesController = clientes.get<ClientesController>(ClientesController);
  });

  describe('add', () => {
    it('O retorno deve ser um objeto iClientes', async () => {
      const newCliente: ClientesDto = {
        nome: 'Teste automatizado',
        cpf: '11111111111',
        sexo: 'M',
        email: 'joao@consultorweb.cnt.br',
      };
      const result: iCliente = await clientesController.add(newCliente);
      code = result.code;
    });
  });

  describe('findAll', () => {
    it('O retorno deve ser um objeto iCliente', async () => {
      await clientesController.findAll();
    });
  });

  describe('findOne', () => {
    it('O retorno deve ser um objeto iCliente', async () => {
      await clientesController.findOne(code);
    });
  });

  describe('update', () => {
    it('O retorno deve ser um objeto iCliente', async () => {
      const clienteData: ClientesDto = {
        nome: 'Teste automatizado alterado',
        cpf: '11111111111',
        sexo: 'M',
        email: 'joao@consultorweb.cnt.br',
      };
      await clientesController.update(code, clienteData);
    });
  });

  describe('delete', () => {
    it('O retorno deve ser um objeto iCliente', async () => {
      await clientesController.delete(code);
    });
  });
});
