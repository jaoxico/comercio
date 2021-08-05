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
import { ConfigService } from '@nestjs/config';
import { PedidosDto } from '../dto/pedidos.dto';

@Controller('pedidos')
export class PedidosController {
  protected pedidos;
  constructor(private configService: ConfigService) {
    this.pedidos = Pedidos(Connector(this.configService));
  }
  @Get()
  async findAll(): Promise<IResponse> {
    try {
      const pedidosList: classPedidos[] = await this.pedidos.findAll();
      return {
        success: true,
        pedidos: pedidosList,
      };
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
      const pedidoFound: classPedidos = await this.pedidos.findByPk(id);
      return {
        success: true,
        pedido: pedidoFound,
      };
    } catch (reason) {
      return {
        success: false,
        error: reason,
      };
    }
  }
  @Post()
  async add(@Body() body: PedidosDto): Promise<IResponse> {
    try {
      const newPedido = await this.pedidos.create(body);
      return {
        success: true,
        pedido: newPedido,
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
    @Body() body: PedidosDto,
  ): Promise<IResponse> {
    const foundPedido = await this.pedidos.findByPk(id);
    if (foundPedido === null)
      return {
        success: false,
        message: 'Pedido não encontrado!',
      };
    else {
      try {
        await foundPedido.update(body);
        return {
          success: true,
          pedido: foundPedido,
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
    const foundPedido = await this.pedidos.findByPk(id);
    if (foundPedido === null)
      return {
        success: false,
        message: 'Pedido não encontrado!',
      };
    else {
      try {
        await foundPedido.destroy();
        return {
          success: true,
          pedido: foundPedido,
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
