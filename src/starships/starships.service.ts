import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, toArray } from 'rxjs/operators';
import { SwapiService } from 'src/core/swapi.service';
import { StarshipsBodyDto } from './starships-body.dto';
import { Starship, StarshipResponse } from './starships.model';

const SWAPI_STARSHIPS_URL = 'https://swapi.dev/api/starships/';

@Injectable()
export class StarshipsService {
  constructor(private readonly swapiService: SwapiService) {}

  getAll({ params }: StarshipsBodyDto) {
    return this.swapiService
      .fetchCollectionRecursively<StarshipResponse, Starship>(
        SWAPI_STARSHIPS_URL,
      )
      .pipe(
        map((item: Starship) =>
          Object.fromEntries(
            Object.entries(item).filter(([key]) => params.includes(key)),
          ),
        ),
        toArray(),
      );
  }
}
