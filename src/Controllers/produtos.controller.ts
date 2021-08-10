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

@Controller('produtos')
export class ProdutosController {
  private logger = new Logger();
  protected produtos;
  constructor(private configService: ConfigService) {
    this.produtos = Produtos(Connector(this.configService));
  }
  @Get()
  async findAll(): Promise<classProdutos[]> {
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
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<classProdutos> {
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
  async add(@Body() body: ProdutosDto): Promise<classProdutos> {
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
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: ProdutosDto,
  ): Promise<classProdutos> {
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
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<classProdutos> {
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
