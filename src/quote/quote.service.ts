import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectModel } from '@nestjs/mongoose';
import { QuoteDocument, Quote } from './schema/quote.schema';
import { Model } from 'mongoose'

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel(Quote.name)
    private readonly model: Model<QuoteDocument>
  ){}

  async create(createQuoteDto: CreateQuoteDto) {
    return await this.model.create(createQuoteDto);
  }

  async findAll() {
    return await this.model.find().exec();
  }

  async findOne(id: string) {
    return await this.model.findById(id).exec();
  }

  async update(id: string, updateQuoteDto: UpdateQuoteDto) {
    return await this.model.findByIdAndUpdate(id,updateQuoteDto).exec();
  }

  async remove(id: string) {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
