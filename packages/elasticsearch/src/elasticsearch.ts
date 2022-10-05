import {Client} from '@elastic/elasticsearch';
import getenv from 'getenv';

export const createElasticClinet = (): Client => {
  return getenv('DEVELOPMENT_MODE') == 'production'
    ? new Client({
        cloud: {id: getenv('TWI_HIKA_ELASTIC_SEARCH_ID')},
        auth: {apiKey: getenv('TWI_HIKA_ELASTICSEARCH_API_KEY')},
      })
    : new Client({
        node: getenv('TWI_HIKA_ELASTICSEARCH_ORIGIN'),
        auth: {apiKey: getenv('TWI_HIKA_ELASTICSEARCH_API_KEY')},
      });
};

export * from "@elastic/elasticsearch/lib/api/types"