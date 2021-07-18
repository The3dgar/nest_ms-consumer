import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from './message.event';

@Controller()
export class AppController {
  constructor(@Inject('HELLO_SERVICE') private readonly client: ClientProxy) {}
  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Get()
  getHello() {
    const msg = 'hello ! at ' + new Date().toISOString();
    this.client.emit('message_printed', new Message(msg));
    
    return {
      ok: true,
      msg: 'ENVIANDO EL MSGS!!',
    };
  }
  @Get("/test")
  getSaludo() {
    const msg = 'hello ! at ahora' + new Date().toISOString();
    this.client.emit('message_printed', new Message(msg));
    
    return {
      ok: true,
      msg: 'ENVIANDO EL MSGS!!',
    };
  }
}
