import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { EMPTY, expand, map, mergeMap, Observable, of, reduce } from 'rxjs';
import { ResponseWithPagination } from 'src/model';

@Injectable()
export class SwapiService {
  constructor(private readonly httpService: HttpService) {}

  fetchCollectionRecursively<
    ResponseType extends ResponseWithPagination & { results: ResourceType[] },
    ResourceType,
  >(url: string): Observable<ResourceType> {
    return this.httpService.get<ResponseType>(url).pipe(
      expand(({ data }: AxiosResponse<ResponseType>) =>
        data.next ? this.httpService.get<ResponseType>(data.next) : EMPTY,
      ),
      map(({ data }: AxiosResponse<ResponseType>) => data),
      reduce(
        (acc: ResourceType[], { results }: ResponseType) => [
          ...acc,
          ...results,
        ],
        [],
      ),
      mergeMap((items) => of(...items)),
    );
  }
}
