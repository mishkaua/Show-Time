import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BandsService } from './bands.service';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';
import { ObjectId } from 'mongoose';
import { Public } from 'src/decorators';

@Controller('bands')
export class BandsController {
  constructor(private readonly bandsService: BandsService) {}

  @Post()
  create(@Body() createBandDto: CreateBandDto) {
    return this.bandsService.create(createBandDto);
  }
@Public()
  @Get()
  findAll() {
    return this.bandsService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.bandsService.findOne(id);
  }
  @Public()
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateBandDto: UpdateBandDto) {
    return this.bandsService.update(id, updateBandDto);
  }
  @Public()
  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.bandsService.remove(id);
  }
}
