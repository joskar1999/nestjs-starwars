import { IsDefined } from 'class-validator';
import { Starship } from './starships.model';

export class StarshipsBodyDto {
  @IsDefined() params: keyof Starship;
}
