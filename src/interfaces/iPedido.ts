import { PedidosDto } from '../dto/pedidos.dto';
import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';

export class iPedido extends PedidosDto {
  @ApiProperty({
    description: 'Código do pedido',
    required: true,
    type: String,
  })
  code?: string;
}
