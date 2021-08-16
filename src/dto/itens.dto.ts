import { ApiProperty } from '@nestjs/swagger';

export class ItensDto {
  @ApiProperty({
    description: 'Código do pedido',
    required: true,
    type: String,
  })
  pedido: string;
  @ApiProperty({
    description: 'Código do produto',
    required: true,
    type: String,
  })
  produto: string;
  @ApiProperty({
    description: 'Quantidade',
    required: true,
    type: Number,
  })
  quantidade: number;
}
