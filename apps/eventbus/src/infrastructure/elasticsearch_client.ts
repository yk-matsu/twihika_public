import { Client as ElasticClient } from '@elastic/elasticsearch';
import * as getenv from 'getenv';
const axios = require('axios') ;

export const createElasticClinet = (): ElasticClient => {
  return getenv('DEVELOPMENT_MODE') == 'production'
    ? new ElasticClient({
        cloud: { id: getenv('TWI_HIKA_ELASTIC_SEARCH_ID') },
        auth: { apiKey: getenv('TWI_HIKA_ELASTICSEARCH_API_KEY') },
      })
    : new ElasticClient({
        node: getenv('TWI_HIKA_ELASTICSEARCH_ORIGIN'),
        auth: { apiKey: getenv('TWI_HIKA_ELASTICSEARCH_API_KEY') },
      });
};

export const createAxiosElasticClinet = (): typeof axios => {
  return axios.create({
    baseURL: getenv('TWI_HIKA_ELASTICSEARCH_ORIGIN'),
    headers: {
      Authorization: `ApiKey ${getenv('TWI_HIKA_ELASTICSEARCH_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
};
