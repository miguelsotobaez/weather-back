import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {Weather} from '../models';
import {WeatherRepository} from '../repositories';

export class WeatherController {
  constructor(
    @repository(WeatherRepository)
    public weatherRepository: WeatherRepository,
  ) { }

  @post('/weathers', {
    responses: {
      '200': {
        description: 'Weather model instance',
        content: {'application/json': {schema: getModelSchemaRef(Weather)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weather, {
            title: 'NewWeather',
            exclude: ['id'],
          }),
        },
      },
    })
    weather: Omit<Weather, 'id'>,
  ): Promise<Weather> {
    return this.weatherRepository.create(weather);
  }

  @get('/weathers/count', {
    responses: {
      '200': {
        description: 'Weather model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Weather) where?: Where<Weather>,
  ): Promise<Count> {
    return this.weatherRepository.count(where);
  }

  @get('/weathers', {
    responses: {
      '200': {
        description: 'Array of Weather model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Weather, {includeRelations: true}),
            },
          },
        },
      },
    },
  })

  async find(
    @param.filter(Weather) filter?: Filter<Weather>,
  ): Promise<Weather[]> {
    let d = Math.random();
    if (d < 0.1) {
      throw new Error('How unfortunate! The API Request Failed')
    } else {
      return this.weatherRepository.find(filter);
    }
  }


  @patch('/weathers', {
    responses: {
      '200': {
        description: 'Weather PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weather, {partial: true}),
        },
      },
    })
    weather: Weather,
    @param.where(Weather) where?: Where<Weather>,
  ): Promise<Count> {
    return this.weatherRepository.updateAll(weather, where);
  }

  @get('/weathers/{id}', {
    responses: {
      '200': {
        description: 'Weather model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Weather, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Weather, {exclude: 'where'}) filter?: FilterExcludingWhere<Weather>
  ): Promise<Weather> {
    let d = Math.random();
    if (d < 0.1) {
      throw new Error('How unfortunate! The API Request Failed')
    } else {
      return this.weatherRepository.findById(id, filter);
    }

  }

  @patch('/weathers/{id}', {
    responses: {
      '204': {
        description: 'Weather PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weather, {partial: true}),
        },
      },
    })
    weather: Weather,
  ): Promise<void> {
    await this.weatherRepository.updateById(id, weather);
  }

  @put('/weathers/{id}', {
    responses: {
      '204': {
        description: 'Weather PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() weather: Weather,
  ): Promise<void> {
    await this.weatherRepository.replaceById(id, weather);
  }

  @del('/weathers/{id}', {
    responses: {
      '204': {
        description: 'Weather DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.weatherRepository.deleteById(id);
  }
}
