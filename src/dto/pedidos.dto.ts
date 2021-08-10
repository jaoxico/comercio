import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';

export class PedidosDto {
  @ApiProperty({
    description: 'Código do pedido',
    required: true,
    type: DataTypes.UUIDV4,
  })
  codigo?: string;
  @ApiProperty({
    description: 'Data do pedido.',
    required: true,
    default: new Date(),
    type: DataTypes.DATE,
  })
  data: Date;
  @ApiProperty({
    description: 'Observações',
    type: DataTypes.STRING,
  })
  observacao: string;
  @ApiProperty({
    description: 'Forma de pagamento.',
    required: true,
    enum: ['dinheiro', 'cartão', 'cheque'],
  })
  pagamento: 'dinheiro' | 'cartão' | 'cheque';
  @ApiProperty({
    description: 'Código do cliente',
    required: true,
    type: DataTypes.UUIDV4,
  })
  cliente: string;
}
