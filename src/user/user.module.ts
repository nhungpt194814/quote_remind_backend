import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { AuthModule } from 'src/auth/auth.module';

// to declare mongoose for module
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [MongooseModule.forFeatureAsync([
    {
      name: User.name,
      useFactory: () => {
        const schema = UserSchema;
        return schema;
      },
    },
  ]),
  AuthModule  
  ],
  exports: [UserService]
})
export class UserModule { }
