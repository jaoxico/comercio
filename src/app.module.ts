import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientesController } from './Controllers/clientes.controller';
import { AppService } from './app.service';
import { ProdutosController } from './Controllers/produtos.controller';
import { PedidosController } from './Controllers/pedidosController';
import { ItensController } from './Controllers/itens.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env/.dev`,
    }),
  ],
  controllers: [
    ProdutosController,
    ProdutosController,
    PedidosController,
    ItensController,
  ],
  providers: [AppService],
})
export class AppModule {}
