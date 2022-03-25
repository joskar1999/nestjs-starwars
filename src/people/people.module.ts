import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { HttpModule } from '@nestjs/axios';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule, HttpModule],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
