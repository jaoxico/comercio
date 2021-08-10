import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { classClientes, Clientes } from '../database/models/clientes';
import Connector from '../database/connector';
import { ConfigService } from '@nestjs/config';
import { ClientesDto } from '../dto/clientes.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('clientes')
export class ClientesController {
  protected clientes;
  private readonly logger = new Logger();
  constructor(private configService: ConfigService) {
    this.clientes = Clientes(Connector(this.configService));
  }
  @Get()
  @ApiOkResponse({
    description: 'Clientes encontrados',
    type: [classClientes],
  })
  async findAll(): Promise<classClientes[]> {
    try {
      return await this.clientes.findAll();
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na busca dos clientes!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get(':id')
  @ApiOkResponse({
    description: 'Cliente encontrado',
    type: classClientes,
  })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<classClientes> {
    try {
      return await this.clientes.findByPk(id);
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na busca do cliente com o código: (' + id + ')',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post()
  @ApiCreatedResponse({
    description: 'Cliente cadastrado com sucesso.',
    type: classClientes,
  })
  async add(@Body() body: ClientesDto): Promise<classClientes> {
    try {
      return await this.clientes.create(body);
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha no cadastro do cliente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: ClientesDto,
  ): Promise<classClientes> {
    const foundCliente = await this.clientes.findByPk(id);
    if (foundCliente === null)
      throw new HttpException(
        'Falha na busca do cliente com o código: (' + id + ')',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    else {
      try {
        return await foundCliente.update(body);
      } catch (reason) {
        this.logger.error(reason);
        throw new HttpException(
          'Falha na alteração do cliente',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<classClientes> {
    const foundCliente = await this.clientes.findByPk(id);
    if (foundCliente === null)
      throw new HttpException(
        'Falha na busca do cliente com o código: (' + id + ')',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    else {
      try {
        return await foundCliente.destroy();
      } catch (reason) {
        this.logger.error(reason);
        throw new HttpException(
          'Falha na exclusão do cliente',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
