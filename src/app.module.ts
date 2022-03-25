import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StarshipsModule } from './starships/starships.module';
import { PeopleModule } from './people/people.module';
import { CoreModule } from './core/core.module';
import { CacheMiddleware } from './core/cache.middleware';
import { SebastianModule } from './sebastian/sebastian.module';

@Module({
  imports: [StarshipsModule, PeopleModule, CoreModule, SebastianModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CacheMiddleware).forRoutes('people/*');
  }
}
