import { ItensDto } from '../dto/itens.dto';
import { ApiProperty } from '@nestjs/swagger';

export class iItem extends ItensDto {
  @ApiProperty({
    description: 'Código do ítem',
    required: true,
    type: String,
  })
  codigo: string;
}
