import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CandlesEntity } from '../entity/candles.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Controller()
export class CandlesController {
    @InjectRepository(CandlesEntity)
    protected readonly entitiesRepository: Repository<CandlesEntity>;

    @Get()
    getAll(): Promise<CandlesEntity[]> {
        return this.entitiesRepository.find();
    }
}