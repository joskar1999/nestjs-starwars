import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { filter, map, Observable, toArray } from 'rxjs';
import { SwapiService } from 'src/core/swapi.service';
import { PeopleAttributesDto } from './people-attributes.dto';
import { Gender, PeopleResponse, Person } from './people.model';

const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people/';

const withMinHeight = (height: number | undefined) => {
  return filter(
    (person: Person) => height === undefined || +person.height >= height,
  );
};

const withMinMass = (mass: number | undefined) => {
  return filter((person: Person) => mass === undefined || +person.mass >= mass);
};

const withGender = (gender: Gender | undefined) => {
  return filter(
    (person: Person) => gender === undefined || person.gender === gender,
  );
};

@Injectable()
export class PeopleService {
  constructor(
    private readonly swapiService: SwapiService,
    private httpService: HttpService,
  ) {}

  public getAll(attributes: PeopleAttributesDto): Observable<Person[]> {
    return this.swapiService
      .fetchCollectionRecursively<PeopleResponse, Person>(SWAPI_PEOPLE_URL)
      .pipe(
        withMinHeight(attributes.height),
        withMinMass(attributes.mass),
        withGender(attributes.gender),
        toArray(),
      );
  }

  public getById(id: string): Observable<Person> {
    return this.httpService
      .get<Person>(`${SWAPI_PEOPLE_URL}${id}`)
      .pipe(map(({ data }: AxiosResponse<Person>) => data));
  }
}
