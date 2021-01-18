import {Entity, model, property} from '@loopback/repository';

@model()
export class Error extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  message?: string;

  @property({
    type: 'date',
  })
  date?: string;


  constructor(data?: Partial<Error>) {
    super(data);
  }
}

export interface ErrorRelations {
  // describe navigational properties here
}

export type ErrorWithRelations = Error & ErrorRelations;
