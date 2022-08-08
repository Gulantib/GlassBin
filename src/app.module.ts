import { Module } from '@nestjs/common';
import { GlassBinModule } from './glass-bin/glass-bin.module';
import { AppController } from './app.controller';

@Module({
  imports: [GlassBinModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
