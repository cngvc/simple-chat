import { IsNotEmpty } from '@nestjs/class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetMessageArgs {
  @Field()
  @IsNotEmpty()
  chatId: string;
}
