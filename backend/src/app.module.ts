import { Module } from '@nestjs/common';
import { CandlesModule } from './candles/candles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '123456',
          database: 'defaultdb',
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          synchronize: false,
      }
    ),
    CandlesModule,
  ],
  providers: [],
})
export class AppModule {}
