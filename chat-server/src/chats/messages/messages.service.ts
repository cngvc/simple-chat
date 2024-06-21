import { ChatsRepository } from './../chats.repository';
import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { Types } from 'mongoose';
import { GetMessageArgs } from './dto/get-messages.args';

@Injectable()
export class MessagesService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  async create({ content, chatId }: CreateMessageInput, userId: string) {
    const message: Message = {
      content,
      userId,
      createdAt: new Date(),
      _id: new Types.ObjectId(),
    };
    await this.chatsRepository.findOneAndUpdate(
      {
        _id: chatId,
        ...this.userChatFilter(userId),
      },
      {
        $push: {
          messages: message,
        },
      },
    );
    return message;
  }

  async getMessages({ chatId }: GetMessageArgs, userId: string) {
    const chat = await await this.chatsRepository.findOne({
      _id: chatId,
      ...this.userChatFilter(userId),
    });
    return chat?.messages || [];
  }

  private userChatFilter(userId: string) {
    return {
      $or: [
        { userId },
        {
          userIds: {
            $in: [userId],
          },
        },
      ],
    };
  }
}