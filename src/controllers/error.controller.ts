import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Error} from '../models';
import {ErrorRepository} from '../repositories';

export class ErrorController {
  constructor(
    @repository(ErrorRepository)
    public errorRepository : ErrorRepository,
  ) {}

  @post('/errors', {
    responses: {
      '200': {
        description: 'Error model instance',
        content: {'application/json': {schema: getModelSchemaRef(Error)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Error, {
            title: 'NewError',
            exclude: ['id'],
          }),
        },
      },
    })
    error: Omit<Error, 'id'>,
  ): Promise<Error> {
    return this.errorRepository.create(error);
  }

  @get('/errors/count', {
    responses: {
      '200': {
        description: 'Error model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Error) where?: Where<Error>,
  ): Promise<Count> {
    return this.errorRepository.count(where);
  }

  @get('/errors', {
    responses: {
      '200': {
        description: 'Array of Error model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Error, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Error) filter?: Filter<Error>,
  ): Promise<Error[]> {
    return this.errorRepository.find(filter);
  }

  @patch('/errors', {
    responses: {
      '200': {
        description: 'Error PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Error, {partial: true}),
        },
      },
    })
    error: Error,
    @param.where(Error) where?: Where<Error>,
  ): Promise<Count> {
    return this.errorRepository.updateAll(error, where);
  }

  @get('/errors/{id}', {
    responses: {
      '200': {
        description: 'Error model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Error, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Error, {exclude: 'where'}) filter?: FilterExcludingWhere<Error>
  ): Promise<Error> {
    return this.errorRepository.findById(id, filter);
  }

  @patch('/errors/{id}', {
    responses: {
      '204': {
        description: 'Error PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Error, {partial: true}),
        },
      },
    })
    error: Error,
  ): Promise<void> {
    await this.errorRepository.updateById(id, error);
  }

  @put('/errors/{id}', {
    responses: {
      '204': {
        description: 'Error PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() error: Error,
  ): Promise<void> {
    await this.errorRepository.replaceById(id, error);
  }

  @del('/errors/{id}', {
    responses: {
      '204': {
        description: 'Error DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.errorRepository.deleteById(id);
  }
}
