import { Injectable } from '@nestjs/common';

import { ChatsRepository } from './chats.repository';
import { CreateChatInput } from './dto/create-chat.input';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  create(createChatInput: CreateChatInput, userId: string) {
    return this.chatsRepository.create({
      ...createChatInput,
      userId,
      userIds: createChatInput.userIds || [],
      messages: [],
    });
  }

  findAll() {
    return this.chatsRepository.find({});
  }

  findOne(_id: string) {
    return this.chatsRepository.findOne({ _id });
  }

  remove(_id: string) {
    return this.chatsRepository.findOneAndDelete({ _id });
  }
}
