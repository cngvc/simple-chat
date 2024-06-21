import { Transform } from '@nestjs/class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isPrivate: boolean;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()
  userIds?: string[];

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;
}
