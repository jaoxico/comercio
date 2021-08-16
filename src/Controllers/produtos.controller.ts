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
import { classProdutos, Produtos } from '../database/models/produtos';
import { ConfigService } from '@nestjs/config';
import { ProdutosDto } from '../dto/produtos.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { IProduto } from '../interfaces/iProduto';
import { iCliente } from '../interfaces/ICliente';

@Controller('produtos')
export class ProdutosController {
  private logger = new Logger();
  protected produtos;
  constructor(private configService: ConfigService) {
    this.produtos = Produtos(Connector(this.configService));
  }
  @Get()
  @ApiOkResponse({
    description: 'Produtos encontrados',
    type: [IProduto],
  })
  async findAll(): Promise<IProduto[]> {
    try {
      return await this.produtos.findAll();
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na busca dos produtos!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get(':id')
  @ApiOkResponse({
    description: 'Produto encontrado',
    type: IProduto,
  })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<IProduto> {
    try {
      return await this.produtos.findByPk(id);
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na busca do produto!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post()
  @ApiCreatedResponse({
    description: 'Produto cadastrado com sucesso.',
    type: IProduto,
  })
  async add(@Body() body: ProdutosDto): Promise<IProduto> {
    try {
      return await this.produtos.create(body);
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na inclusão do produto!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Put(':id')
  @ApiCreatedResponse({
    description: 'Produto atualizado com sucesso.',
    type: IProduto,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: ProdutosDto,
  ): Promise<IProduto> {
    const foundProduto = await this.produtos.findByPk(id);
    if (foundProduto === null)
      throw new HttpException(
        'Produto não encontrado!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    try {
      return await foundProduto.update(body);
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na alteração do produto!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Produto excluído com sucesso.',
    type: IProduto,
  })
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<IProduto> {
    const foundProduto = await this.produtos.findByPk(id);
    if (foundProduto === null)
      throw new HttpException(
        'Produto não encontrado!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    try {
      return await foundProduto.destroy();
    } catch (reason) {
      this.logger.error(reason);
      throw new HttpException(
        'Falha na exclusão do produto!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
