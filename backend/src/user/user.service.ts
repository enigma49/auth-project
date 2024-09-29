import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const password = createUserDto.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      createUserDto.password = hashedPassword;
      const newUser = await this.userModel.create(createUserDto);
      return newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0]; // Get the field that caused the duplicate error
        throw new ConflictException(`${field} already exists`);
      }
      throw new BadRequestException(`${error.message}`);
    }
  }

  async logIn(body: LoginDto) {
    try {
      const user = await this.userModel.findOne({ email: body.email });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const isMatch = await bcrypt.compare(body.password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Invalid password');
      }
      return user;
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
  }

  async findByEmail (email: string) {
    return this.userModel.findOne({ email });
  }

  async getProfile(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  deleteAll() {
    this.userModel.deleteMany({}).then((res) => {
      console.log(res);
    });
  }
}
