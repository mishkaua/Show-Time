import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { Concert } from './concert.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectModel(Concert.name) private concertModel: Model<Concert>,
  ) {}

  async create(createConcertDto: CreateConcertDto): Promise<Concert> {
    const concertToCreate: CreateConcertDto = {
      band: createConcertDto.band,
      genre: createConcertDto.genre,
      date: createConcertDto.date,
      totalTickets: createConcertDto.totalTickets,
    };
    console.log(concertToCreate);
    return (await this.concertModel.create(concertToCreate)).save();
  }

  async findAll(): Promise<Concert[]> {
    const Concerts = this.concertModel.find().exec();
    if (!Concerts || (await Concerts).length == 0) {
      throw new NotFoundException('No concerts found');
    }
    return Concerts;
  }

  findOne(id: ObjectId): Promise<Concert> {
    return this.concertModel.findById(id).exec();
  }

  update(id: ObjectId, updateConcertDto: UpdateConcertDto): Promise<Concert> {
    const existingConcert = this.concertModel.findByIdAndUpdate(
      id,
      updateConcertDto,
      {
        new: true,
      },
    );
    if (!existingConcert) {
      throw new NotFoundException('Concert #${id} not found');
    }
    return existingConcert;
  }

  remove(id: ObjectId): Promise<any> {
    const deletedConcert = this.concertModel.findByIdAndDelete(id);
    if (!deletedConcert) {
      throw new NotFoundException('Concert #${id} not found');
    }
    return deletedConcert;
  }
}
