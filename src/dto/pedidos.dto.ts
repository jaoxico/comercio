import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';

export class PedidosDto {
  @ApiProperty({
    description: 'Data do pedido.',
    required: true,
    default: new Date(),
    type: Date,
  })
  data: Date;
  @ApiProperty({
    description: 'Observações',
    type: String,
  })
  observacao: string;
  @ApiProperty({
    description: 'Forma de pagamento.',
    required: true,
    type: String,
    enum: ['dinheiro', 'cartão', 'cheque'],
  })
  pagamento: 'dinheiro' | 'cartão' | 'cheque';
  @ApiProperty({
    description: 'Código do cliente',
    required: true,
    type: String,
  })
  cliente: string;
}
