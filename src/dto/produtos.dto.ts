import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';

export class ProdutosDto {
  @ApiProperty({
    description: 'Nome do produto',
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  })
  nome: string;
  @ApiProperty({
    description: 'Cor do produto',
    type: String,
    required: true,
    maxLength: 20,
  })
  cor: string;
  @ApiProperty({
    description: 'Tamanho do produto',
    type: String,
    required: true,
    maxLength: 10,
  })
  tamanho: string;
  @ApiProperty({
    description: 'Preço do produto',
    type: Number,
    required: true,
  })
  valor: number;
}
