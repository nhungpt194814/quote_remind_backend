import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuoteDocument = Quote & Document;

@Schema()
export class Quote{
    @Prop()
    userId: string;

    @Prop()
    content: string;

    // time to remind
    @Prop()
    frequency: string;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote)