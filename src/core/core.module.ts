import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { CacheInterceptor } from './cache.interceptor';
import { CacheMiddleware } from './cache.middleware';
import { CacheService } from './cache.service';
import { SwapiService } from './swapi.service';

@Module({
  imports: [HttpModule, CacheModule.register({ ttl: 10 })],
  providers: [SwapiService, CacheService, CacheMiddleware, CacheInterceptor],
  exports: [SwapiService, CacheService],
})
export class CoreModule {}
