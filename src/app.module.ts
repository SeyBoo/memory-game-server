import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameService } from './game/game.service';
import { GameModule } from './game/game.module';
import { GameGateway } from './game/game.gateway';

@Module({
  imports: [GameGateway],
  controllers: [AppController],
  providers: [AppService, GameService],
})
export class AppModule {}
