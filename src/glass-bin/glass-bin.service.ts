import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlassBin } from './glass-bin.model';
const fs = require('fs');

@Injectable()
export class GlassBinService {
  static glassBinList: GlassBin[] = [];

  constructor(
    @InjectRepository(GlassBin) private readonly glassBinRepository: Repository<GlassBin>,
  ) {
    this.loadGlassBinListInDatabase();
  }

  findAll(): GlassBin[] {
    return GlassBinService.glassBinList;
  }

  findOne(id: number): GlassBin {
		return GlassBinService.glassBinList.find(element => { return element.id == id });
  }

  findClosestItemWithLocate(
    latitude: number,
    longitude: number
  ): GlassBin {
    var minimumLength: number = Number.POSITIVE_INFINITY;
    var closestItemId: number;
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
    //var newId: number = Number(GlassBinService.glassBinList[GlassBinService.glassBinList.length-1].id) + 1;
		GlassBinService.glassBinList.push(new GlassBin(null, name, latitude, longitude));
    this.saveGlassBinListOnFile();
    this.saveGlassBinOnDatabase(GlassBinService.glassBinList[GlassBinService.glassBinList.length-1])
    return GlassBinService.glassBinList[GlassBinService.glassBinList.length-1];
  }

  updateItem(
    id: number,
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

  loadGlassBinListInDatabase() {
		this.glassBinRepository.find().then(
      ((glassBinList: GlassBin[]) => GlassBinService.glassBinList = glassBinList)
    );
	}

  loadGlassBinListInFile() {
		var dataFile = fs.readFileSync('src/glass-bin/glass-bin-list.json','utf8');
		var glassBinListDataFile = JSON.parse(dataFile);
		GlassBinService.glassBinList = [];
		glassBinListDataFile.forEach(element => {
			GlassBinService.glassBinList.push(new GlassBin(element.id, element.name, element.latitude, element.longitude));
		});
	}

  saveGlassBinOnDatabase(glassBin: GlassBin) {
    this.glassBinRepository.save(glassBin);
	}

  saveGlassBinListOnFile() {
    var dataFile = "[\n";
    GlassBinService.glassBinList.forEach(element => { 
      dataFile += "\t" + JSON.stringify(element) + ",\n";
    })
    dataFile = dataFile.substring(0, dataFile.length-2) + "\n";
    dataFile += "]";

    fs.writeFileSync('src/glass-bin/glass-bin-list.json', dataFile);
	}
}
