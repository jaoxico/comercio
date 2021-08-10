import { ApiProperty } from '@nestjs/swagger';

export class ItensDto {
  @ApiProperty()
  pedido: string;
  @ApiProperty()
  produto: string;
  @ApiProperty()
  quantidade: number;
}
