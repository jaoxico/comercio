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
import { classItens, Itens } from '../database/models/itens';
import { ConfigService } from '@nestjs/config';
import { ItensDto } from '../dto/itens.dto';

@Controller('itens')
export class ItensController {
  private logger = new Logger();
  protected itens;
  protected pedidos;
  protected connector;
  constructor(private configService: ConfigService) {
    this.connector = Connector(this.configService);
    this.itens = Itens(this.connector);
    this.pedidos = Pedidos(this.connector);
  }
  @Get('pedido/:pedido')
  async findAll(
    @Param('pedido', new ParseUUIDPipe()) pedido: string,
  ): Promise<classItens[]> {
    try {
      const foundPedido: classPedidos = await this.pedidos.findByPk(pedido);
      if (foundPedido === null) {
        const msg = `Pedido (${pedido}) não encontrado!`;
        throw new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return await this.itens.findAll({
        where: {
          pedido: foundPedido.getDataValue('codigo'),
        },
      });
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na busca dos itens!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<classItens> {
    try {
      return await this.itens.findByPk(id);
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na busca do item!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('pedido/:pedido')
  async add(
    @Param('pedido', new ParseUUIDPipe()) pedido: string,
    @Body() body: ItensDto,
  ): Promise<classItens> {
    try {
      const foundPedido: classPedidos = await this.pedidos.findByPk(pedido);
      if (foundPedido === null) {
        const msg = `Pedido (${pedido}) não encontrado!`;
        throw new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return await this.itens.create({
        pedido: pedido,
        ...body,
      });
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na inclusão do item!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: ItensDto,
  ): Promise<classItens> {
    const foundItem = await this.itens.findByPk(id);
    if (foundItem === null)
      throw new HttpException(
        'Ítem não encontrado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    try {
      return await foundItem.update(body);
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na alteração do item!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<classItens> {
    const foundItem = await this.itens.findByPk(id);
    if (foundItem === null)
      throw new HttpException(
        'Ítem não encontrado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    try {
      return await foundItem.destroy();
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na exclusão do item!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
