import { ProdutosDto } from '../dto/produtos.dto';
import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';

export class IProduto extends ProdutosDto {
  @ApiProperty({
    description: 'Código do produto',
    type: String,
  })
  code: string;
}
