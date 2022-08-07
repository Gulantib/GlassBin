import { Module } from '@nestjs/common';
import { GlassBinModule } from './glass-bin/glass-bin.module';

@Module({
  imports: [GlassBinModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
