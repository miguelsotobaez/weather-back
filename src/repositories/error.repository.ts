import {DefaultCrudRepository} from '@loopback/repository';
import {Error, ErrorRelations} from '../models';
import {RedisDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ErrorRepository extends DefaultCrudRepository<
  Error,
  typeof Error.prototype.id,
  ErrorRelations
> {
  constructor(
    @inject('datasources.redisDS') dataSource: RedisDsDataSource,
  ) {
    super(Error, dataSource);
  }
}
