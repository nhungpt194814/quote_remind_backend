import { Module } from '@nestjs/common';
import { QuoteService} from './quote.service';
import { QuoteController } from './quote.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteSchema, Quote } from './schema/quote.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [QuoteController],
  providers: [QuoteService],
  imports: [MongooseModule.forFeatureAsync([
    {
      name: Quote.name,
      useFactory: () => {
        const schema = QuoteSchema;
        return schema;
      },
    },
  ]),
  UserModule
]
})
export class QuoteModule {}
