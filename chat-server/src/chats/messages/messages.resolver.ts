import { GqlAuthGuard } from './../../auth/guards/gql-auth.guard';
import { CurrentUser } from './../../auth/current-user.decorator';
import { TokenPayload } from './../../auth/token-payload.interface';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UseGuards } from '@nestjs/common';
import { GetMessageArgs } from './dto/get-messages.args';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

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
}
