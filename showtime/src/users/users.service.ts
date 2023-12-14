import { BadRequestException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, ObjectId } from 'mongoose';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { error } from 'console';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw 'email already exists';
    } else {
      const saltOrRounds = 10;
      const salt = await bcrypt.genSalt(saltOrRounds);
      const password = createUserDto.password;
      const hash = await bcrypt.hash(password, salt);
      const userToCreate: CreateUserDto = {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hash,
        passwordConfirmation: '',
      };
      console.log(userToCreate);
      return (await this.userModel.create(userToCreate)).save();
    }
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
    return this.userModel.findOne({ username: username }).exec();
  }

  update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!existingUser) {
      throw new NotFoundException('User #${id} not found');
    }
    return existingUser;
  }

  remove(id: ObjectId): Promise<any> {
    const deletedUser = this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException('User #${id} not found');
    }
    return deletedUser;
  }
}
