/* eslint-disable prettier/prettier */
// dto/change-password.dto.ts
  import { IsString, MinLength } from 'class-validator';
  
  export class ChangePasswordDto {
    @IsString()
    @MinLength(6)
    currentPassword: string;
  
    @IsString()
    @MinLength(6)
    newPassword: string;
  }