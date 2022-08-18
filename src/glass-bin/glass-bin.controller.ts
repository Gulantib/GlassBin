import { Controller, Param, Body, Get, Post, Put, HttpStatus } from '@nestjs/common';
import { GlassBinService } from './glass-bin.service';
import { GlassBin } from './glass-bin.model';

@Controller('glass-bin')
export class GlassBinController {
  constructor(private readonly glassBinService: GlassBinService) { }

  @Get('/items')
  findAll(): GlassBin[] {
    return this.glassBinService.findAll();
  }

  @Get('/item/:id')
  findOne(
		@Param('id') id: number
  ): GlassBin {
    return this.glassBinService.findOne(id);
  }

  @Get('/find/locate/:latitude/:longitude')
  findClosestItemWithLocate(
    @Param('latitude') latitude: number,
    @Param('longitude') longitude: number
  ): GlassBin {
    return this.glassBinService.findClosestItemWithLocate(latitude, longitude);
  }

  @Get('/find/area/:latitudeUpLeft/:longitudeUpLeft/:latitudeDownRight/:longitudeDownRight')
  findItemsInArea(
    @Param('latitudeUpLeft') latitudeUpLeft: number,
    @Param('longitudeUpLeft') longitudeUpLeft: number,
    @Param('latitudeDownRight') latitudeDownRight: number,
    @Param('longitudeDownRight') longitudeDownRight: number
  ): GlassBin[] {
    return this.glassBinService.findItemsInArea(latitudeUpLeft, longitudeUpLeft, latitudeDownRight, longitudeDownRight);
  }

  @Post('/item')
  addItem(
    @Body('name') name: string,
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number
  ): GlassBin {
    return this.glassBinService.addItem(name, latitude, longitude);
  }

  @Put('/item/:id')
  updateItem(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number
  ): GlassBin {
    return this.glassBinService.updateItem(id, name, latitude, longitude);
  }
}
