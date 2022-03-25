import { ResponseWithPagination } from 'src/model';

export const genders = ['male', 'female', 'hermaphrodite', 'none'] as const;

export type Gender = keyof typeof genders;

export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export type PeopleResponse = ResponseWithPagination & {
  results: Person[];
};
