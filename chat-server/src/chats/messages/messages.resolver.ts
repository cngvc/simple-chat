import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { CurrentUser } from './../../auth/current-user.decorator';
import { GqlAuthGuard } from './../../auth/guards/gql-auth.guard';
import { TokenPayload } from './../../auth/token-payload.interface';
import { PUB_SUB } from './../../common/constants/injection-tokens';
import { CreateMessageInput } from './dto/create-message.input';
import { GetMessageArgs } from './dto/get-messages.args';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    @Inject(PUB_SUB) private readonly pubsub: PubSub,
  ) {}

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.messagesService.create(createMessageInput, user._id);
  }

  @Query(() => [Message], { name: 'messages' })
  @UseGuards(GqlAuthGuard)
  async getMessages(
    @Args() getMessageArgs: GetMessageArgs,
    @CurrentUser() user: TokenPayload,
  ) {
    const messages = await this.messagesService.getMessages(
      getMessageArgs,
      user._id,
    );
    return messages;
  }

  @Subscription(() => Message)
  messageCreated() {}
}
