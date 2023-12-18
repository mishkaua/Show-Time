import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { ObjectId } from 'mongoose';
import { Public } from 'src/decorators';

@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}
  @Public()
  @Post()
  create(@Body() createConcertDto: CreateConcertDto) {
    return this.concertsService.create(createConcertDto);
  }
@Public()
  @Get()
  findAll() {
    return this.concertsService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.concertsService.findOne(id);
  }
  @Public()
  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateConcertDto: UpdateConcertDto,
  ) {
    return this.concertsService.update(id, updateConcertDto);
  }
  @Public()
  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.concertsService.remove(id);
  }
}
