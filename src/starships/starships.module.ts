import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';

import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';

@Module({
  imports: [CoreModule],
  controllers: [StarshipsController],
  providers: [StarshipsService],
})
export class StarshipsModule {}
