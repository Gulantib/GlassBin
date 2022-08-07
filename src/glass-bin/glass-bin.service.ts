import { HttpServer, HttpStatus, Injectable } from '@nestjs/common';
import { GlassBin } from './glass-bin.model';

@Injectable()
export class GlassBinService {
  static glassBinList: GlassBin[] = [new GlassBin('1', 'test', -9.258, 18.562)
      ,new GlassBin('2', 'test 2', 54.829, -15.178)
      ,new GlassBin('3', '0 0', 0, 0)
      ,new GlassBin('4', '10 -10', 10, -10)
      ,new GlassBin('5', '10 10', 10, 10)];

  findAll(): GlassBin[] {
    return GlassBinService.glassBinList;
  }

  findOne(id: string): GlassBin {
		return GlassBinService.glassBinList.find(element => { return element.id == id });
  }

  findClosestItemWithLocate(
    latitude: number,
    longitude: number
  ): GlassBin {
    var minimumLength: number = Number.POSITIVE_INFINITY;
    var closestItemId: string;
    var currentItem: GlassBin;
    var lengthCurrentItem: number;
    
    for (var i: number = 0; i < GlassBinService.glassBinList.length; ++i) {
      currentItem = GlassBinService.glassBinList[i];
      lengthCurrentItem = Math.abs(latitude - currentItem.latitude) * Math.abs(latitude - currentItem.latitude)
                        + Math.abs(longitude - currentItem.longitude) * Math.abs(longitude - currentItem.longitude);
      if (lengthCurrentItem < minimumLength) {
        closestItemId = currentItem.id;
        minimumLength = lengthCurrentItem;
      }
    } 
    return this.findOne(closestItemId);
  }

  findItemsInArea(
    latitudeUpLeft: number,
    longitudeUpLeft: number,
    latitudeDownRight: number,
    longitudeDownRight: number
  ): GlassBin[] {
    return GlassBinService.glassBinList
    .filter(element => element.latitude <= latitudeUpLeft)
    .filter(element => element.latitude >= latitudeDownRight)
    .filter(element => element.longitude >= longitudeUpLeft)
    .filter(element => element.longitude <= longitudeDownRight)
  }

  addItem(
    name: string,
    latitude: number,
    longitude: number
  ): GlassBin {
    var newId: number = Number(GlassBinService.glassBinList[GlassBinService.glassBinList.length-1].id) + 1;
		GlassBinService.glassBinList.push(new GlassBin(newId.toString(), name, latitude, longitude));
    return GlassBinService.glassBinList[GlassBinService.glassBinList.length-1];
  }

  updateItem(
    id: string,
    name: string,
    latitude: number,
    longitude: number
  ): GlassBin {
		var itemToUpdate: GlassBin = this.findOne(id);
    itemToUpdate.name = name;
    itemToUpdate.latitude = latitude;
    itemToUpdate.longitude = longitude;
    return itemToUpdate;
  }
}
