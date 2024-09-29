import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './authenticators/local.authenticators';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import jwtConfig from './config/jwt.config';
import refreshJwtConfig from './config/refresh.jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './authenticators/jwt.authenticators';
import { RefreshStrategy } from './authenticators/refresh.authenticators';
import googleOauthConfig from './config/google-oauth.config';
import { GoogleOauthStrategy } from './authenticators/google.oauth.authenticators';
import { CustomLogger } from 'src/logger/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    GoogleOauthStrategy,
    CustomLogger,
  ],
})
export class AuthModule {}
