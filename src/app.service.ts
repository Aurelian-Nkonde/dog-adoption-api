import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus():string{
    return `The app is up and running!!OK`
  }
}
