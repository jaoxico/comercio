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
import Connector from '../database/connector';
import { classPedidos, Pedidos } from '../database/models/pedidos';
import { ConfigService } from '@nestjs/config';
import { PedidosDto } from '../dto/pedidos.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { iCliente } from '../interfaces/ICliente';
import { iPedido } from '../interfaces/iPedido';

@Controller('pedidos')
export class PedidosController {
  protected pedidos;
  private readonly logger = new Logger();
  constructor(private configService: ConfigService) {
    this.pedidos = Pedidos(Connector(this.configService));
  }
  @Get()
  @ApiOkResponse({
    description: 'Pedidos encontrados',
    type: [iPedido],
  })
  async findAll(): Promise<iPedido[]> {
    try {
      return await this.pedidos.findAll();
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na busca dos pedidos!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get(':id')
  @ApiOkResponse({
    description: 'Pedido encontrado',
    type: iPedido,
  })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<iPedido> {
    try {
      return await this.pedidos.findByPk(id);
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na busca do pedido!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post()
  @ApiCreatedResponse({
    description: 'Pedido cadastrado com sucesso.',
    type: iPedido,
  })
  async add(@Body() body: PedidosDto): Promise<iPedido> {
    try {
      return await this.pedidos.create(body);
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na creação do pedido.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Put(':id')
  @ApiCreatedResponse({
    description: 'Pedido atualizado com sucesso.',
    type: iPedido,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: PedidosDto,
  ): Promise<iPedido> {
    const foundPedido = await this.pedidos.findByPk(id);
    if (foundPedido === null)
      throw new HttpException(
        'Pedido não encontrado!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    else {
      try {
        return await foundPedido.update(body);
      } catch (reason) {
        this.logger.error(reason);
        throw new HttpException(
          'Falha na alteração do pedido!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Pedido excluído com sucesso.',
    type: iPedido,
  })
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<iPedido> {
    const foundPedido = await this.pedidos.findByPk(id);
    if (foundPedido === null)
      throw new HttpException(
        'Pedido não encontrado!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    else {
      try {
        return await foundPedido.destroy();
      } catch (reason) {
        this.logger.error(reason);
        throw new HttpException(
          'Falha na exclusão do pedido!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
