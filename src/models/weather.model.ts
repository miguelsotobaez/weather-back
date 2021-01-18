import {Entity, model, property} from '@loopback/repository';

@model()
export class Weather extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'number',
  })
  lat?: number;

  @property({
    type: 'number',
  })
  lon?: number;


  constructor(data?: Partial<Weather>) {
    super(data);
  }
}

export interface WeatherRelations {
  // describe navigational properties here
}

export type WeatherWithRelations = Weather & WeatherRelations;
