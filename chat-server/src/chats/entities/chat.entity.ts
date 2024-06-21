import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from './../../common/database/abstract.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { Message } from '../messages/entities/message.entity';

@Schema({ versionKey: false })
@ObjectType()
export class Chat extends AbstractEntity {
  @Field()
  @Prop()
  userId: string;

  @Field()
  @Prop()
  isPrivate: boolean;

  @Field(() => [String])
  @Prop()
  userIds: string[];

  @Field({ nullable: true })
  @Prop()
  name?: string;

  @Prop()
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
