import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule} from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    AuthModule,
    // to read environment variables
    ConfigModule.forRoot(),
    // to connect to mongo
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
        dbName: configService.get<string>('DATABASE_DB'),
        // useNewUrlParser: true,
        // useUnfiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
