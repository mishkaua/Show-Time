import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    const userData = this.userModel.find().exec();
    if (!userData || (await userData).length == 0) {
      throw new NotFoundException('User data not found');
    }
    return userData;
  }

  findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
  findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username:username }).exec();
  }


  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!existingUser) {
      throw new NotFoundException('User #${id} not found');
    }
    return existingUser;
  }

  remove(id: number): Promise<any> {
    const deletedUser = this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException('User #${id} not found');
    }
    return deletedUser;
  }
}
