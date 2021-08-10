import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ClientesController } from '../Controllers/clientes.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientesDto } from '../dto/clientes.dto';
import { classClientes } from '../database/models/clientes';

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
    it('O retorno deve ser um objeto classClientes', async () => {
      const newCliente: ClientesDto = {
        nome: 'Teste automatizado',
        cpf: '11111111111',
        sexo: 'M',
        email: 'joao@consultorweb.cnt.br',
      };
      const result: classClientes = await clientesController.add(newCliente);
      codigo = result.getDataValue('codigo');
    });
  });

  describe('findAll', () => {
    it('O retorno deve ser um objeto Response', async () => {
      await clientesController.findAll();
    });
  });

  describe('findOne', () => {
    it('O retorno deve ser um objeto Response', async () => {
      await clientesController.findOne(codigo);
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
      await clientesController.update(
        codigo,
        clienteData,
      );
    });
  });

  describe('delete', () => {
    it('O retorno deve ser um objeto Response', async () => {
      await clientesController.delete(codigo);
    });
  });
});
