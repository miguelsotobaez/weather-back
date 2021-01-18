import {DefaultCrudRepository} from '@loopback/repository';
import {Weather, WeatherRelations} from '../models';
import {RedisDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class WeatherRepository extends DefaultCrudRepository<
  Weather,
  typeof Weather.prototype.id,
  WeatherRelations
> {
  constructor(
    @inject('datasources.redisDS') dataSource: RedisDsDataSource,
  ) {
    super(Weather, dataSource);
  }
}
