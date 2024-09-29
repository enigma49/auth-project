import {
    IsString,
    IsNotEmpty,
    IsEmail,
  } from 'class-validator';
  
  
  export class LoginDto {
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
  }
  