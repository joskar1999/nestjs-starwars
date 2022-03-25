import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional } from 'class-validator';
import { Gender, genders } from './people.model';

export class PeopleAttributesDto {
  @IsOptional() @IsIn(genders) gender?: Gender;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  height?: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  mass?: number;
}
