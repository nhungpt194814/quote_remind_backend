import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule} from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { QuoteModule } from './quote/quote.module';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    // for cron job
    ScheduleModule.forRoot(),

    AuthModule,
    // to read environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      
      // for mail
      validationSchema: Joi.object({
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
      })
    }),
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
    UserModule,
    QuoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
