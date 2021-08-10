import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';

export class ProdutosDto {
  @ApiProperty({
    description: 'Código do produto',
    type: DataTypes.UUIDV4,
  })
  codigo?: string;
  @ApiProperty({
    description: 'Nome do produto',
    type: DataTypes.STRING,
    required: true,
    minLength: 4,
    maxLength: 50,
  })
  nome: string;
  @ApiProperty({
    description: 'Cor do produto',
    type: DataTypes.STRING,
    required: true,
    maxLength: 20,
  })
  cor: string;
  @ApiProperty({
    description: 'Tamanho do produto',
    type: DataTypes.STRING,
    required: true,
    maxLength: 10,
  })
  tamanho: string;
  @ApiProperty({
    description: 'Preco do produto',
    type: DataTypes.NUMBER,
    required: true,
  })
  valor: number;
}
