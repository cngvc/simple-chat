import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { ChatsRepository } from './chats.repository';

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
