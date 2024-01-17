import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './schema/user.schema';
import { Model } from 'mongoose'
import { comparePassword, hashPassword } from 'src/util/password_util';
import { LoginDto } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class UserService {
  constructor(
    // table name
    @InjectModel(User.name)
    private readonly model: Model<UserDocument>,
    private authService : AuthService,
  ){}

  async create(createUserDto: CreateUserDto) {
    // encode password 
    createUserDto.password = await hashPassword(createUserDto.password)
    return await this.model.create(createUserDto);
  }

  async logIn(loginDto: LoginDto){
      console.log(loginDto)
      const user = await this.model.findOne({email: loginDto.email}).exec();
      if(user==null){
        return "this email does not exist";
      }
      
      const check = await comparePassword(loginDto.password, user.password);
      if(check==false){
        return "password wrong"
      }else {
        const payload = {
          email : user.email,
          id : user.id,
          username : user.username
        }
        // create token
        const accessToken = await this.authService.generateJwt(payload);
        const userId = user.id
        return {accessToken, userId};
      }
    
  }
  
  async findAll() {
    return await this.model.find().exec();
  }

  async findOne(id: string) {
    return await this.model.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.model.findByIdAndUpdate(id,updateUserDto).exec();
  }

  async remove(id: string) {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
