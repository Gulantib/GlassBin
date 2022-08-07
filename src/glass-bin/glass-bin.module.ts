import { Module } from '@nestjs/common';
import { GlassBinController } from './glass-bin.controller';
import { GlassBinService } from './glass-bin.service';

@Module({
  imports: [],
  controllers: [GlassBinController],
  providers: [GlassBinService],
})
export class GlassBinModule {}
