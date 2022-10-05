import {
  TWEETS_INDEX,
  TWEET_GROUPING_INDEX,
  TWEET_USERS_INDEX,
} from './shared/constants';
import { createAxiosElasticClinet } from './infrastructure/elasticsearch_client';
import type { AxiosInstance } from 'axios';
import { sendErrorHandlerSNS } from './infrastructure/send_sns';
const registElasticSearchTweetsIndices = async (client: AxiosInstance) => {
  await client.put(`/${TWEETS_INDEX}`, {
    settings: {
      index: {
        mapping: {
          total_fields: {
            limit: '2000',
          },
        },
      },
    },
    mappings: {
      properties: {
        created_at: {
          type: 'date',
          format: 'EEE MMM dd HH:mm:ss Z yyyy',
        },
        query_category_id: {
          type: 'keyword',
        },
        query_id: {
          type: 'keyword',
        },
        user_id_str: {
          type: 'keyword',
        },
      },
    },
  });
};

const registElasticSearchTweetUsersIndices = async (client: AxiosInstance) => {
  await client.put(`/${TWEET_USERS_INDEX}`, {
    settings: {
      index: {
        mapping: {
          total_fields: {
            limit: '2000',
          },
        },
      },
    },
    mappings: {
      properties: {
        created_at: {
          type: 'date',
          format: 'EEE MMM dd HH:mm:ss Z yyyy',
        },
        query_id: {
          type: 'keyword',
        },
        query_category_id: {
          type: 'keyword',
        },
        id_str: {
          type: 'keyword',
        },
      },
    },
  });
};

const registElasticSearchTweetGroupsIndices = async (client: AxiosInstance) => {
  await client.put(`/${TWEET_GROUPING_INDEX}`, {
    settings: {
      index: {
        mapping: {
          total_fields: {
            limit: '2000',
          },
        },
      },
      analysis: {
        char_filter: {
          normalize: {
            type: 'icu_normalizer',
            name: 'nfkc',
            mode: 'compose',
          },
        },
        tokenizer: {
          ja_kuromoji_tokenizer: {
            mode: 'search',
            type: 'kuromoji_tokenizer',
            discard_compound_token: true,
            user_dictionary_rules: [
              '東京スカイツリー,東京 スカイツリー,トウキョウ スカイツリー,カスタム名詞',
            ],
          },
          ja_ngram_tokenizer: {
            type: 'ngram',
            min_gram: 2,
            max_gram: 2,
            token_chars: ['letter', 'digit'],
          },
        },
        filter: {
          ja_index_synonym: {
            type: 'synonym',
            lenient: false,
            synonyms: [],
          },
          ja_search_synonym: {
            type: 'synonym_graph',
            lenient: false,
            synonyms: ['米国, アメリカ', '東京大学, 東大'],
          },
        },
        analyzer: {
          ja_kuromoji_index_analyzer: {
            type: 'custom',
            char_filter: ['normalize'],
            tokenizer: 'ja_kuromoji_tokenizer',
            filter: [
              'kuromoji_baseform',
              'kuromoji_part_of_speech',
              'ja_index_synonym',
              'cjk_width',
              'ja_stop',
              'kuromoji_stemmer',
              'lowercase',
            ],
          },
          ja_kuromoji_search_analyzer: {
            type: 'custom',
            char_filter: ['normalize'],
            tokenizer: 'ja_kuromoji_tokenizer',
            filter: [
              'kuromoji_baseform',
              'kuromoji_part_of_speech',
              'ja_search_synonym',
              'cjk_width',
              'ja_stop',
              'kuromoji_stemmer',
              'lowercase',
            ],
          },
          ja_ngram_index_analyzer: {
            type: 'custom',
            char_filter: ['normalize'],
            tokenizer: 'ja_ngram_tokenizer',
            filter: ['lowercase'],
          },
          ja_ngram_search_analyzer: {
            type: 'custom',
            char_filter: ['normalize'],
            tokenizer: 'ja_ngram_tokenizer',
            filter: ['ja_search_synonym', 'lowercase'],
          },
        },
      },
    },
    mappings: {
      properties: {
        created_at: {
          type: 'date',
          format: 'EEE MMM dd HH:mm:ss Z yyyy',
        },
        user_id_str: {
          type: 'keyword',
        },
        id_str: {
          type: 'keyword',
        },
        query_id: {
          type: 'keyword',
        },
        query_category_id: {
          type: 'keyword',
        },
        tweet_ids: {
          type: 'keyword',
        },
        latest_tweet_created_at: {
          type: 'date',
          format: 'EEE MMM dd HH:mm:ss Z yyyy',
        },
        full_text: {
          type: 'text',
          search_analyzer: 'ja_kuromoji_search_analyzer',
          analyzer: 'ja_kuromoji_index_analyzer',
          fields: {
            ngram: {
              type: 'text',
              search_analyzer: 'ja_ngram_search_analyzer',
              analyzer: 'ja_ngram_index_analyzer',
            },
          },
        },
      },
    },
  });
  await client.put(`/${TWEET_USERS_INDEX}/_settings`, {
    index: {
      max_result_window: 500000,
    },
  });
};

export const initializeElasticSearch = async () => {
  const axiosElasticClient = createAxiosElasticClinet();
  await registElasticSearchTweetGroupsIndices(axiosElasticClient).catch(
    async (err) => {
      // await sendErrorHandlerSNS(
      //   "CreateWebReadModelElastic",
      //   err,
      //   "no action required"
      // );
    },
  );
  await registElasticSearchTweetsIndices(axiosElasticClient).catch(
    async (err) => {
      console.log(err);
      await sendErrorHandlerSNS(
        'SaveTweetFromS3ToElastic',
        err,
        'no action needed',
      );
    },
  );

  await registElasticSearchTweetUsersIndices(axiosElasticClient).catch(
    async (err) => {
      console.log(err);
      await sendErrorHandlerSNS(
        'SaveTweetFromS3ToElastic',
        err,
        'no action needed',
      );
    },
  );
};
