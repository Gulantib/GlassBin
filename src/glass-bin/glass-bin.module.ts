import { Module } from '@nestjs/common';
import { GlassBinController } from './glass-bin.controller';
import { GlassBinService } from './glass-bin.service';
import { GlassBin } from './glass-bin.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GlassBin])],
  controllers: [GlassBinController],
  providers: [GlassBinService],
})
export class GlassBinModule {}
