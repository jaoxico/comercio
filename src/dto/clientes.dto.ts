import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';

export class ClientesDto {
  @ApiProperty({
    description: 'Código do cliente',
    type: DataTypes.UUIDV4,
  })
  codigo?: string;
  @ApiProperty({
    description: 'Nome do cliente',
    type: DataTypes.STRING,
    required: true,
    minLength: 4,
    maxLength: 50,
  })
  nome: string;
  @ApiProperty({
    description: 'CPF do cliente',
    required: true,
    type: DataTypes.STRING,
    pattern: '99999999999',
  })
  cpf: string;
  @ApiProperty({
    description: 'Sexo (M -> Masculino, F -> Feminino',
    required: true,
    type: DataTypes.STRING,
    enum: ['M', 'F'],
  })
  sexo: 'M' | 'F';
  @ApiProperty({
    description: 'E-mail',
    type: DataTypes.STRING,
    maxLength: 255,
  })
  email: string;
}
