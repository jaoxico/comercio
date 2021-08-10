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

@Controller('pedidos')
export class PedidosController {
  protected pedidos;
  private readonly logger = new Logger();
  constructor(private configService: ConfigService) {
    this.pedidos = Pedidos(Connector(this.configService));
  }
  @Get()
  async findAll(): Promise<classPedidos[]> {
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
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<classPedidos> {
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
  async add(@Body() body: PedidosDto): Promise<classPedidos> {
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
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: PedidosDto,
  ): Promise<classPedidos> {
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
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<classPedidos> {
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
