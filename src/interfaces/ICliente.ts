import { ApiProperty } from '@nestjs/swagger';
import { ClientesDto } from '../dto/clientes.dto';

export class iCliente extends ClientesDto {
  @ApiProperty({
    description: 'Código do cliente',
    type: String,
  })
  code: string;
}
