import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome Melinda and Maryna, you are the best!';
  }
}
