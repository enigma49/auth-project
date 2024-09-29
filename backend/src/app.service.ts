import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async onModuleInit() {
    try {
      await this.userModel.createIndexes();
      console.log('Indexes have been created successfully');
    } catch (error) {
      console.error('Error creating indexes:', error);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
