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
import Connector from '../database/connector';
import { IResponse } from '../interfaces/response';
import { classPedidos, Pedidos } from '../database/models/pedidos';
import { classItens, Itens } from '../database/models/itens';
import { ConfigService } from '@nestjs/config';
import { ItensDto } from '../dto/itens.dto';

@Controller('itens')
export class ItensController {
  protected itens;
  protected pedidos;
  protected connector;
  constructor(private configService: ConfigService) {
    this.connector = Connector(this.configService);
    this.itens = Itens(this.connector);
    this.pedidos = Pedidos(this.connector);
  }
  @Get('pedido/:pedido')
  async findAll(@Param('pedido', new ParseUUIDPipe()) pedido: string): Promise<IResponse> {
    try {
      const foundPedido: classPedidos = await this.pedidos.findByPk(pedido);
      if (foundPedido === null)
        return {
          success: false,
          message: `Pedido (${pedido}) não encontrado!`,
        };
      else {
        const foundItensList: classItens[] = await this.itens.findAll({
          where: {
            pedido: foundPedido.getDataValue('codigo'),
          },
        });
        return {
          success: true,
          itens: foundItensList,
        };
      }
    } catch (reason) {
      return {
        success: false,
        error: reason,
      };
    }
  }
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<IResponse> {
    try {
      const itemFound: classItens = await this.itens.findByPk(id);
      return {
        success: true,
        item: itemFound,
      };
    } catch (reason) {
      return {
        success: false,
        error: reason,
      };
    }
  }
  @Post('pedido/:pedido')
  async add(
    @Param('pedido', new ParseUUIDPipe()) pedido: string,
    @Body() body: ItensDto,
  ): Promise<IResponse> {
    try {
      const foundPedido: classPedidos = await this.pedidos.findByPk(pedido);
      if (foundPedido === null)
        return {
          success: false,
          message: `Pedido (${pedido}) não encontrado!`,
        };
      else {
        const newItem = await this.itens.create({
          pedido: pedido,
          ...body,
        });
        return {
          success: true,
          item: newItem,
        };
      }
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
    @Body() body: ItensDto,
  ): Promise<IResponse> {
    const foundItem = await this.itens.findByPk(id);
    if (foundItem === null)
      return {
        success: false,
        message: 'Ítem não encontrado!',
      };
    else {
      try {
        await foundItem.update(body);
        return {
          success: true,
          item: foundItem,
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
    const foundItem = await this.itens.findByPk(id);
    if (foundItem === null)
      return {
        success: false,
        message: 'Item não encontrado!',
      };
    else {
      try {
        await foundItem.destroy();
        return {
          success: true,
          item: foundItem,
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
