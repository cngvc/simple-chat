import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from './../auth/current-user.decorator';
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard';
import { TokenPayload } from './../auth/token-payload.interface';
import { ChatsService } from './chats.service';
import { CreateChatInput } from './dto/create-chat.input';
import { Chat } from './entities/chat.entity';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Chat)
  createChat(
    @Args('createChatInput') createChatInput: CreateChatInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.chatsService.create(createChatInput, user._id);
  }

  @Query(() => [Chat], { name: 'chats' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.chatsService.findAll();
  }

  @Query(() => Chat, { name: 'chat' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('_id') _id: string) {
    return this.chatsService.findOne(_id);
  }

  @Mutation(() => Chat)
  removeChat(@Args('_id') _id: string) {
    return this.chatsService.remove(_id);
  }
}
