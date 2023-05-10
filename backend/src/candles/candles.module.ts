import { Module } from '@nestjs/common';
import { CandlesController } from './candles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandlesEntity } from 'src/entity/candles.entity';
@Module({
  imports: [TypeOrmModule.forFeature([
    CandlesEntity
  ])],  
  controllers: [CandlesController],
  providers: [],
})
export class CandlesModule {}