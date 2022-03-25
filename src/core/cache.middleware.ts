import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CacheService } from './cache.service';

@Injectable()
export class CacheMiddleware implements NestMiddleware {
  constructor(private readonly cacheService: CacheService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const key = req.originalUrl;
    const response = await this.cacheService.get(key);

    if (response) {
      res.status(200).send(response);
    } else {
      next();
    }
  }
}
