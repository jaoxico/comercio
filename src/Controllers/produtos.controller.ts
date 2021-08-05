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
import { classProdutos, Produtos } from '../database/models/produtos';
import { ConfigService } from '@nestjs/config';
import { ProdutosDto } from '../dto/produtos.dto';

@Controller('produtos')
export class ProdutosController {
  protected produtos;
  constructor(private configService: ConfigService) {
    this.produtos = Produtos(Connector(this.configService));
  }
  @Get()
  async findAll(): Promise<IResponse> {
    try {
      const produtosList: classProdutos[] = await this.produtos.findAll();
      return {
        success: true,
        produtos: produtosList,
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
      const produtoFound: classProdutos = await this.produtos.findByPk(id);
      return {
        success: true,
        produto: produtoFound,
      };
    } catch (reason) {
      return {
        success: false,
        message: reason,
      };
    }
  }
  @Post()
  async add(@Body() body: ProdutosDto): Promise<IResponse> {
    try {
      const newProduto = await this.produtos.create(body);
      return {
        success: true,
        produto: newProduto,
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
    @Body() body: ProdutosDto,
  ): Promise<IResponse> {
    const foundProduto = await this.produtos.findByPk(id);
    if (foundProduto === null)
      return {
        success: false,
        message: 'Produto não encontrado!',
      };
    else {
      try {
        await foundProduto.update(body);
        return {
          success: true,
          produto: foundProduto,
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
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<IResponse> {
    const foundProduto = await this.produtos.findByPk(id);
    if (foundProduto === null)
      return {
        success: false,
        message: 'Produto não encontrado!',
      };
    else {
      try {
        await foundProduto.destroy();
        return {
          success: true,
          produto: foundProduto,
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
