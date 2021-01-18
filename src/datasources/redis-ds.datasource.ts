import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'redisDS',
  connector: 'redis',
  database: 0,
  host: '127.0.0.1',
  password: '',
  port: '6379',
  url: '',
  username: ''
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RedisDsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'redisDS';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.redisDS', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
