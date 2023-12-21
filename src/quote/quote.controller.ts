import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuoteService} from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quote')
@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  async create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quoteService.create(createQuoteDto);
  }

  @Get()
  async findAll() {
    return await this.quoteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.quoteService.findOne(id);
  }

  // update
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return await this.quoteService.update(id, updateQuoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.quoteService.remove(id);
  }
}
