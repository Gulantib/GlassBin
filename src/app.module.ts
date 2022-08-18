import "reflect-metadata"
import { Module } from '@nestjs/common';
import { GlassBinModule } from './glass-bin/glass-bin.module';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlassBin } from "./glass-bin/glass-bin.model";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        //ssl: { rejectUnauthorized: true },
        // host: configService.get('DB_HOST'),
        // port: +configService.get<number>('DB_PORT'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_NAME'),
        entities: [GlassBin],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    GlassBinModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
