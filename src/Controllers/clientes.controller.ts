import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { classClientes, Clientes } from '../database/models/clientes';
import Connector from '../database/connector';
import { IResponse } from '../interfaces/response';
import { ConfigService } from '@nestjs/config';
import { ClientesDto } from '../dto/clientes.dto';

@Controller('clientes')
export class ClientesController {
  protected clientes;
  constructor(private configService: ConfigService) {
    this.clientes = Clientes(Connector(this.configService));
  }
  @Get()
  async findAll(): Promise<IResponse> {
    try {
      const clientesList: classClientes[] = await this.clientes.findAll();
      return {
        success: true,
        clientes: clientesList,
      };
    } catch (reason) {
      return {
        success: false,
        error: reason,
      };
    }
  }
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<IResponse> {
    try {
      const clienteFound: classClientes = await this.clientes.findByPk(id);
      return {
        success: true,
        cliente: clienteFound,
      };
    } catch (reason) {
      return {
        success: false,
        error: reason,
      };
    }
  }
  @Post()
  async add(@Body() body: ClientesDto): Promise<IResponse> {
    try {
      const newCliente = await this.clientes.create(body);
      return {
        success: true,
        cliente: newCliente,
      };
    } catch (reason) {
      return {
        success: false,
        error: reason,
      };
    }
  }
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: ClientesDto,
  ): Promise<IResponse> {
    const foundCliente = await this.clientes.findByPk(id);
    if (foundCliente === null)
      return {
        success: false,
        message: 'Cliente não encontrado!',
      };
    else {
      try {
        await foundCliente.update(body);
        return {
          success: true,
          cliente: foundCliente,
        };
      } catch (reaason) {
        return {
          success: false,
          error: reaason,
        };
      }
    }
  }
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<IResponse> {
    const foundCliente = await this.clientes.findByPk(id);
    if (foundCliente === null)
      return {
        success: false,
        message: 'Cliente não encontrado!',
      };
    else {
      try {
        await foundCliente.destroy();
        return {
          success: true,
          cliente: foundCliente,
        };
      } catch (reaason) {
        return {
          success: false,
          error: reaason,
        };
      }
    }
  }
}
