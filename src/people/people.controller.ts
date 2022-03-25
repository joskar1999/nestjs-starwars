import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CacheInterceptor } from 'src/core/cache.interceptor';
import { PeopleAttributesDto } from './people-attributes.dto';
import { Person } from './people.model';
import { PeopleService } from './people.service';

@Controller('people')
@UseInterceptors(CacheInterceptor)
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  getPeople(@Query() attributes: PeopleAttributesDto): Observable<Person[]> {
    return this.peopleService.getAll(attributes);
  }

  @Get('/:personId')
  getPerson(@Param('personId') id: string): Observable<Person> {
    return this.peopleService.getById(id);
  }
}
