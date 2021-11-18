import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ClientesController } from '../Controllers/clientes.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientesDto } from '../dto/clientes.dto';
import { iCliente } from '../interfaces/ICliente';

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
    it('O retorno deve ser um objeto iClientes', async () => {
      const newCliente: ClientesDto = {
        nome: 'Teste automatizado',
        cpf: '11111111111',
        sexo: 'M',
        email: 'joao@consultorweb.cnt.br',
      };
      const result: iCliente = await clientesController.add(newCliente);
      codigo = result.codigo;
    });
  });

  describe('findAll', () => {
    it('O retorno deve ser um objeto iCliente', async () => {
      await clientesController.findAll();
    });
  });

  describe('findOne', () => {
    it('O retorno deve ser um objeto iCliente', async () => {
      await clientesController.findOne(codigo);
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
      await clientesController.update(codigo, clienteData);
    });
  });

  describe('delete', () => {
    it('O retorno deve ser um objeto iCliente', async () => {
      await clientesController.delete(codigo);
    });
  });
});