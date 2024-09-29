import { Controller, Get, Post, Body, UseGuards, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      throw new Error(`Error occurred while creating user: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req) {
    return this.userService.getProfile(req.user.id);
  }

  //This is a route for testing purposes only
  @Get('/delete-all')
  deleteAll() {
    return this.userService.deleteAll();
  }
}
