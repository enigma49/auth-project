import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { User, UserSchema } from './user/schemas/user.schema';
import { AuthModule } from './auth/auth.module';
import { CustomLogger } from './logger/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        mongoose.connection.on('connected', () => {
          console.log('\x1b[32m%s\x1b[0m', 'MongoDB connection established successfully!');
        });

        mongoose.connection.on('error', (error) => {
          console.error('\x1b[31m%s\x1b[0m', 'MongoDB connection error:', error);
        });

        mongoose.connection.on('disconnected', () => {
          console.log('\x1b[33m%s\x1b[0m', 'MongoDB disconnected');
        });

        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, CustomLogger],
})
export class AppModule {}
