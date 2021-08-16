import { ApiProperty } from '@nestjs/swagger';

export class ClientesDto {
  @ApiProperty({
    description: 'Nome do cliente',
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  })
  nome: string;
  @ApiProperty({
    description: 'CPF do cliente',
    required: true,
    type: String,
    pattern: '99999999999',
  })
  cpf: string;
  @ApiProperty({
    description: 'Sexo (M -> Masculino, F -> Feminino',
    required: true,
    type: String,
  })
  sexo: 'M' | 'F';
  @ApiProperty({
    description: 'E-mail',
    type: String,
    required: true,
    maxLength: 255,
  })
  email: string;
}
