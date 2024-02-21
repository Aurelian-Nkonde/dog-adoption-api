import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DogModule } from './dog/dog.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { AdoptionModule } from './adoption/adoption.module';


@Module({
  imports: [ConfigModule.forRoot(), DogModule, UserModule, NotificationModule, AdoptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
