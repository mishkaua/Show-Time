import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Band } from './band.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class BandsService {
  constructor(@InjectModel(Band.name) private bandModel: Model<Band>) {}

  async create(createBandDto: CreateBandDto): Promise<Band> {
    //console.log(createBandDto);
    const band = await this.bandModel.findOne({ title: createBandDto.title });
    if (band) {
      throw 'The band already exists';
    } else {
      const bandToCreate: CreateBandDto = {
        title: createBandDto.title,
        genre: createBandDto.genre,
      };
      console.log(bandToCreate);
      return (await this.bandModel.create(bandToCreate)).save();
    }
  }

  async findAll(): Promise<Band[]> {
    const Bands = this.bandModel.find().exec();
    if (!Bands || (await Bands).length == 0) {
      throw new NotFoundException('Bands not found');
    }
    return Bands;
  }

  findOne(id: ObjectId): Promise<Band> {
    return this.bandModel.findById(id).exec();
  }

  update(id: ObjectId, updateBandDto: UpdateBandDto): Promise<Band> {
    const existingBand = this.bandModel.findByIdAndUpdate(id, updateBandDto, {
      new: true,
    });
    if (!existingBand) {
      throw new NotFoundException('Band #${id} not found');
    }
    return existingBand;
  }

  remove(id: ObjectId): Promise<any> {
    const deletedBand = this.bandModel.findByIdAndDelete(id);
    if (!deletedBand) {
      throw new NotFoundException('Band #${id} not found');
    }
    return deletedBand;
  }
}
