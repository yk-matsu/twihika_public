import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  json: any;
  jsonb: any;
  numeric: any;
  timestamp: any;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "batch_search_queries_processing_state" */
export type Batch_Search_Queries_Processing_State = {
  __typename?: 'batch_search_queries_processing_state';
  query_id: Scalars['Int'];
};

/** aggregated selection of "batch_search_queries_processing_state" */
export type Batch_Search_Queries_Processing_State_Aggregate = {
  __typename?: 'batch_search_queries_processing_state_aggregate';
  aggregate?: Maybe<Batch_Search_Queries_Processing_State_Aggregate_Fields>;
  nodes: Array<Batch_Search_Queries_Processing_State>;
};

/** aggregate fields of "batch_search_queries_processing_state" */
export type Batch_Search_Queries_Processing_State_Aggregate_Fields = {
  __typename?: 'batch_search_queries_processing_state_aggregate_fields';
  avg?: Maybe<Batch_Search_Queries_Processing_State_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Batch_Search_Queries_Processing_State_Max_Fields>;
  min?: Maybe<Batch_Search_Queries_Processing_State_Min_Fields>;
  stddev?: Maybe<Batch_Search_Queries_Processing_State_Stddev_Fields>;
  stddev_pop?: Maybe<Batch_Search_Queries_Processing_State_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Batch_Search_Queries_Processing_State_Stddev_Samp_Fields>;
  sum?: Maybe<Batch_Search_Queries_Processing_State_Sum_Fields>;
  var_pop?: Maybe<Batch_Search_Queries_Processing_State_Var_Pop_Fields>;
  var_samp?: Maybe<Batch_Search_Queries_Processing_State_Var_Samp_Fields>;
  variance?: Maybe<Batch_Search_Queries_Processing_State_Variance_Fields>;
};


/** aggregate fields of "batch_search_queries_processing_state" */
export type Batch_Search_Queries_Processing_State_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Batch_Search_Queries_Processing_State_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Batch_Search_Queries_Processing_State_Avg_Fields = {
  __typename?: 'batch_search_queries_processing_state_avg_fields';
  query_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "batch_search_queries_processing_state". All fields are combined with a logical 'AND'. */
export type Batch_Search_Queries_Processing_State_Bool_Exp = {
  _and?: InputMaybe<Array<Batch_Search_Queries_Processing_State_Bool_Exp>>;
  _not?: InputMaybe<Batch_Search_Queries_Processing_State_Bool_Exp>;
  _or?: InputMaybe<Array<Batch_Search_Queries_Processing_State_Bool_Exp>>;
  query_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "batch_search_queries_processing_state" */
export enum Batch_Search_Queries_Processing_State_Constraint {
  /** unique or primary key constraint on columns "query_id" */
  BatchSearchQueriesProcessingStatePkey = 'batch_search_queries_processing_state_pkey'
}

/** input type for incrementing numeric columns in table "batch_search_queries_processing_state" */
export type Batch_Search_Queries_Processing_State_Inc_Input = {
  query_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "batch_search_queries_processing_state" */
export type Batch_Search_Queries_Processing_State_Insert_Input = {
  query_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Batch_Search_Queries_Processing_State_Max_Fields = {
  __typename?: 'batch_search_queries_processing_state_max_fields';
  query_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Batch_Search_Queries_Processing_State_Min_Fields = {
  __typename?: 'batch_search_queries_processing_state_min_fields';
  query_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "batch_search_queries_processing_state" */
export type Batch_Search_Queries_Processing_State_Mutation_Response = {
  __typename?: 'batch_search_queries_processing_state_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Batch_Search_Queries_Processing_State>;
};

/** on_conflict condition type for table "batch_search_queries_processing_state" */
export type Batch_Search_Queries_Processing_State_On_Conflict = {
  constraint: Batch_Search_Queries_Processing_State_Constraint;
  update_columns?: Array<Batch_Search_Queries_Processing_State_Update_Column>;
  where?: InputMaybe<Batch_Search_Queries_Processing_State_Bool_Exp>;
};

/** Ordering options when selecting data from "batch_search_queries_processing_state". */
export type Batch_Search_Queries_Processing_State_Order_By = {
  query_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: batch_search_queries_processing_state */
export type Batch_Search_Queries_Processing_State_Pk_Columns_Input = {
  query_id: Scalars['Int'];
};

/** select columns of table "batch_search_queries_processing_state" */
export enum Batch_Search_Queries_Processing_State_Select_Column {
  /** column name */
  QueryId = 'query_id'
}

/** input type for updating data in table "batch_search_queries_processing_state" */
export type Batch_Search_Queries_Processing_State_Set_Input = {
  query_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Batch_Search_Queries_Processing_State_Stddev_Fields = {
  __typename?: 'batch_search_queries_processing_state_stddev_fields';
  query_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Batch_Search_Queries_Processing_State_Stddev_Pop_Fields = {
  __typename?: 'batch_search_queries_processing_state_stddev_pop_fields';
  query_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Batch_Search_Queries_Processing_State_Stddev_Samp_Fields = {
  __typename?: 'batch_search_queries_processing_state_stddev_samp_fields';
  query_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Batch_Search_Queries_Processing_State_Sum_Fields = {
  __typename?: 'batch_search_queries_processing_state_sum_fields';
  query_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "batch_search_queries_processing_state" */
export enum Batch_Search_Queries_Processing_State_Update_Column {
  /** column name */
  QueryId = 'query_id'
}

export type Batch_Search_Queries_Processing_State_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Batch_Search_Queries_Processing_State_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Batch_Search_Queries_Processing_State_Set_Input>;
  where: Batch_Search_Queries_Processing_State_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Batch_Search_Queries_Processing_State_Var_Pop_Fields = {
  __typename?: 'batch_search_queries_processing_state_var_pop_fields';
  query_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Batch_Search_Queries_Processing_State_Var_Samp_Fields = {
  __typename?: 'batch_search_queries_processing_state_var_samp_fields';
  query_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Batch_Search_Queries_Processing_State_Variance_Fields = {
  __typename?: 'batch_search_queries_processing_state_variance_fields';
  query_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']>;
  _gt?: InputMaybe<Scalars['json']>;
  _gte?: InputMaybe<Scalars['json']>;
  _in?: InputMaybe<Array<Scalars['json']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['json']>;
  _lte?: InputMaybe<Scalars['json']>;
  _neq?: InputMaybe<Scalars['json']>;
  _nin?: InputMaybe<Array<Scalars['json']>>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** columns and relationships of "master_batch_search_queries" */
export type Master_Batch_Search_Queries = {
  __typename?: 'master_batch_search_queries';
  created_at: Scalars['timestamptz'];
  is_not_sync_elastic: Scalars['Boolean'];
  is_published_all: Scalars['Boolean'];
  priority?: Maybe<Scalars['Int']>;
  query: Scalars['String'];
  query_category_id?: Maybe<Scalars['Int']>;
  query_id: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Aggregate = {
  __typename?: 'master_batch_search_queries_aggregate';
  aggregate?: Maybe<Master_Batch_Search_Queries_Aggregate_Fields>;
  nodes: Array<Master_Batch_Search_Queries>;
};

/** aggregate fields of "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Aggregate_Fields = {
  __typename?: 'master_batch_search_queries_aggregate_fields';
  avg?: Maybe<Master_Batch_Search_Queries_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Master_Batch_Search_Queries_Max_Fields>;
  min?: Maybe<Master_Batch_Search_Queries_Min_Fields>;
  stddev?: Maybe<Master_Batch_Search_Queries_Stddev_Fields>;
  stddev_pop?: Maybe<Master_Batch_Search_Queries_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Master_Batch_Search_Queries_Stddev_Samp_Fields>;
  sum?: Maybe<Master_Batch_Search_Queries_Sum_Fields>;
  var_pop?: Maybe<Master_Batch_Search_Queries_Var_Pop_Fields>;
  var_samp?: Maybe<Master_Batch_Search_Queries_Var_Samp_Fields>;
  variance?: Maybe<Master_Batch_Search_Queries_Variance_Fields>;
};


/** aggregate fields of "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Master_Batch_Search_Queries_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Aggregate_Order_By = {
  avg?: InputMaybe<Master_Batch_Search_Queries_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Master_Batch_Search_Queries_Max_Order_By>;
  min?: InputMaybe<Master_Batch_Search_Queries_Min_Order_By>;
  stddev?: InputMaybe<Master_Batch_Search_Queries_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Master_Batch_Search_Queries_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Master_Batch_Search_Queries_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Master_Batch_Search_Queries_Sum_Order_By>;
  var_pop?: InputMaybe<Master_Batch_Search_Queries_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Master_Batch_Search_Queries_Var_Samp_Order_By>;
  variance?: InputMaybe<Master_Batch_Search_Queries_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Arr_Rel_Insert_Input = {
  data: Array<Master_Batch_Search_Queries_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Master_Batch_Search_Queries_On_Conflict>;
};

/** aggregate avg on columns */
export type Master_Batch_Search_Queries_Avg_Fields = {
  __typename?: 'master_batch_search_queries_avg_fields';
  priority?: Maybe<Scalars['Float']>;
  query_category_id?: Maybe<Scalars['Float']>;
  query_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Avg_Order_By = {
  priority?: InputMaybe<Order_By>;
  query_category_id?: InputMaybe<Order_By>;
  query_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "master_batch_search_queries". All fields are combined with a logical 'AND'. */
export type Master_Batch_Search_Queries_Bool_Exp = {
  _and?: InputMaybe<Array<Master_Batch_Search_Queries_Bool_Exp>>;
  _not?: InputMaybe<Master_Batch_Search_Queries_Bool_Exp>;
  _or?: InputMaybe<Array<Master_Batch_Search_Queries_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  is_not_sync_elastic?: InputMaybe<Boolean_Comparison_Exp>;
  is_published_all?: InputMaybe<Boolean_Comparison_Exp>;
  priority?: InputMaybe<Int_Comparison_Exp>;
  query?: InputMaybe<String_Comparison_Exp>;
  query_category_id?: InputMaybe<Int_Comparison_Exp>;
  query_id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "master_batch_search_queries" */
export enum Master_Batch_Search_Queries_Constraint {
  /** unique or primary key constraint on columns "query_id" */
  BatchSearchQueriesPkey = 'batch_search_queries_pkey',
  /** unique or primary key constraint on columns "query" */
  BatchSearchQueriesQueryKey = 'batch_search_queries_query_key'
}

/** input type for incrementing numeric columns in table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Inc_Input = {
  priority?: InputMaybe<Scalars['Int']>;
  query_category_id?: InputMaybe<Scalars['Int']>;
  query_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  is_not_sync_elastic?: InputMaybe<Scalars['Boolean']>;
  is_published_all?: InputMaybe<Scalars['Boolean']>;
  priority?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  query_category_id?: InputMaybe<Scalars['Int']>;
  query_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Master_Batch_Search_Queries_Max_Fields = {
  __typename?: 'master_batch_search_queries_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  priority?: Maybe<Scalars['Int']>;
  query?: Maybe<Scalars['String']>;
  query_category_id?: Maybe<Scalars['Int']>;
  query_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  query_category_id?: InputMaybe<Order_By>;
  query_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Master_Batch_Search_Queries_Min_Fields = {
  __typename?: 'master_batch_search_queries_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  priority?: Maybe<Scalars['Int']>;
  query?: Maybe<Scalars['String']>;
  query_category_id?: Maybe<Scalars['Int']>;
  query_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  query_category_id?: InputMaybe<Order_By>;
  query_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Mutation_Response = {
  __typename?: 'master_batch_search_queries_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Master_Batch_Search_Queries>;
};

/** on_conflict condition type for table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_On_Conflict = {
  constraint: Master_Batch_Search_Queries_Constraint;
  update_columns?: Array<Master_Batch_Search_Queries_Update_Column>;
  where?: InputMaybe<Master_Batch_Search_Queries_Bool_Exp>;
};

/** Ordering options when selecting data from "master_batch_search_queries". */
export type Master_Batch_Search_Queries_Order_By = {
  created_at?: InputMaybe<Order_By>;
  is_not_sync_elastic?: InputMaybe<Order_By>;
  is_published_all?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
  query?: InputMaybe<Order_By>;
  query_category_id?: InputMaybe<Order_By>;
  query_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: master_batch_search_queries */
export type Master_Batch_Search_Queries_Pk_Columns_Input = {
  query_id: Scalars['Int'];
};

/** select columns of table "master_batch_search_queries" */
export enum Master_Batch_Search_Queries_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  IsNotSyncElastic = 'is_not_sync_elastic',
  /** column name */
  IsPublishedAll = 'is_published_all',
  /** column name */
  Priority = 'priority',
  /** column name */
  Query = 'query',
  /** column name */
  QueryCategoryId = 'query_category_id',
  /** column name */
  QueryId = 'query_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  is_not_sync_elastic?: InputMaybe<Scalars['Boolean']>;
  is_published_all?: InputMaybe<Scalars['Boolean']>;
  priority?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  query_category_id?: InputMaybe<Scalars['Int']>;
  query_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Master_Batch_Search_Queries_Stddev_Fields = {
  __typename?: 'master_batch_search_queries_stddev_fields';
  priority?: Maybe<Scalars['Float']>;
  query_category_id?: Maybe<Scalars['Float']>;
  query_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Stddev_Order_By = {
  priority?: InputMaybe<Order_By>;
  query_category_id?: InputMaybe<Order_By>;
  query_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Master_Batch_Search_Queries_Stddev_Pop_Fields = {
  __typename?: 'master_batch_search_queries_stddev_pop_fields';
  priority?: Maybe<Scalars['Float']>;
  query_category_id?: Maybe<Scalars['Float']>;
  query_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Stddev_Pop_Order_By = {
  priority?: InputMaybe<Order_By>;
  query_category_id?: InputMaybe<Order_By>;
  query_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Master_Batch_Search_Queries_Stddev_Samp_Fields = {
  __typename?: 'master_batch_search_queries_stddev_samp_fields';
  priority?: Maybe<Scalars['Float']>;
  query_category_id?: Maybe<Scalars['Float']>;
  query_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Stddev_Samp_Order_By = {
  priority?: InputMaybe<Order_By>;
  query_category_id?: InputMaybe<Order_By>;
  query_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Master_Batch_Search_Queries_Sum_Fields = {
  __typename?: 'master_batch_search_queries_sum_fields';
  priority?: Maybe<Scalars['Int']>;
  query_category_id?: Maybe<Scalars['Int']>;
  query_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Sum_Order_By = {
  priority?: InputMaybe<Order_By>;
  query_category_id?: InputMaybe<Order_By>;
  query_id?: InputMaybe<Order_By>;
};

/** update columns of table "master_batch_search_queries" */
export enum Master_Batch_Search_Queries_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  IsNotSyncElastic = 'is_not_sync_elastic',
  /** column name */
  IsPublishedAll = 'is_published_all',
  /** column name */
  Priority = 'priority',
  /** column name */
  Query = 'query',
  /** column name */
  QueryCategoryId = 'query_category_id',
  /** column name */
  QueryId = 'query_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Master_Batch_Search_Queries_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Master_Batch_Search_Queries_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Master_Batch_Search_Queries_Set_Input>;
  where: Master_Batch_Search_Queries_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Master_Batch_Search_Queries_Var_Pop_Fields = {
  __typename?: 'master_batch_search_queries_var_pop_fields';
  priority?: Maybe<Scalars['Float']>;
  query_category_id?: Maybe<Scalars['Float']>;
  query_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Var_Pop_Order_By = {
  priority?: InputMaybe<Order_By>;
  query_category_id?: InputMaybe<Order_By>;
  query_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Master_Batch_Search_Queries_Var_Samp_Fields = {
  __typename?: 'master_batch_search_queries_var_samp_fields';
  priority?: Maybe<Scalars['Float']>;
  query_category_id?: Maybe<Scalars['Float']>;
  query_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Var_Samp_Order_By = {
  priority?: InputMaybe<Order_By>;
  query_category_id?: InputMaybe<Order_By>;
  query_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Master_Batch_Search_Queries_Variance_Fields = {
  __typename?: 'master_batch_search_queries_variance_fields';
  priority?: Maybe<Scalars['Float']>;
  query_category_id?: Maybe<Scalars['Float']>;
  query_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "master_batch_search_queries" */
export type Master_Batch_Search_Queries_Variance_Order_By = {
  priority?: InputMaybe<Order_By>;
  query_category_id?: InputMaybe<Order_By>;
  query_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "master_batch_search_query_categories" */
export type Master_Batch_Search_Query_Categories = {
  __typename?: 'master_batch_search_query_categories';
  active: Scalars['Boolean'];
  created_at: Scalars['timestamptz'];
  /** fetch data from the table: "master_batch_search_queries" */
  master_batch_search_queries: Array<Master_Batch_Search_Queries>;
  /** fetch aggregated fields from the table: "master_batch_search_queries" */
  master_batch_search_queries_aggregate: Master_Batch_Search_Queries_Aggregate;
  name: Scalars['String'];
  query_category_id: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "master_batch_search_query_categories" */
export type Master_Batch_Search_Query_CategoriesMaster_Batch_Search_QueriesArgs = {
  distinct_on?: InputMaybe<Array<Master_Batch_Search_Queries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Master_Batch_Search_Queries_Order_By>>;
  where?: InputMaybe<Master_Batch_Search_Queries_Bool_Exp>;
};


/** columns and relationships of "master_batch_search_query_categories" */
export type Master_Batch_Search_Query_CategoriesMaster_Batch_Search_Queries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Master_Batch_Search_Queries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Master_Batch_Search_Queries_Order_By>>;
  where?: InputMaybe<Master_Batch_Search_Queries_Bool_Exp>;
};

/** aggregated selection of "master_batch_search_query_categories" */
export type Master_Batch_Search_Query_Categories_Aggregate = {
  __typename?: 'master_batch_search_query_categories_aggregate';
  aggregate?: Maybe<Master_Batch_Search_Query_Categories_Aggregate_Fields>;
  nodes: Array<Master_Batch_Search_Query_Categories>;
};

/** aggregate fields of "master_batch_search_query_categories" */
export type Master_Batch_Search_Query_Categories_Aggregate_Fields = {
  __typename?: 'master_batch_search_query_categories_aggregate_fields';
  avg?: Maybe<Master_Batch_Search_Query_Categories_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Master_Batch_Search_Query_Categories_Max_Fields>;
  min?: Maybe<Master_Batch_Search_Query_Categories_Min_Fields>;
  stddev?: Maybe<Master_Batch_Search_Query_Categories_Stddev_Fields>;
  stddev_pop?: Maybe<Master_Batch_Search_Query_Categories_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Master_Batch_Search_Query_Categories_Stddev_Samp_Fields>;
  sum?: Maybe<Master_Batch_Search_Query_Categories_Sum_Fields>;
  var_pop?: Maybe<Master_Batch_Search_Query_Categories_Var_Pop_Fields>;
  var_samp?: Maybe<Master_Batch_Search_Query_Categories_Var_Samp_Fields>;
  variance?: Maybe<Master_Batch_Search_Query_Categories_Variance_Fields>;
};


/** aggregate fields of "master_batch_search_query_categories" */
export type Master_Batch_Search_Query_Categories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Master_Batch_Search_Query_Categories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Master_Batch_Search_Query_Categories_Avg_Fields = {
  __typename?: 'master_batch_search_query_categories_avg_fields';
  query_category_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "master_batch_search_query_categories". All fields are combined with a logical 'AND'. */
export type Master_Batch_Search_Query_Categories_Bool_Exp = {
  _and?: InputMaybe<Array<Master_Batch_Search_Query_Categories_Bool_Exp>>;
  _not?: InputMaybe<Master_Batch_Search_Query_Categories_Bool_Exp>;
  _or?: InputMaybe<Array<Master_Batch_Search_Query_Categories_Bool_Exp>>;
  active?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  master_batch_search_queries?: InputMaybe<Master_Batch_Search_Queries_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  query_category_id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "master_batch_search_query_categories" */
export enum Master_Batch_Search_Query_Categories_Constraint {
  /** unique or primary key constraint on columns "query_category_id" */
  MasterBatchSearchQueryCategoriesPkey = 'master_batch_search_query_categories_pkey'
}

/** input type for incrementing numeric columns in table "master_batch_search_query_categories" */
export type Master_Batch_Search_Query_Categories_Inc_Input = {
  query_category_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "master_batch_search_query_categories" */
export type Master_Batch_Search_Query_Categories_Insert_Input = {
  active?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  master_batch_search_queries?: InputMaybe<Master_Batch_Search_Queries_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  query_category_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Master_Batch_Search_Query_Categories_Max_Fields = {
  __typename?: 'master_batch_search_query_categories_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  query_category_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Master_Batch_Search_Query_Categories_Min_Fields = {
  __typename?: 'master_batch_search_query_categories_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  query_category_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "master_batch_search_query_categories" */
export type Master_Batch_Search_Query_Categories_Mutation_Response = {
  __typename?: 'master_batch_search_query_categories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Master_Batch_Search_Query_Categories>;
};

/** on_conflict condition type for table "master_batch_search_query_categories" */
export type Master_Batch_Search_Query_Categories_On_Conflict = {
  constraint: Master_Batch_Search_Query_Categories_Constraint;
  update_columns?: Array<Master_Batch_Search_Query_Categories_Update_Column>;
  where?: InputMaybe<Master_Batch_Search_Query_Categories_Bool_Exp>;
};

/** Ordering options when selecting data from "master_batch_search_query_categories". */
export type Master_Batch_Search_Query_Categories_Order_By = {
  active?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  master_batch_search_queries_aggregate?: InputMaybe<Master_Batch_Search_Queries_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  query_category_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: master_batch_search_query_categories */
export type Master_Batch_Search_Query_Categories_Pk_Columns_Input = {
  query_category_id: Scalars['Int'];
};

/** select columns of table "master_batch_search_query_categories" */
export enum Master_Batch_Search_Query_Categories_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Name = 'name',
  /** column name */
  QueryCategoryId = 'query_category_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "master_batch_search_query_categories" */
export type Master_Batch_Search_Query_Categories_Set_Input = {
  active?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  name?: InputMaybe<Scalars['String']>;
  query_category_id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Master_Batch_Search_Query_Categories_Stddev_Fields = {
  __typename?: 'master_batch_search_query_categories_stddev_fields';
  query_category_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Master_Batch_Search_Query_Categories_Stddev_Pop_Fields = {
  __typename?: 'master_batch_search_query_categories_stddev_pop_fields';
  query_category_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Master_Batch_Search_Query_Categories_Stddev_Samp_Fields = {
  __typename?: 'master_batch_search_query_categories_stddev_samp_fields';
  query_category_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Master_Batch_Search_Query_Categories_Sum_Fields = {
  __typename?: 'master_batch_search_query_categories_sum_fields';
  query_category_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "master_batch_search_query_categories" */
export enum Master_Batch_Search_Query_Categories_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Name = 'name',
  /** column name */
  QueryCategoryId = 'query_category_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Master_Batch_Search_Query_Categories_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Master_Batch_Search_Query_Categories_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Master_Batch_Search_Query_Categories_Set_Input>;
  where: Master_Batch_Search_Query_Categories_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Master_Batch_Search_Query_Categories_Var_Pop_Fields = {
  __typename?: 'master_batch_search_query_categories_var_pop_fields';
  query_category_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Master_Batch_Search_Query_Categories_Var_Samp_Fields = {
  __typename?: 'master_batch_search_query_categories_var_samp_fields';
  query_category_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Master_Batch_Search_Query_Categories_Variance_Fields = {
  __typename?: 'master_batch_search_query_categories_variance_fields';
  query_category_id?: Maybe<Scalars['Float']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "batch_search_queries_processing_state" */
  delete_batch_search_queries_processing_state?: Maybe<Batch_Search_Queries_Processing_State_Mutation_Response>;
  /** delete single row from the table: "batch_search_queries_processing_state" */
  delete_batch_search_queries_processing_state_by_pk?: Maybe<Batch_Search_Queries_Processing_State>;
  /** delete data from the table: "master_batch_search_queries" */
  delete_master_batch_search_queries?: Maybe<Master_Batch_Search_Queries_Mutation_Response>;
  /** delete single row from the table: "master_batch_search_queries" */
  delete_master_batch_search_queries_by_pk?: Maybe<Master_Batch_Search_Queries>;
  /** delete data from the table: "master_batch_search_query_categories" */
  delete_master_batch_search_query_categories?: Maybe<Master_Batch_Search_Query_Categories_Mutation_Response>;
  /** delete single row from the table: "master_batch_search_query_categories" */
  delete_master_batch_search_query_categories_by_pk?: Maybe<Master_Batch_Search_Query_Categories>;
  /** delete data from the table: "strapi.admin_permissions" */
  delete_strapi_admin_permissions?: Maybe<Strapi_Admin_Permissions_Mutation_Response>;
  /** delete single row from the table: "strapi.admin_permissions" */
  delete_strapi_admin_permissions_by_pk?: Maybe<Strapi_Admin_Permissions>;
  /** delete data from the table: "strapi.admin_permissions_role_links" */
  delete_strapi_admin_permissions_role_links?: Maybe<Strapi_Admin_Permissions_Role_Links_Mutation_Response>;
  /** delete data from the table: "strapi.admin_roles" */
  delete_strapi_admin_roles?: Maybe<Strapi_Admin_Roles_Mutation_Response>;
  /** delete single row from the table: "strapi.admin_roles" */
  delete_strapi_admin_roles_by_pk?: Maybe<Strapi_Admin_Roles>;
  /** delete data from the table: "strapi.admin_users" */
  delete_strapi_admin_users?: Maybe<Strapi_Admin_Users_Mutation_Response>;
  /** delete single row from the table: "strapi.admin_users" */
  delete_strapi_admin_users_by_pk?: Maybe<Strapi_Admin_Users>;
  /** delete data from the table: "strapi.admin_users_roles_links" */
  delete_strapi_admin_users_roles_links?: Maybe<Strapi_Admin_Users_Roles_Links_Mutation_Response>;
  /** delete data from the table: "strapi.files" */
  delete_strapi_files?: Maybe<Strapi_Files_Mutation_Response>;
  /** delete single row from the table: "strapi.files" */
  delete_strapi_files_by_pk?: Maybe<Strapi_Files>;
  /** delete data from the table: "strapi.files_related_morphs" */
  delete_strapi_files_related_morphs?: Maybe<Strapi_Files_Related_Morphs_Mutation_Response>;
  /** delete data from the table: "strapi.i18n_locale" */
  delete_strapi_i18n_locale?: Maybe<Strapi_I18n_Locale_Mutation_Response>;
  /** delete single row from the table: "strapi.i18n_locale" */
  delete_strapi_i18n_locale_by_pk?: Maybe<Strapi_I18n_Locale>;
  /** delete data from the table: "strapi.strapi_api_tokens" */
  delete_strapi_strapi_api_tokens?: Maybe<Strapi_Strapi_Api_Tokens_Mutation_Response>;
  /** delete single row from the table: "strapi.strapi_api_tokens" */
  delete_strapi_strapi_api_tokens_by_pk?: Maybe<Strapi_Strapi_Api_Tokens>;
  /** delete data from the table: "strapi.strapi_core_store_settings" */
  delete_strapi_strapi_core_store_settings?: Maybe<Strapi_Strapi_Core_Store_Settings_Mutation_Response>;
  /** delete single row from the table: "strapi.strapi_core_store_settings" */
  delete_strapi_strapi_core_store_settings_by_pk?: Maybe<Strapi_Strapi_Core_Store_Settings>;
  /** delete data from the table: "strapi.strapi_database_schema" */
  delete_strapi_strapi_database_schema?: Maybe<Strapi_Strapi_Database_Schema_Mutation_Response>;
  /** delete single row from the table: "strapi.strapi_database_schema" */
  delete_strapi_strapi_database_schema_by_pk?: Maybe<Strapi_Strapi_Database_Schema>;
  /** delete data from the table: "strapi.strapi_migrations" */
  delete_strapi_strapi_migrations?: Maybe<Strapi_Strapi_Migrations_Mutation_Response>;
  /** delete single row from the table: "strapi.strapi_migrations" */
  delete_strapi_strapi_migrations_by_pk?: Maybe<Strapi_Strapi_Migrations>;
  /** delete data from the table: "strapi.strapi_webhooks" */
  delete_strapi_strapi_webhooks?: Maybe<Strapi_Strapi_Webhooks_Mutation_Response>;
  /** delete single row from the table: "strapi.strapi_webhooks" */
  delete_strapi_strapi_webhooks_by_pk?: Maybe<Strapi_Strapi_Webhooks>;
  /** delete data from the table: "strapi.up_permissions" */
  delete_strapi_up_permissions?: Maybe<Strapi_Up_Permissions_Mutation_Response>;
  /** delete single row from the table: "strapi.up_permissions" */
  delete_strapi_up_permissions_by_pk?: Maybe<Strapi_Up_Permissions>;
  /** delete data from the table: "strapi.up_permissions_role_links" */
  delete_strapi_up_permissions_role_links?: Maybe<Strapi_Up_Permissions_Role_Links_Mutation_Response>;
  /** delete data from the table: "strapi.up_roles" */
  delete_strapi_up_roles?: Maybe<Strapi_Up_Roles_Mutation_Response>;
  /** delete single row from the table: "strapi.up_roles" */
  delete_strapi_up_roles_by_pk?: Maybe<Strapi_Up_Roles>;
  /** delete data from the table: "strapi.up_users" */
  delete_strapi_up_users?: Maybe<Strapi_Up_Users_Mutation_Response>;
  /** delete single row from the table: "strapi.up_users" */
  delete_strapi_up_users_by_pk?: Maybe<Strapi_Up_Users>;
  /** delete data from the table: "strapi.up_users_role_links" */
  delete_strapi_up_users_role_links?: Maybe<Strapi_Up_Users_Role_Links_Mutation_Response>;
  /** insert data into the table: "batch_search_queries_processing_state" */
  insert_batch_search_queries_processing_state?: Maybe<Batch_Search_Queries_Processing_State_Mutation_Response>;
  /** insert a single row into the table: "batch_search_queries_processing_state" */
  insert_batch_search_queries_processing_state_one?: Maybe<Batch_Search_Queries_Processing_State>;
  /** insert data into the table: "master_batch_search_queries" */
  insert_master_batch_search_queries?: Maybe<Master_Batch_Search_Queries_Mutation_Response>;
  /** insert a single row into the table: "master_batch_search_queries" */
  insert_master_batch_search_queries_one?: Maybe<Master_Batch_Search_Queries>;
  /** insert data into the table: "master_batch_search_query_categories" */
  insert_master_batch_search_query_categories?: Maybe<Master_Batch_Search_Query_Categories_Mutation_Response>;
  /** insert a single row into the table: "master_batch_search_query_categories" */
  insert_master_batch_search_query_categories_one?: Maybe<Master_Batch_Search_Query_Categories>;
  /** insert data into the table: "strapi.admin_permissions" */
  insert_strapi_admin_permissions?: Maybe<Strapi_Admin_Permissions_Mutation_Response>;
  /** insert a single row into the table: "strapi.admin_permissions" */
  insert_strapi_admin_permissions_one?: Maybe<Strapi_Admin_Permissions>;
  /** insert data into the table: "strapi.admin_permissions_role_links" */
  insert_strapi_admin_permissions_role_links?: Maybe<Strapi_Admin_Permissions_Role_Links_Mutation_Response>;
  /** insert a single row into the table: "strapi.admin_permissions_role_links" */
  insert_strapi_admin_permissions_role_links_one?: Maybe<Strapi_Admin_Permissions_Role_Links>;
  /** insert data into the table: "strapi.admin_roles" */
  insert_strapi_admin_roles?: Maybe<Strapi_Admin_Roles_Mutation_Response>;
  /** insert a single row into the table: "strapi.admin_roles" */
  insert_strapi_admin_roles_one?: Maybe<Strapi_Admin_Roles>;
  /** insert data into the table: "strapi.admin_users" */
  insert_strapi_admin_users?: Maybe<Strapi_Admin_Users_Mutation_Response>;
  /** insert a single row into the table: "strapi.admin_users" */
  insert_strapi_admin_users_one?: Maybe<Strapi_Admin_Users>;
  /** insert data into the table: "strapi.admin_users_roles_links" */
  insert_strapi_admin_users_roles_links?: Maybe<Strapi_Admin_Users_Roles_Links_Mutation_Response>;
  /** insert a single row into the table: "strapi.admin_users_roles_links" */
  insert_strapi_admin_users_roles_links_one?: Maybe<Strapi_Admin_Users_Roles_Links>;
  /** insert data into the table: "strapi.files" */
  insert_strapi_files?: Maybe<Strapi_Files_Mutation_Response>;
  /** insert a single row into the table: "strapi.files" */
  insert_strapi_files_one?: Maybe<Strapi_Files>;
  /** insert data into the table: "strapi.files_related_morphs" */
  insert_strapi_files_related_morphs?: Maybe<Strapi_Files_Related_Morphs_Mutation_Response>;
  /** insert a single row into the table: "strapi.files_related_morphs" */
  insert_strapi_files_related_morphs_one?: Maybe<Strapi_Files_Related_Morphs>;
  /** insert data into the table: "strapi.i18n_locale" */
  insert_strapi_i18n_locale?: Maybe<Strapi_I18n_Locale_Mutation_Response>;
  /** insert a single row into the table: "strapi.i18n_locale" */
  insert_strapi_i18n_locale_one?: Maybe<Strapi_I18n_Locale>;
  /** insert data into the table: "strapi.strapi_api_tokens" */
  insert_strapi_strapi_api_tokens?: Maybe<Strapi_Strapi_Api_Tokens_Mutation_Response>;
  /** insert a single row into the table: "strapi.strapi_api_tokens" */
  insert_strapi_strapi_api_tokens_one?: Maybe<Strapi_Strapi_Api_Tokens>;
  /** insert data into the table: "strapi.strapi_core_store_settings" */
  insert_strapi_strapi_core_store_settings?: Maybe<Strapi_Strapi_Core_Store_Settings_Mutation_Response>;
  /** insert a single row into the table: "strapi.strapi_core_store_settings" */
  insert_strapi_strapi_core_store_settings_one?: Maybe<Strapi_Strapi_Core_Store_Settings>;
  /** insert data into the table: "strapi.strapi_database_schema" */
  insert_strapi_strapi_database_schema?: Maybe<Strapi_Strapi_Database_Schema_Mutation_Response>;
  /** insert a single row into the table: "strapi.strapi_database_schema" */
  insert_strapi_strapi_database_schema_one?: Maybe<Strapi_Strapi_Database_Schema>;
  /** insert data into the table: "strapi.strapi_migrations" */
  insert_strapi_strapi_migrations?: Maybe<Strapi_Strapi_Migrations_Mutation_Response>;
  /** insert a single row into the table: "strapi.strapi_migrations" */
  insert_strapi_strapi_migrations_one?: Maybe<Strapi_Strapi_Migrations>;
  /** insert data into the table: "strapi.strapi_webhooks" */
  insert_strapi_strapi_webhooks?: Maybe<Strapi_Strapi_Webhooks_Mutation_Response>;
  /** insert a single row into the table: "strapi.strapi_webhooks" */
  insert_strapi_strapi_webhooks_one?: Maybe<Strapi_Strapi_Webhooks>;
  /** insert data into the table: "strapi.up_permissions" */
  insert_strapi_up_permissions?: Maybe<Strapi_Up_Permissions_Mutation_Response>;
  /** insert a single row into the table: "strapi.up_permissions" */
  insert_strapi_up_permissions_one?: Maybe<Strapi_Up_Permissions>;
  /** insert data into the table: "strapi.up_permissions_role_links" */
  insert_strapi_up_permissions_role_links?: Maybe<Strapi_Up_Permissions_Role_Links_Mutation_Response>;
  /** insert a single row into the table: "strapi.up_permissions_role_links" */
  insert_strapi_up_permissions_role_links_one?: Maybe<Strapi_Up_Permissions_Role_Links>;
  /** insert data into the table: "strapi.up_roles" */
  insert_strapi_up_roles?: Maybe<Strapi_Up_Roles_Mutation_Response>;
  /** insert a single row into the table: "strapi.up_roles" */
  insert_strapi_up_roles_one?: Maybe<Strapi_Up_Roles>;
  /** insert data into the table: "strapi.up_users" */
  insert_strapi_up_users?: Maybe<Strapi_Up_Users_Mutation_Response>;
  /** insert a single row into the table: "strapi.up_users" */
  insert_strapi_up_users_one?: Maybe<Strapi_Up_Users>;
  /** insert data into the table: "strapi.up_users_role_links" */
  insert_strapi_up_users_role_links?: Maybe<Strapi_Up_Users_Role_Links_Mutation_Response>;
  /** insert a single row into the table: "strapi.up_users_role_links" */
  insert_strapi_up_users_role_links_one?: Maybe<Strapi_Up_Users_Role_Links>;
  /** update data of the table: "batch_search_queries_processing_state" */
  update_batch_search_queries_processing_state?: Maybe<Batch_Search_Queries_Processing_State_Mutation_Response>;
  /** update single row of the table: "batch_search_queries_processing_state" */
  update_batch_search_queries_processing_state_by_pk?: Maybe<Batch_Search_Queries_Processing_State>;
  /** update multiples rows of table: "batch_search_queries_processing_state" */
  update_batch_search_queries_processing_state_many?: Maybe<Array<Maybe<Batch_Search_Queries_Processing_State_Mutation_Response>>>;
  /** update data of the table: "master_batch_search_queries" */
  update_master_batch_search_queries?: Maybe<Master_Batch_Search_Queries_Mutation_Response>;
  /** update single row of the table: "master_batch_search_queries" */
  update_master_batch_search_queries_by_pk?: Maybe<Master_Batch_Search_Queries>;
  /** update multiples rows of table: "master_batch_search_queries" */
  update_master_batch_search_queries_many?: Maybe<Array<Maybe<Master_Batch_Search_Queries_Mutation_Response>>>;
  /** update data of the table: "master_batch_search_query_categories" */
  update_master_batch_search_query_categories?: Maybe<Master_Batch_Search_Query_Categories_Mutation_Response>;
  /** update single row of the table: "master_batch_search_query_categories" */
  update_master_batch_search_query_categories_by_pk?: Maybe<Master_Batch_Search_Query_Categories>;
  /** update multiples rows of table: "master_batch_search_query_categories" */
  update_master_batch_search_query_categories_many?: Maybe<Array<Maybe<Master_Batch_Search_Query_Categories_Mutation_Response>>>;
  /** update data of the table: "strapi.admin_permissions" */
  update_strapi_admin_permissions?: Maybe<Strapi_Admin_Permissions_Mutation_Response>;
  /** update single row of the table: "strapi.admin_permissions" */
  update_strapi_admin_permissions_by_pk?: Maybe<Strapi_Admin_Permissions>;
  /** update multiples rows of table: "strapi.admin_permissions" */
  update_strapi_admin_permissions_many?: Maybe<Array<Maybe<Strapi_Admin_Permissions_Mutation_Response>>>;
  /** update data of the table: "strapi.admin_permissions_role_links" */
  update_strapi_admin_permissions_role_links?: Maybe<Strapi_Admin_Permissions_Role_Links_Mutation_Response>;
  /** update multiples rows of table: "strapi.admin_permissions_role_links" */
  update_strapi_admin_permissions_role_links_many?: Maybe<Array<Maybe<Strapi_Admin_Permissions_Role_Links_Mutation_Response>>>;
  /** update data of the table: "strapi.admin_roles" */
  update_strapi_admin_roles?: Maybe<Strapi_Admin_Roles_Mutation_Response>;
  /** update single row of the table: "strapi.admin_roles" */
  update_strapi_admin_roles_by_pk?: Maybe<Strapi_Admin_Roles>;
  /** update multiples rows of table: "strapi.admin_roles" */
  update_strapi_admin_roles_many?: Maybe<Array<Maybe<Strapi_Admin_Roles_Mutation_Response>>>;
  /** update data of the table: "strapi.admin_users" */
  update_strapi_admin_users?: Maybe<Strapi_Admin_Users_Mutation_Response>;
  /** update single row of the table: "strapi.admin_users" */
  update_strapi_admin_users_by_pk?: Maybe<Strapi_Admin_Users>;
  /** update multiples rows of table: "strapi.admin_users" */
  update_strapi_admin_users_many?: Maybe<Array<Maybe<Strapi_Admin_Users_Mutation_Response>>>;
  /** update data of the table: "strapi.admin_users_roles_links" */
  update_strapi_admin_users_roles_links?: Maybe<Strapi_Admin_Users_Roles_Links_Mutation_Response>;
  /** update multiples rows of table: "strapi.admin_users_roles_links" */
  update_strapi_admin_users_roles_links_many?: Maybe<Array<Maybe<Strapi_Admin_Users_Roles_Links_Mutation_Response>>>;
  /** update data of the table: "strapi.files" */
  update_strapi_files?: Maybe<Strapi_Files_Mutation_Response>;
  /** update single row of the table: "strapi.files" */
  update_strapi_files_by_pk?: Maybe<Strapi_Files>;
  /** update multiples rows of table: "strapi.files" */
  update_strapi_files_many?: Maybe<Array<Maybe<Strapi_Files_Mutation_Response>>>;
  /** update data of the table: "strapi.files_related_morphs" */
  update_strapi_files_related_morphs?: Maybe<Strapi_Files_Related_Morphs_Mutation_Response>;
  /** update multiples rows of table: "strapi.files_related_morphs" */
  update_strapi_files_related_morphs_many?: Maybe<Array<Maybe<Strapi_Files_Related_Morphs_Mutation_Response>>>;
  /** update data of the table: "strapi.i18n_locale" */
  update_strapi_i18n_locale?: Maybe<Strapi_I18n_Locale_Mutation_Response>;
  /** update single row of the table: "strapi.i18n_locale" */
  update_strapi_i18n_locale_by_pk?: Maybe<Strapi_I18n_Locale>;
  /** update multiples rows of table: "strapi.i18n_locale" */
  update_strapi_i18n_locale_many?: Maybe<Array<Maybe<Strapi_I18n_Locale_Mutation_Response>>>;
  /** update data of the table: "strapi.strapi_api_tokens" */
  update_strapi_strapi_api_tokens?: Maybe<Strapi_Strapi_Api_Tokens_Mutation_Response>;
  /** update single row of the table: "strapi.strapi_api_tokens" */
  update_strapi_strapi_api_tokens_by_pk?: Maybe<Strapi_Strapi_Api_Tokens>;
  /** update multiples rows of table: "strapi.strapi_api_tokens" */
  update_strapi_strapi_api_tokens_many?: Maybe<Array<Maybe<Strapi_Strapi_Api_Tokens_Mutation_Response>>>;
  /** update data of the table: "strapi.strapi_core_store_settings" */
  update_strapi_strapi_core_store_settings?: Maybe<Strapi_Strapi_Core_Store_Settings_Mutation_Response>;
  /** update single row of the table: "strapi.strapi_core_store_settings" */
  update_strapi_strapi_core_store_settings_by_pk?: Maybe<Strapi_Strapi_Core_Store_Settings>;
  /** update multiples rows of table: "strapi.strapi_core_store_settings" */
  update_strapi_strapi_core_store_settings_many?: Maybe<Array<Maybe<Strapi_Strapi_Core_Store_Settings_Mutation_Response>>>;
  /** update data of the table: "strapi.strapi_database_schema" */
  update_strapi_strapi_database_schema?: Maybe<Strapi_Strapi_Database_Schema_Mutation_Response>;
  /** update single row of the table: "strapi.strapi_database_schema" */
  update_strapi_strapi_database_schema_by_pk?: Maybe<Strapi_Strapi_Database_Schema>;
  /** update multiples rows of table: "strapi.strapi_database_schema" */
  update_strapi_strapi_database_schema_many?: Maybe<Array<Maybe<Strapi_Strapi_Database_Schema_Mutation_Response>>>;
  /** update data of the table: "strapi.strapi_migrations" */
  update_strapi_strapi_migrations?: Maybe<Strapi_Strapi_Migrations_Mutation_Response>;
  /** update single row of the table: "strapi.strapi_migrations" */
  update_strapi_strapi_migrations_by_pk?: Maybe<Strapi_Strapi_Migrations>;
  /** update multiples rows of table: "strapi.strapi_migrations" */
  update_strapi_strapi_migrations_many?: Maybe<Array<Maybe<Strapi_Strapi_Migrations_Mutation_Response>>>;
  /** update data of the table: "strapi.strapi_webhooks" */
  update_strapi_strapi_webhooks?: Maybe<Strapi_Strapi_Webhooks_Mutation_Response>;
  /** update single row of the table: "strapi.strapi_webhooks" */
  update_strapi_strapi_webhooks_by_pk?: Maybe<Strapi_Strapi_Webhooks>;
  /** update multiples rows of table: "strapi.strapi_webhooks" */
  update_strapi_strapi_webhooks_many?: Maybe<Array<Maybe<Strapi_Strapi_Webhooks_Mutation_Response>>>;
  /** update data of the table: "strapi.up_permissions" */
  update_strapi_up_permissions?: Maybe<Strapi_Up_Permissions_Mutation_Response>;
  /** update single row of the table: "strapi.up_permissions" */
  update_strapi_up_permissions_by_pk?: Maybe<Strapi_Up_Permissions>;
  /** update multiples rows of table: "strapi.up_permissions" */
  update_strapi_up_permissions_many?: Maybe<Array<Maybe<Strapi_Up_Permissions_Mutation_Response>>>;
  /** update data of the table: "strapi.up_permissions_role_links" */
  update_strapi_up_permissions_role_links?: Maybe<Strapi_Up_Permissions_Role_Links_Mutation_Response>;
  /** update multiples rows of table: "strapi.up_permissions_role_links" */
  update_strapi_up_permissions_role_links_many?: Maybe<Array<Maybe<Strapi_Up_Permissions_Role_Links_Mutation_Response>>>;
  /** update data of the table: "strapi.up_roles" */
  update_strapi_up_roles?: Maybe<Strapi_Up_Roles_Mutation_Response>;
  /** update single row of the table: "strapi.up_roles" */
  update_strapi_up_roles_by_pk?: Maybe<Strapi_Up_Roles>;
  /** update multiples rows of table: "strapi.up_roles" */
  update_strapi_up_roles_many?: Maybe<Array<Maybe<Strapi_Up_Roles_Mutation_Response>>>;
  /** update data of the table: "strapi.up_users" */
  update_strapi_up_users?: Maybe<Strapi_Up_Users_Mutation_Response>;
  /** update single row of the table: "strapi.up_users" */
  update_strapi_up_users_by_pk?: Maybe<Strapi_Up_Users>;
  /** update multiples rows of table: "strapi.up_users" */
  update_strapi_up_users_many?: Maybe<Array<Maybe<Strapi_Up_Users_Mutation_Response>>>;
  /** update data of the table: "strapi.up_users_role_links" */
  update_strapi_up_users_role_links?: Maybe<Strapi_Up_Users_Role_Links_Mutation_Response>;
  /** update multiples rows of table: "strapi.up_users_role_links" */
  update_strapi_up_users_role_links_many?: Maybe<Array<Maybe<Strapi_Up_Users_Role_Links_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_Batch_Search_Queries_Processing_StateArgs = {
  where: Batch_Search_Queries_Processing_State_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Batch_Search_Queries_Processing_State_By_PkArgs = {
  query_id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Master_Batch_Search_QueriesArgs = {
  where: Master_Batch_Search_Queries_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Master_Batch_Search_Queries_By_PkArgs = {
  query_id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Master_Batch_Search_Query_CategoriesArgs = {
  where: Master_Batch_Search_Query_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Master_Batch_Search_Query_Categories_By_PkArgs = {
  query_category_id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Admin_PermissionsArgs = {
  where: Strapi_Admin_Permissions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Admin_Permissions_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Admin_Permissions_Role_LinksArgs = {
  where: Strapi_Admin_Permissions_Role_Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Admin_RolesArgs = {
  where: Strapi_Admin_Roles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Admin_Roles_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Admin_UsersArgs = {
  where: Strapi_Admin_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Admin_Users_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Admin_Users_Roles_LinksArgs = {
  where: Strapi_Admin_Users_Roles_Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_FilesArgs = {
  where: Strapi_Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Files_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Files_Related_MorphsArgs = {
  where: Strapi_Files_Related_Morphs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_I18n_LocaleArgs = {
  where: Strapi_I18n_Locale_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_I18n_Locale_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Strapi_Api_TokensArgs = {
  where: Strapi_Strapi_Api_Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Strapi_Api_Tokens_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Strapi_Core_Store_SettingsArgs = {
  where: Strapi_Strapi_Core_Store_Settings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Strapi_Core_Store_Settings_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Strapi_Database_SchemaArgs = {
  where: Strapi_Strapi_Database_Schema_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Strapi_Database_Schema_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Strapi_MigrationsArgs = {
  where: Strapi_Strapi_Migrations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Strapi_Migrations_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Strapi_WebhooksArgs = {
  where: Strapi_Strapi_Webhooks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Strapi_Webhooks_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Up_PermissionsArgs = {
  where: Strapi_Up_Permissions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Up_Permissions_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Up_Permissions_Role_LinksArgs = {
  where: Strapi_Up_Permissions_Role_Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Up_RolesArgs = {
  where: Strapi_Up_Roles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Up_Roles_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Up_UsersArgs = {
  where: Strapi_Up_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Up_Users_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Strapi_Up_Users_Role_LinksArgs = {
  where: Strapi_Up_Users_Role_Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootInsert_Batch_Search_Queries_Processing_StateArgs = {
  objects: Array<Batch_Search_Queries_Processing_State_Insert_Input>;
  on_conflict?: InputMaybe<Batch_Search_Queries_Processing_State_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Batch_Search_Queries_Processing_State_OneArgs = {
  object: Batch_Search_Queries_Processing_State_Insert_Input;
  on_conflict?: InputMaybe<Batch_Search_Queries_Processing_State_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Master_Batch_Search_QueriesArgs = {
  objects: Array<Master_Batch_Search_Queries_Insert_Input>;
  on_conflict?: InputMaybe<Master_Batch_Search_Queries_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Master_Batch_Search_Queries_OneArgs = {
  object: Master_Batch_Search_Queries_Insert_Input;
  on_conflict?: InputMaybe<Master_Batch_Search_Queries_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Master_Batch_Search_Query_CategoriesArgs = {
  objects: Array<Master_Batch_Search_Query_Categories_Insert_Input>;
  on_conflict?: InputMaybe<Master_Batch_Search_Query_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Master_Batch_Search_Query_Categories_OneArgs = {
  object: Master_Batch_Search_Query_Categories_Insert_Input;
  on_conflict?: InputMaybe<Master_Batch_Search_Query_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Admin_PermissionsArgs = {
  objects: Array<Strapi_Admin_Permissions_Insert_Input>;
  on_conflict?: InputMaybe<Strapi_Admin_Permissions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Admin_Permissions_OneArgs = {
  object: Strapi_Admin_Permissions_Insert_Input;
  on_conflict?: InputMaybe<Strapi_Admin_Permissions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Admin_Permissions_Role_LinksArgs = {
  objects: Array<Strapi_Admin_Permissions_Role_Links_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Admin_Permissions_Role_Links_OneArgs = {
  object: Strapi_Admin_Permissions_Role_Links_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Admin_RolesArgs = {
  objects: Array<Strapi_Admin_Roles_Insert_Input>;
  on_conflict?: InputMaybe<Strapi_Admin_Roles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Admin_Roles_OneArgs = {
  object: Strapi_Admin_Roles_Insert_Input;
  on_conflict?: InputMaybe<Strapi_Admin_Roles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Admin_UsersArgs = {
  objects: Array<Strapi_Admin_Users_Insert_Input>;
  on_conflict?: InputMaybe<Strapi_Admin_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Admin_Users_OneArgs = {
  object: Strapi_Admin_Users_Insert_Input;
  on_conflict?: InputMaybe<Strapi_Admin_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Admin_Users_Roles_LinksArgs = {
  objects: Array<Strapi_Admin_Users_Roles_Links_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Admin_Users_Roles_Links_OneArgs = {
  object: Strapi_Admin_Users_Roles_Links_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_FilesArgs = {
  objects: Array<Strapi_Files_Insert_Input>;
  on_conflict?: InputMaybe<Strapi_Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Files_OneArgs = {
  object: Strapi_Files_Insert_Input;
  on_conflict?: InputMaybe<Strapi_Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Files_Related_MorphsArgs = {
  objects: Array<Strapi_Files_Related_Morphs_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Files_Related_Morphs_OneArgs = {
  object: Strapi_Files_Related_Morphs_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_I18n_LocaleArgs = {
  objects: Array<Strapi_I18n_Locale_Insert_Input>;
  on_conflict?: InputMaybe<Strapi_I18n_Locale_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_I18n_Locale_OneArgs = {
  object: Strapi_I18n_Locale_Insert_Input;
  on_conflict?: InputMaybe<Strapi_I18n_Locale_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Strapi_Api_TokensArgs = {
  objects: Array<Strapi_Strapi_Api_Tokens_Insert_Input>;
  on_conflict?: InputMaybe<Strapi_Strapi_Api_Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Strapi_Api_Tokens_OneArgs = {
  object: Strapi_Strapi_Api_Tokens_Insert_Input;
  on_conflict?: InputMaybe<Strapi_Strapi_Api_Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Strapi_Core_Store_SettingsArgs = {
  objects: Array<Strapi_Strapi_Core_Store_Settings_Insert_Input>;
  on_conflict?: InputMaybe<Strapi_Strapi_Core_Store_Settings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Strapi_Core_Store_Settings_OneArgs = {
  object: Strapi_Strapi_Core_Store_Settings_Insert_Input;
  on_conflict?: InputMaybe<Strapi_Strapi_Core_Store_Settings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Strapi_Database_SchemaArgs = {
  objects: Array<Strapi_Strapi_Database_Schema_Insert_Input>;
  on_conflict?: InputMaybe<Strapi_Strapi_Database_Schema_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Strapi_Database_Schema_OneArgs = {
  object: Strapi_Strapi_Database_Schema_Insert_Input;
  on_conflict?: InputMaybe<Strapi_Strapi_Database_Schema_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Strapi_MigrationsArgs = {
  objects: Array<Strapi_Strapi_Migrations_Insert_Input>;
  on_conflict?: InputMaybe<Strapi_Strapi_Migrations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Strapi_Migrations_OneArgs = {
  object: Strapi_Strapi_Migrations_Insert_Input;
  on_conflict?: InputMaybe<Strapi_Strapi_Migrations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Strapi_WebhooksArgs = {
  objects: Array<Strapi_Strapi_Webhooks_Insert_Input>;
  on_conflict?: InputMaybe<Strapi_Strapi_Webhooks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Strapi_Webhooks_OneArgs = {
  object: Strapi_Strapi_Webhooks_Insert_Input;
  on_conflict?: InputMaybe<Strapi_Strapi_Webhooks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Up_PermissionsArgs = {
  objects: Array<Strapi_Up_Permissions_Insert_Input>;
  on_conflict?: InputMaybe<Strapi_Up_Permissions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Up_Permissions_OneArgs = {
  object: Strapi_Up_Permissions_Insert_Input;
  on_conflict?: InputMaybe<Strapi_Up_Permissions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Up_Permissions_Role_LinksArgs = {
  objects: Array<Strapi_Up_Permissions_Role_Links_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Up_Permissions_Role_Links_OneArgs = {
  object: Strapi_Up_Permissions_Role_Links_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Up_RolesArgs = {
  objects: Array<Strapi_Up_Roles_Insert_Input>;
  on_conflict?: InputMaybe<Strapi_Up_Roles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Up_Roles_OneArgs = {
  object: Strapi_Up_Roles_Insert_Input;
  on_conflict?: InputMaybe<Strapi_Up_Roles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Up_UsersArgs = {
  objects: Array<Strapi_Up_Users_Insert_Input>;
  on_conflict?: InputMaybe<Strapi_Up_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Up_Users_OneArgs = {
  object: Strapi_Up_Users_Insert_Input;
  on_conflict?: InputMaybe<Strapi_Up_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Up_Users_Role_LinksArgs = {
  objects: Array<Strapi_Up_Users_Role_Links_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Strapi_Up_Users_Role_Links_OneArgs = {
  object: Strapi_Up_Users_Role_Links_Insert_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Batch_Search_Queries_Processing_StateArgs = {
  _inc?: InputMaybe<Batch_Search_Queries_Processing_State_Inc_Input>;
  _set?: InputMaybe<Batch_Search_Queries_Processing_State_Set_Input>;
  where: Batch_Search_Queries_Processing_State_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Batch_Search_Queries_Processing_State_By_PkArgs = {
  _inc?: InputMaybe<Batch_Search_Queries_Processing_State_Inc_Input>;
  _set?: InputMaybe<Batch_Search_Queries_Processing_State_Set_Input>;
  pk_columns: Batch_Search_Queries_Processing_State_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Batch_Search_Queries_Processing_State_ManyArgs = {
  updates: Array<Batch_Search_Queries_Processing_State_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Master_Batch_Search_QueriesArgs = {
  _inc?: InputMaybe<Master_Batch_Search_Queries_Inc_Input>;
  _set?: InputMaybe<Master_Batch_Search_Queries_Set_Input>;
  where: Master_Batch_Search_Queries_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Master_Batch_Search_Queries_By_PkArgs = {
  _inc?: InputMaybe<Master_Batch_Search_Queries_Inc_Input>;
  _set?: InputMaybe<Master_Batch_Search_Queries_Set_Input>;
  pk_columns: Master_Batch_Search_Queries_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Master_Batch_Search_Queries_ManyArgs = {
  updates: Array<Master_Batch_Search_Queries_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Master_Batch_Search_Query_CategoriesArgs = {
  _inc?: InputMaybe<Master_Batch_Search_Query_Categories_Inc_Input>;
  _set?: InputMaybe<Master_Batch_Search_Query_Categories_Set_Input>;
  where: Master_Batch_Search_Query_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Master_Batch_Search_Query_Categories_By_PkArgs = {
  _inc?: InputMaybe<Master_Batch_Search_Query_Categories_Inc_Input>;
  _set?: InputMaybe<Master_Batch_Search_Query_Categories_Set_Input>;
  pk_columns: Master_Batch_Search_Query_Categories_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Master_Batch_Search_Query_Categories_ManyArgs = {
  updates: Array<Master_Batch_Search_Query_Categories_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Admin_PermissionsArgs = {
  _append?: InputMaybe<Strapi_Admin_Permissions_Append_Input>;
  _delete_at_path?: InputMaybe<Strapi_Admin_Permissions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Strapi_Admin_Permissions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Strapi_Admin_Permissions_Delete_Key_Input>;
  _inc?: InputMaybe<Strapi_Admin_Permissions_Inc_Input>;
  _prepend?: InputMaybe<Strapi_Admin_Permissions_Prepend_Input>;
  _set?: InputMaybe<Strapi_Admin_Permissions_Set_Input>;
  where: Strapi_Admin_Permissions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Admin_Permissions_By_PkArgs = {
  _append?: InputMaybe<Strapi_Admin_Permissions_Append_Input>;
  _delete_at_path?: InputMaybe<Strapi_Admin_Permissions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Strapi_Admin_Permissions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Strapi_Admin_Permissions_Delete_Key_Input>;
  _inc?: InputMaybe<Strapi_Admin_Permissions_Inc_Input>;
  _prepend?: InputMaybe<Strapi_Admin_Permissions_Prepend_Input>;
  _set?: InputMaybe<Strapi_Admin_Permissions_Set_Input>;
  pk_columns: Strapi_Admin_Permissions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Admin_Permissions_ManyArgs = {
  updates: Array<Strapi_Admin_Permissions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Admin_Permissions_Role_LinksArgs = {
  _inc?: InputMaybe<Strapi_Admin_Permissions_Role_Links_Inc_Input>;
  _set?: InputMaybe<Strapi_Admin_Permissions_Role_Links_Set_Input>;
  where: Strapi_Admin_Permissions_Role_Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Admin_Permissions_Role_Links_ManyArgs = {
  updates: Array<Strapi_Admin_Permissions_Role_Links_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Admin_RolesArgs = {
  _inc?: InputMaybe<Strapi_Admin_Roles_Inc_Input>;
  _set?: InputMaybe<Strapi_Admin_Roles_Set_Input>;
  where: Strapi_Admin_Roles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Admin_Roles_By_PkArgs = {
  _inc?: InputMaybe<Strapi_Admin_Roles_Inc_Input>;
  _set?: InputMaybe<Strapi_Admin_Roles_Set_Input>;
  pk_columns: Strapi_Admin_Roles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Admin_Roles_ManyArgs = {
  updates: Array<Strapi_Admin_Roles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Admin_UsersArgs = {
  _inc?: InputMaybe<Strapi_Admin_Users_Inc_Input>;
  _set?: InputMaybe<Strapi_Admin_Users_Set_Input>;
  where: Strapi_Admin_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Admin_Users_By_PkArgs = {
  _inc?: InputMaybe<Strapi_Admin_Users_Inc_Input>;
  _set?: InputMaybe<Strapi_Admin_Users_Set_Input>;
  pk_columns: Strapi_Admin_Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Admin_Users_ManyArgs = {
  updates: Array<Strapi_Admin_Users_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Admin_Users_Roles_LinksArgs = {
  _inc?: InputMaybe<Strapi_Admin_Users_Roles_Links_Inc_Input>;
  _set?: InputMaybe<Strapi_Admin_Users_Roles_Links_Set_Input>;
  where: Strapi_Admin_Users_Roles_Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Admin_Users_Roles_Links_ManyArgs = {
  updates: Array<Strapi_Admin_Users_Roles_Links_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_FilesArgs = {
  _append?: InputMaybe<Strapi_Files_Append_Input>;
  _delete_at_path?: InputMaybe<Strapi_Files_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Strapi_Files_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Strapi_Files_Delete_Key_Input>;
  _inc?: InputMaybe<Strapi_Files_Inc_Input>;
  _prepend?: InputMaybe<Strapi_Files_Prepend_Input>;
  _set?: InputMaybe<Strapi_Files_Set_Input>;
  where: Strapi_Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Files_By_PkArgs = {
  _append?: InputMaybe<Strapi_Files_Append_Input>;
  _delete_at_path?: InputMaybe<Strapi_Files_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Strapi_Files_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Strapi_Files_Delete_Key_Input>;
  _inc?: InputMaybe<Strapi_Files_Inc_Input>;
  _prepend?: InputMaybe<Strapi_Files_Prepend_Input>;
  _set?: InputMaybe<Strapi_Files_Set_Input>;
  pk_columns: Strapi_Files_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Files_ManyArgs = {
  updates: Array<Strapi_Files_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Files_Related_MorphsArgs = {
  _inc?: InputMaybe<Strapi_Files_Related_Morphs_Inc_Input>;
  _set?: InputMaybe<Strapi_Files_Related_Morphs_Set_Input>;
  where: Strapi_Files_Related_Morphs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Files_Related_Morphs_ManyArgs = {
  updates: Array<Strapi_Files_Related_Morphs_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_I18n_LocaleArgs = {
  _inc?: InputMaybe<Strapi_I18n_Locale_Inc_Input>;
  _set?: InputMaybe<Strapi_I18n_Locale_Set_Input>;
  where: Strapi_I18n_Locale_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_I18n_Locale_By_PkArgs = {
  _inc?: InputMaybe<Strapi_I18n_Locale_Inc_Input>;
  _set?: InputMaybe<Strapi_I18n_Locale_Set_Input>;
  pk_columns: Strapi_I18n_Locale_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_I18n_Locale_ManyArgs = {
  updates: Array<Strapi_I18n_Locale_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_Api_TokensArgs = {
  _inc?: InputMaybe<Strapi_Strapi_Api_Tokens_Inc_Input>;
  _set?: InputMaybe<Strapi_Strapi_Api_Tokens_Set_Input>;
  where: Strapi_Strapi_Api_Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_Api_Tokens_By_PkArgs = {
  _inc?: InputMaybe<Strapi_Strapi_Api_Tokens_Inc_Input>;
  _set?: InputMaybe<Strapi_Strapi_Api_Tokens_Set_Input>;
  pk_columns: Strapi_Strapi_Api_Tokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_Api_Tokens_ManyArgs = {
  updates: Array<Strapi_Strapi_Api_Tokens_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_Core_Store_SettingsArgs = {
  _inc?: InputMaybe<Strapi_Strapi_Core_Store_Settings_Inc_Input>;
  _set?: InputMaybe<Strapi_Strapi_Core_Store_Settings_Set_Input>;
  where: Strapi_Strapi_Core_Store_Settings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_Core_Store_Settings_By_PkArgs = {
  _inc?: InputMaybe<Strapi_Strapi_Core_Store_Settings_Inc_Input>;
  _set?: InputMaybe<Strapi_Strapi_Core_Store_Settings_Set_Input>;
  pk_columns: Strapi_Strapi_Core_Store_Settings_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_Core_Store_Settings_ManyArgs = {
  updates: Array<Strapi_Strapi_Core_Store_Settings_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_Database_SchemaArgs = {
  _inc?: InputMaybe<Strapi_Strapi_Database_Schema_Inc_Input>;
  _set?: InputMaybe<Strapi_Strapi_Database_Schema_Set_Input>;
  where: Strapi_Strapi_Database_Schema_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_Database_Schema_By_PkArgs = {
  _inc?: InputMaybe<Strapi_Strapi_Database_Schema_Inc_Input>;
  _set?: InputMaybe<Strapi_Strapi_Database_Schema_Set_Input>;
  pk_columns: Strapi_Strapi_Database_Schema_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_Database_Schema_ManyArgs = {
  updates: Array<Strapi_Strapi_Database_Schema_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_MigrationsArgs = {
  _inc?: InputMaybe<Strapi_Strapi_Migrations_Inc_Input>;
  _set?: InputMaybe<Strapi_Strapi_Migrations_Set_Input>;
  where: Strapi_Strapi_Migrations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_Migrations_By_PkArgs = {
  _inc?: InputMaybe<Strapi_Strapi_Migrations_Inc_Input>;
  _set?: InputMaybe<Strapi_Strapi_Migrations_Set_Input>;
  pk_columns: Strapi_Strapi_Migrations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_Migrations_ManyArgs = {
  updates: Array<Strapi_Strapi_Migrations_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_WebhooksArgs = {
  _append?: InputMaybe<Strapi_Strapi_Webhooks_Append_Input>;
  _delete_at_path?: InputMaybe<Strapi_Strapi_Webhooks_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Strapi_Strapi_Webhooks_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Strapi_Strapi_Webhooks_Delete_Key_Input>;
  _inc?: InputMaybe<Strapi_Strapi_Webhooks_Inc_Input>;
  _prepend?: InputMaybe<Strapi_Strapi_Webhooks_Prepend_Input>;
  _set?: InputMaybe<Strapi_Strapi_Webhooks_Set_Input>;
  where: Strapi_Strapi_Webhooks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_Webhooks_By_PkArgs = {
  _append?: InputMaybe<Strapi_Strapi_Webhooks_Append_Input>;
  _delete_at_path?: InputMaybe<Strapi_Strapi_Webhooks_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Strapi_Strapi_Webhooks_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Strapi_Strapi_Webhooks_Delete_Key_Input>;
  _inc?: InputMaybe<Strapi_Strapi_Webhooks_Inc_Input>;
  _prepend?: InputMaybe<Strapi_Strapi_Webhooks_Prepend_Input>;
  _set?: InputMaybe<Strapi_Strapi_Webhooks_Set_Input>;
  pk_columns: Strapi_Strapi_Webhooks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Strapi_Webhooks_ManyArgs = {
  updates: Array<Strapi_Strapi_Webhooks_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Up_PermissionsArgs = {
  _inc?: InputMaybe<Strapi_Up_Permissions_Inc_Input>;
  _set?: InputMaybe<Strapi_Up_Permissions_Set_Input>;
  where: Strapi_Up_Permissions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Up_Permissions_By_PkArgs = {
  _inc?: InputMaybe<Strapi_Up_Permissions_Inc_Input>;
  _set?: InputMaybe<Strapi_Up_Permissions_Set_Input>;
  pk_columns: Strapi_Up_Permissions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Up_Permissions_ManyArgs = {
  updates: Array<Strapi_Up_Permissions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Up_Permissions_Role_LinksArgs = {
  _inc?: InputMaybe<Strapi_Up_Permissions_Role_Links_Inc_Input>;
  _set?: InputMaybe<Strapi_Up_Permissions_Role_Links_Set_Input>;
  where: Strapi_Up_Permissions_Role_Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Up_Permissions_Role_Links_ManyArgs = {
  updates: Array<Strapi_Up_Permissions_Role_Links_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Up_RolesArgs = {
  _inc?: InputMaybe<Strapi_Up_Roles_Inc_Input>;
  _set?: InputMaybe<Strapi_Up_Roles_Set_Input>;
  where: Strapi_Up_Roles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Up_Roles_By_PkArgs = {
  _inc?: InputMaybe<Strapi_Up_Roles_Inc_Input>;
  _set?: InputMaybe<Strapi_Up_Roles_Set_Input>;
  pk_columns: Strapi_Up_Roles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Up_Roles_ManyArgs = {
  updates: Array<Strapi_Up_Roles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Up_UsersArgs = {
  _inc?: InputMaybe<Strapi_Up_Users_Inc_Input>;
  _set?: InputMaybe<Strapi_Up_Users_Set_Input>;
  where: Strapi_Up_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Up_Users_By_PkArgs = {
  _inc?: InputMaybe<Strapi_Up_Users_Inc_Input>;
  _set?: InputMaybe<Strapi_Up_Users_Set_Input>;
  pk_columns: Strapi_Up_Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Up_Users_ManyArgs = {
  updates: Array<Strapi_Up_Users_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Up_Users_Role_LinksArgs = {
  _inc?: InputMaybe<Strapi_Up_Users_Role_Links_Inc_Input>;
  _set?: InputMaybe<Strapi_Up_Users_Role_Links_Set_Input>;
  where: Strapi_Up_Users_Role_Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Strapi_Up_Users_Role_Links_ManyArgs = {
  updates: Array<Strapi_Up_Users_Role_Links_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "batch_search_queries_processing_state" */
  batch_search_queries_processing_state: Array<Batch_Search_Queries_Processing_State>;
  /** fetch aggregated fields from the table: "batch_search_queries_processing_state" */
  batch_search_queries_processing_state_aggregate: Batch_Search_Queries_Processing_State_Aggregate;
  /** fetch data from the table: "batch_search_queries_processing_state" using primary key columns */
  batch_search_queries_processing_state_by_pk?: Maybe<Batch_Search_Queries_Processing_State>;
  /** fetch data from the table: "master_batch_search_queries" */
  master_batch_search_queries: Array<Master_Batch_Search_Queries>;
  /** fetch aggregated fields from the table: "master_batch_search_queries" */
  master_batch_search_queries_aggregate: Master_Batch_Search_Queries_Aggregate;
  /** fetch data from the table: "master_batch_search_queries" using primary key columns */
  master_batch_search_queries_by_pk?: Maybe<Master_Batch_Search_Queries>;
  /** fetch data from the table: "master_batch_search_query_categories" */
  master_batch_search_query_categories: Array<Master_Batch_Search_Query_Categories>;
  /** fetch aggregated fields from the table: "master_batch_search_query_categories" */
  master_batch_search_query_categories_aggregate: Master_Batch_Search_Query_Categories_Aggregate;
  /** fetch data from the table: "master_batch_search_query_categories" using primary key columns */
  master_batch_search_query_categories_by_pk?: Maybe<Master_Batch_Search_Query_Categories>;
  /** fetch data from the table: "strapi.admin_permissions" */
  strapi_admin_permissions: Array<Strapi_Admin_Permissions>;
  /** fetch aggregated fields from the table: "strapi.admin_permissions" */
  strapi_admin_permissions_aggregate: Strapi_Admin_Permissions_Aggregate;
  /** fetch data from the table: "strapi.admin_permissions" using primary key columns */
  strapi_admin_permissions_by_pk?: Maybe<Strapi_Admin_Permissions>;
  /** fetch data from the table: "strapi.admin_permissions_role_links" */
  strapi_admin_permissions_role_links: Array<Strapi_Admin_Permissions_Role_Links>;
  /** fetch aggregated fields from the table: "strapi.admin_permissions_role_links" */
  strapi_admin_permissions_role_links_aggregate: Strapi_Admin_Permissions_Role_Links_Aggregate;
  /** fetch data from the table: "strapi.admin_roles" */
  strapi_admin_roles: Array<Strapi_Admin_Roles>;
  /** fetch aggregated fields from the table: "strapi.admin_roles" */
  strapi_admin_roles_aggregate: Strapi_Admin_Roles_Aggregate;
  /** fetch data from the table: "strapi.admin_roles" using primary key columns */
  strapi_admin_roles_by_pk?: Maybe<Strapi_Admin_Roles>;
  /** fetch data from the table: "strapi.admin_users" */
  strapi_admin_users: Array<Strapi_Admin_Users>;
  /** fetch aggregated fields from the table: "strapi.admin_users" */
  strapi_admin_users_aggregate: Strapi_Admin_Users_Aggregate;
  /** fetch data from the table: "strapi.admin_users" using primary key columns */
  strapi_admin_users_by_pk?: Maybe<Strapi_Admin_Users>;
  /** fetch data from the table: "strapi.admin_users_roles_links" */
  strapi_admin_users_roles_links: Array<Strapi_Admin_Users_Roles_Links>;
  /** fetch aggregated fields from the table: "strapi.admin_users_roles_links" */
  strapi_admin_users_roles_links_aggregate: Strapi_Admin_Users_Roles_Links_Aggregate;
  /** fetch data from the table: "strapi.files" */
  strapi_files: Array<Strapi_Files>;
  /** fetch aggregated fields from the table: "strapi.files" */
  strapi_files_aggregate: Strapi_Files_Aggregate;
  /** fetch data from the table: "strapi.files" using primary key columns */
  strapi_files_by_pk?: Maybe<Strapi_Files>;
  /** fetch data from the table: "strapi.files_related_morphs" */
  strapi_files_related_morphs: Array<Strapi_Files_Related_Morphs>;
  /** fetch aggregated fields from the table: "strapi.files_related_morphs" */
  strapi_files_related_morphs_aggregate: Strapi_Files_Related_Morphs_Aggregate;
  /** fetch data from the table: "strapi.i18n_locale" */
  strapi_i18n_locale: Array<Strapi_I18n_Locale>;
  /** fetch aggregated fields from the table: "strapi.i18n_locale" */
  strapi_i18n_locale_aggregate: Strapi_I18n_Locale_Aggregate;
  /** fetch data from the table: "strapi.i18n_locale" using primary key columns */
  strapi_i18n_locale_by_pk?: Maybe<Strapi_I18n_Locale>;
  /** fetch data from the table: "strapi.strapi_api_tokens" */
  strapi_strapi_api_tokens: Array<Strapi_Strapi_Api_Tokens>;
  /** fetch aggregated fields from the table: "strapi.strapi_api_tokens" */
  strapi_strapi_api_tokens_aggregate: Strapi_Strapi_Api_Tokens_Aggregate;
  /** fetch data from the table: "strapi.strapi_api_tokens" using primary key columns */
  strapi_strapi_api_tokens_by_pk?: Maybe<Strapi_Strapi_Api_Tokens>;
  /** fetch data from the table: "strapi.strapi_core_store_settings" */
  strapi_strapi_core_store_settings: Array<Strapi_Strapi_Core_Store_Settings>;
  /** fetch aggregated fields from the table: "strapi.strapi_core_store_settings" */
  strapi_strapi_core_store_settings_aggregate: Strapi_Strapi_Core_Store_Settings_Aggregate;
  /** fetch data from the table: "strapi.strapi_core_store_settings" using primary key columns */
  strapi_strapi_core_store_settings_by_pk?: Maybe<Strapi_Strapi_Core_Store_Settings>;
  /** fetch data from the table: "strapi.strapi_database_schema" */
  strapi_strapi_database_schema: Array<Strapi_Strapi_Database_Schema>;
  /** fetch aggregated fields from the table: "strapi.strapi_database_schema" */
  strapi_strapi_database_schema_aggregate: Strapi_Strapi_Database_Schema_Aggregate;
  /** fetch data from the table: "strapi.strapi_database_schema" using primary key columns */
  strapi_strapi_database_schema_by_pk?: Maybe<Strapi_Strapi_Database_Schema>;
  /** fetch data from the table: "strapi.strapi_migrations" */
  strapi_strapi_migrations: Array<Strapi_Strapi_Migrations>;
  /** fetch aggregated fields from the table: "strapi.strapi_migrations" */
  strapi_strapi_migrations_aggregate: Strapi_Strapi_Migrations_Aggregate;
  /** fetch data from the table: "strapi.strapi_migrations" using primary key columns */
  strapi_strapi_migrations_by_pk?: Maybe<Strapi_Strapi_Migrations>;
  /** fetch data from the table: "strapi.strapi_webhooks" */
  strapi_strapi_webhooks: Array<Strapi_Strapi_Webhooks>;
  /** fetch aggregated fields from the table: "strapi.strapi_webhooks" */
  strapi_strapi_webhooks_aggregate: Strapi_Strapi_Webhooks_Aggregate;
  /** fetch data from the table: "strapi.strapi_webhooks" using primary key columns */
  strapi_strapi_webhooks_by_pk?: Maybe<Strapi_Strapi_Webhooks>;
  /** fetch data from the table: "strapi.up_permissions" */
  strapi_up_permissions: Array<Strapi_Up_Permissions>;
  /** fetch aggregated fields from the table: "strapi.up_permissions" */
  strapi_up_permissions_aggregate: Strapi_Up_Permissions_Aggregate;
  /** fetch data from the table: "strapi.up_permissions" using primary key columns */
  strapi_up_permissions_by_pk?: Maybe<Strapi_Up_Permissions>;
  /** fetch data from the table: "strapi.up_permissions_role_links" */
  strapi_up_permissions_role_links: Array<Strapi_Up_Permissions_Role_Links>;
  /** fetch aggregated fields from the table: "strapi.up_permissions_role_links" */
  strapi_up_permissions_role_links_aggregate: Strapi_Up_Permissions_Role_Links_Aggregate;
  /** fetch data from the table: "strapi.up_roles" */
  strapi_up_roles: Array<Strapi_Up_Roles>;
  /** fetch aggregated fields from the table: "strapi.up_roles" */
  strapi_up_roles_aggregate: Strapi_Up_Roles_Aggregate;
  /** fetch data from the table: "strapi.up_roles" using primary key columns */
  strapi_up_roles_by_pk?: Maybe<Strapi_Up_Roles>;
  /** fetch data from the table: "strapi.up_users" */
  strapi_up_users: Array<Strapi_Up_Users>;
  /** fetch aggregated fields from the table: "strapi.up_users" */
  strapi_up_users_aggregate: Strapi_Up_Users_Aggregate;
  /** fetch data from the table: "strapi.up_users" using primary key columns */
  strapi_up_users_by_pk?: Maybe<Strapi_Up_Users>;
  /** fetch data from the table: "strapi.up_users_role_links" */
  strapi_up_users_role_links: Array<Strapi_Up_Users_Role_Links>;
  /** fetch aggregated fields from the table: "strapi.up_users_role_links" */
  strapi_up_users_role_links_aggregate: Strapi_Up_Users_Role_Links_Aggregate;
};


export type Query_RootBatch_Search_Queries_Processing_StateArgs = {
  distinct_on?: InputMaybe<Array<Batch_Search_Queries_Processing_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Batch_Search_Queries_Processing_State_Order_By>>;
  where?: InputMaybe<Batch_Search_Queries_Processing_State_Bool_Exp>;
};


export type Query_RootBatch_Search_Queries_Processing_State_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Batch_Search_Queries_Processing_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Batch_Search_Queries_Processing_State_Order_By>>;
  where?: InputMaybe<Batch_Search_Queries_Processing_State_Bool_Exp>;
};


export type Query_RootBatch_Search_Queries_Processing_State_By_PkArgs = {
  query_id: Scalars['Int'];
};


export type Query_RootMaster_Batch_Search_QueriesArgs = {
  distinct_on?: InputMaybe<Array<Master_Batch_Search_Queries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Master_Batch_Search_Queries_Order_By>>;
  where?: InputMaybe<Master_Batch_Search_Queries_Bool_Exp>;
};


export type Query_RootMaster_Batch_Search_Queries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Master_Batch_Search_Queries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Master_Batch_Search_Queries_Order_By>>;
  where?: InputMaybe<Master_Batch_Search_Queries_Bool_Exp>;
};


export type Query_RootMaster_Batch_Search_Queries_By_PkArgs = {
  query_id: Scalars['Int'];
};


export type Query_RootMaster_Batch_Search_Query_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Master_Batch_Search_Query_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Master_Batch_Search_Query_Categories_Order_By>>;
  where?: InputMaybe<Master_Batch_Search_Query_Categories_Bool_Exp>;
};


export type Query_RootMaster_Batch_Search_Query_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Master_Batch_Search_Query_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Master_Batch_Search_Query_Categories_Order_By>>;
  where?: InputMaybe<Master_Batch_Search_Query_Categories_Bool_Exp>;
};


export type Query_RootMaster_Batch_Search_Query_Categories_By_PkArgs = {
  query_category_id: Scalars['Int'];
};


export type Query_RootStrapi_Admin_PermissionsArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Permissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Permissions_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Permissions_Bool_Exp>;
};


export type Query_RootStrapi_Admin_Permissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Permissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Permissions_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Permissions_Bool_Exp>;
};


export type Query_RootStrapi_Admin_Permissions_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootStrapi_Admin_Permissions_Role_LinksArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Permissions_Role_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Permissions_Role_Links_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Permissions_Role_Links_Bool_Exp>;
};


export type Query_RootStrapi_Admin_Permissions_Role_Links_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Permissions_Role_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Permissions_Role_Links_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Permissions_Role_Links_Bool_Exp>;
};


export type Query_RootStrapi_Admin_RolesArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Roles_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Roles_Bool_Exp>;
};


export type Query_RootStrapi_Admin_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Roles_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Roles_Bool_Exp>;
};


export type Query_RootStrapi_Admin_Roles_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootStrapi_Admin_UsersArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Users_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Users_Bool_Exp>;
};


export type Query_RootStrapi_Admin_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Users_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Users_Bool_Exp>;
};


export type Query_RootStrapi_Admin_Users_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootStrapi_Admin_Users_Roles_LinksArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Users_Roles_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Users_Roles_Links_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Users_Roles_Links_Bool_Exp>;
};


export type Query_RootStrapi_Admin_Users_Roles_Links_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Users_Roles_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Users_Roles_Links_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Users_Roles_Links_Bool_Exp>;
};


export type Query_RootStrapi_FilesArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Files_Order_By>>;
  where?: InputMaybe<Strapi_Files_Bool_Exp>;
};


export type Query_RootStrapi_Files_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Files_Order_By>>;
  where?: InputMaybe<Strapi_Files_Bool_Exp>;
};


export type Query_RootStrapi_Files_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootStrapi_Files_Related_MorphsArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Files_Related_Morphs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Files_Related_Morphs_Order_By>>;
  where?: InputMaybe<Strapi_Files_Related_Morphs_Bool_Exp>;
};


export type Query_RootStrapi_Files_Related_Morphs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Files_Related_Morphs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Files_Related_Morphs_Order_By>>;
  where?: InputMaybe<Strapi_Files_Related_Morphs_Bool_Exp>;
};


export type Query_RootStrapi_I18n_LocaleArgs = {
  distinct_on?: InputMaybe<Array<Strapi_I18n_Locale_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_I18n_Locale_Order_By>>;
  where?: InputMaybe<Strapi_I18n_Locale_Bool_Exp>;
};


export type Query_RootStrapi_I18n_Locale_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_I18n_Locale_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_I18n_Locale_Order_By>>;
  where?: InputMaybe<Strapi_I18n_Locale_Bool_Exp>;
};


export type Query_RootStrapi_I18n_Locale_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootStrapi_Strapi_Api_TokensArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Api_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Api_Tokens_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Api_Tokens_Bool_Exp>;
};


export type Query_RootStrapi_Strapi_Api_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Api_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Api_Tokens_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Api_Tokens_Bool_Exp>;
};


export type Query_RootStrapi_Strapi_Api_Tokens_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootStrapi_Strapi_Core_Store_SettingsArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Core_Store_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Core_Store_Settings_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Core_Store_Settings_Bool_Exp>;
};


export type Query_RootStrapi_Strapi_Core_Store_Settings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Core_Store_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Core_Store_Settings_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Core_Store_Settings_Bool_Exp>;
};


export type Query_RootStrapi_Strapi_Core_Store_Settings_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootStrapi_Strapi_Database_SchemaArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Database_Schema_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Database_Schema_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Database_Schema_Bool_Exp>;
};


export type Query_RootStrapi_Strapi_Database_Schema_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Database_Schema_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Database_Schema_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Database_Schema_Bool_Exp>;
};


export type Query_RootStrapi_Strapi_Database_Schema_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootStrapi_Strapi_MigrationsArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Migrations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Migrations_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Migrations_Bool_Exp>;
};


export type Query_RootStrapi_Strapi_Migrations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Migrations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Migrations_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Migrations_Bool_Exp>;
};


export type Query_RootStrapi_Strapi_Migrations_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootStrapi_Strapi_WebhooksArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Webhooks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Webhooks_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Webhooks_Bool_Exp>;
};


export type Query_RootStrapi_Strapi_Webhooks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Webhooks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Webhooks_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Webhooks_Bool_Exp>;
};


export type Query_RootStrapi_Strapi_Webhooks_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootStrapi_Up_PermissionsArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Permissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Permissions_Order_By>>;
  where?: InputMaybe<Strapi_Up_Permissions_Bool_Exp>;
};


export type Query_RootStrapi_Up_Permissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Permissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Permissions_Order_By>>;
  where?: InputMaybe<Strapi_Up_Permissions_Bool_Exp>;
};


export type Query_RootStrapi_Up_Permissions_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootStrapi_Up_Permissions_Role_LinksArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Permissions_Role_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Permissions_Role_Links_Order_By>>;
  where?: InputMaybe<Strapi_Up_Permissions_Role_Links_Bool_Exp>;
};


export type Query_RootStrapi_Up_Permissions_Role_Links_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Permissions_Role_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Permissions_Role_Links_Order_By>>;
  where?: InputMaybe<Strapi_Up_Permissions_Role_Links_Bool_Exp>;
};


export type Query_RootStrapi_Up_RolesArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Roles_Order_By>>;
  where?: InputMaybe<Strapi_Up_Roles_Bool_Exp>;
};


export type Query_RootStrapi_Up_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Roles_Order_By>>;
  where?: InputMaybe<Strapi_Up_Roles_Bool_Exp>;
};


export type Query_RootStrapi_Up_Roles_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootStrapi_Up_UsersArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Users_Order_By>>;
  where?: InputMaybe<Strapi_Up_Users_Bool_Exp>;
};


export type Query_RootStrapi_Up_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Users_Order_By>>;
  where?: InputMaybe<Strapi_Up_Users_Bool_Exp>;
};


export type Query_RootStrapi_Up_Users_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootStrapi_Up_Users_Role_LinksArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Users_Role_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Users_Role_Links_Order_By>>;
  where?: InputMaybe<Strapi_Up_Users_Role_Links_Bool_Exp>;
};


export type Query_RootStrapi_Up_Users_Role_Links_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Users_Role_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Users_Role_Links_Order_By>>;
  where?: InputMaybe<Strapi_Up_Users_Role_Links_Bool_Exp>;
};

/** columns and relationships of "strapi.admin_permissions" */
export type Strapi_Admin_Permissions = {
  __typename?: 'strapi_admin_permissions';
  action?: Maybe<Scalars['String']>;
  conditions?: Maybe<Scalars['jsonb']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  properties?: Maybe<Scalars['jsonb']>;
  subject?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};


/** columns and relationships of "strapi.admin_permissions" */
export type Strapi_Admin_PermissionsConditionsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "strapi.admin_permissions" */
export type Strapi_Admin_PermissionsPropertiesArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "strapi.admin_permissions" */
export type Strapi_Admin_Permissions_Aggregate = {
  __typename?: 'strapi_admin_permissions_aggregate';
  aggregate?: Maybe<Strapi_Admin_Permissions_Aggregate_Fields>;
  nodes: Array<Strapi_Admin_Permissions>;
};

/** aggregate fields of "strapi.admin_permissions" */
export type Strapi_Admin_Permissions_Aggregate_Fields = {
  __typename?: 'strapi_admin_permissions_aggregate_fields';
  avg?: Maybe<Strapi_Admin_Permissions_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Admin_Permissions_Max_Fields>;
  min?: Maybe<Strapi_Admin_Permissions_Min_Fields>;
  stddev?: Maybe<Strapi_Admin_Permissions_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Admin_Permissions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Admin_Permissions_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Admin_Permissions_Sum_Fields>;
  var_pop?: Maybe<Strapi_Admin_Permissions_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Admin_Permissions_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Admin_Permissions_Variance_Fields>;
};


/** aggregate fields of "strapi.admin_permissions" */
export type Strapi_Admin_Permissions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Admin_Permissions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Strapi_Admin_Permissions_Append_Input = {
  conditions?: InputMaybe<Scalars['jsonb']>;
  properties?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Strapi_Admin_Permissions_Avg_Fields = {
  __typename?: 'strapi_admin_permissions_avg_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.admin_permissions". All fields are combined with a logical 'AND'. */
export type Strapi_Admin_Permissions_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Admin_Permissions_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Admin_Permissions_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Admin_Permissions_Bool_Exp>>;
  action?: InputMaybe<String_Comparison_Exp>;
  conditions?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  created_by_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  properties?: InputMaybe<Jsonb_Comparison_Exp>;
  subject?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  updated_by_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "strapi.admin_permissions" */
export enum Strapi_Admin_Permissions_Constraint {
  /** unique or primary key constraint on columns "id" */
  AdminPermissionsPkey = 'admin_permissions_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Strapi_Admin_Permissions_Delete_At_Path_Input = {
  conditions?: InputMaybe<Array<Scalars['String']>>;
  properties?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Strapi_Admin_Permissions_Delete_Elem_Input = {
  conditions?: InputMaybe<Scalars['Int']>;
  properties?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Strapi_Admin_Permissions_Delete_Key_Input = {
  conditions?: InputMaybe<Scalars['String']>;
  properties?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "strapi.admin_permissions" */
export type Strapi_Admin_Permissions_Inc_Input = {
  created_by_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.admin_permissions" */
export type Strapi_Admin_Permissions_Insert_Input = {
  action?: InputMaybe<Scalars['String']>;
  conditions?: InputMaybe<Scalars['jsonb']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  properties?: InputMaybe<Scalars['jsonb']>;
  subject?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Strapi_Admin_Permissions_Max_Fields = {
  __typename?: 'strapi_admin_permissions_max_fields';
  action?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  subject?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Strapi_Admin_Permissions_Min_Fields = {
  __typename?: 'strapi_admin_permissions_min_fields';
  action?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  subject?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "strapi.admin_permissions" */
export type Strapi_Admin_Permissions_Mutation_Response = {
  __typename?: 'strapi_admin_permissions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Admin_Permissions>;
};

/** on_conflict condition type for table "strapi.admin_permissions" */
export type Strapi_Admin_Permissions_On_Conflict = {
  constraint: Strapi_Admin_Permissions_Constraint;
  update_columns?: Array<Strapi_Admin_Permissions_Update_Column>;
  where?: InputMaybe<Strapi_Admin_Permissions_Bool_Exp>;
};

/** Ordering options when selecting data from "strapi.admin_permissions". */
export type Strapi_Admin_Permissions_Order_By = {
  action?: InputMaybe<Order_By>;
  conditions?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  properties?: InputMaybe<Order_By>;
  subject?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_by_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: strapi_admin_permissions */
export type Strapi_Admin_Permissions_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Strapi_Admin_Permissions_Prepend_Input = {
  conditions?: InputMaybe<Scalars['jsonb']>;
  properties?: InputMaybe<Scalars['jsonb']>;
};

/** columns and relationships of "strapi.admin_permissions_role_links" */
export type Strapi_Admin_Permissions_Role_Links = {
  __typename?: 'strapi_admin_permissions_role_links';
  permission_id?: Maybe<Scalars['Int']>;
  role_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "strapi.admin_permissions_role_links" */
export type Strapi_Admin_Permissions_Role_Links_Aggregate = {
  __typename?: 'strapi_admin_permissions_role_links_aggregate';
  aggregate?: Maybe<Strapi_Admin_Permissions_Role_Links_Aggregate_Fields>;
  nodes: Array<Strapi_Admin_Permissions_Role_Links>;
};

/** aggregate fields of "strapi.admin_permissions_role_links" */
export type Strapi_Admin_Permissions_Role_Links_Aggregate_Fields = {
  __typename?: 'strapi_admin_permissions_role_links_aggregate_fields';
  avg?: Maybe<Strapi_Admin_Permissions_Role_Links_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Admin_Permissions_Role_Links_Max_Fields>;
  min?: Maybe<Strapi_Admin_Permissions_Role_Links_Min_Fields>;
  stddev?: Maybe<Strapi_Admin_Permissions_Role_Links_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Admin_Permissions_Role_Links_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Admin_Permissions_Role_Links_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Admin_Permissions_Role_Links_Sum_Fields>;
  var_pop?: Maybe<Strapi_Admin_Permissions_Role_Links_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Admin_Permissions_Role_Links_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Admin_Permissions_Role_Links_Variance_Fields>;
};


/** aggregate fields of "strapi.admin_permissions_role_links" */
export type Strapi_Admin_Permissions_Role_Links_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Admin_Permissions_Role_Links_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_Admin_Permissions_Role_Links_Avg_Fields = {
  __typename?: 'strapi_admin_permissions_role_links_avg_fields';
  permission_id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.admin_permissions_role_links". All fields are combined with a logical 'AND'. */
export type Strapi_Admin_Permissions_Role_Links_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Admin_Permissions_Role_Links_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Admin_Permissions_Role_Links_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Admin_Permissions_Role_Links_Bool_Exp>>;
  permission_id?: InputMaybe<Int_Comparison_Exp>;
  role_id?: InputMaybe<Int_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "strapi.admin_permissions_role_links" */
export type Strapi_Admin_Permissions_Role_Links_Inc_Input = {
  permission_id?: InputMaybe<Scalars['Int']>;
  role_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.admin_permissions_role_links" */
export type Strapi_Admin_Permissions_Role_Links_Insert_Input = {
  permission_id?: InputMaybe<Scalars['Int']>;
  role_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Strapi_Admin_Permissions_Role_Links_Max_Fields = {
  __typename?: 'strapi_admin_permissions_role_links_max_fields';
  permission_id?: Maybe<Scalars['Int']>;
  role_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Strapi_Admin_Permissions_Role_Links_Min_Fields = {
  __typename?: 'strapi_admin_permissions_role_links_min_fields';
  permission_id?: Maybe<Scalars['Int']>;
  role_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "strapi.admin_permissions_role_links" */
export type Strapi_Admin_Permissions_Role_Links_Mutation_Response = {
  __typename?: 'strapi_admin_permissions_role_links_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Admin_Permissions_Role_Links>;
};

/** Ordering options when selecting data from "strapi.admin_permissions_role_links". */
export type Strapi_Admin_Permissions_Role_Links_Order_By = {
  permission_id?: InputMaybe<Order_By>;
  role_id?: InputMaybe<Order_By>;
};

/** select columns of table "strapi.admin_permissions_role_links" */
export enum Strapi_Admin_Permissions_Role_Links_Select_Column {
  /** column name */
  PermissionId = 'permission_id',
  /** column name */
  RoleId = 'role_id'
}

/** input type for updating data in table "strapi.admin_permissions_role_links" */
export type Strapi_Admin_Permissions_Role_Links_Set_Input = {
  permission_id?: InputMaybe<Scalars['Int']>;
  role_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Strapi_Admin_Permissions_Role_Links_Stddev_Fields = {
  __typename?: 'strapi_admin_permissions_role_links_stddev_fields';
  permission_id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Admin_Permissions_Role_Links_Stddev_Pop_Fields = {
  __typename?: 'strapi_admin_permissions_role_links_stddev_pop_fields';
  permission_id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Admin_Permissions_Role_Links_Stddev_Samp_Fields = {
  __typename?: 'strapi_admin_permissions_role_links_stddev_samp_fields';
  permission_id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Admin_Permissions_Role_Links_Sum_Fields = {
  __typename?: 'strapi_admin_permissions_role_links_sum_fields';
  permission_id?: Maybe<Scalars['Int']>;
  role_id?: Maybe<Scalars['Int']>;
};

export type Strapi_Admin_Permissions_Role_Links_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Admin_Permissions_Role_Links_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Admin_Permissions_Role_Links_Set_Input>;
  where: Strapi_Admin_Permissions_Role_Links_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Admin_Permissions_Role_Links_Var_Pop_Fields = {
  __typename?: 'strapi_admin_permissions_role_links_var_pop_fields';
  permission_id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Admin_Permissions_Role_Links_Var_Samp_Fields = {
  __typename?: 'strapi_admin_permissions_role_links_var_samp_fields';
  permission_id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Admin_Permissions_Role_Links_Variance_Fields = {
  __typename?: 'strapi_admin_permissions_role_links_variance_fields';
  permission_id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** select columns of table "strapi.admin_permissions" */
export enum Strapi_Admin_Permissions_Select_Column {
  /** column name */
  Action = 'action',
  /** column name */
  Conditions = 'conditions',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Id = 'id',
  /** column name */
  Properties = 'properties',
  /** column name */
  Subject = 'subject',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id'
}

/** input type for updating data in table "strapi.admin_permissions" */
export type Strapi_Admin_Permissions_Set_Input = {
  action?: InputMaybe<Scalars['String']>;
  conditions?: InputMaybe<Scalars['jsonb']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  properties?: InputMaybe<Scalars['jsonb']>;
  subject?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Strapi_Admin_Permissions_Stddev_Fields = {
  __typename?: 'strapi_admin_permissions_stddev_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Admin_Permissions_Stddev_Pop_Fields = {
  __typename?: 'strapi_admin_permissions_stddev_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Admin_Permissions_Stddev_Samp_Fields = {
  __typename?: 'strapi_admin_permissions_stddev_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Admin_Permissions_Sum_Fields = {
  __typename?: 'strapi_admin_permissions_sum_fields';
  created_by_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "strapi.admin_permissions" */
export enum Strapi_Admin_Permissions_Update_Column {
  /** column name */
  Action = 'action',
  /** column name */
  Conditions = 'conditions',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Id = 'id',
  /** column name */
  Properties = 'properties',
  /** column name */
  Subject = 'subject',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id'
}

export type Strapi_Admin_Permissions_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Strapi_Admin_Permissions_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Strapi_Admin_Permissions_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Strapi_Admin_Permissions_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Strapi_Admin_Permissions_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Admin_Permissions_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Strapi_Admin_Permissions_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Admin_Permissions_Set_Input>;
  where: Strapi_Admin_Permissions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Admin_Permissions_Var_Pop_Fields = {
  __typename?: 'strapi_admin_permissions_var_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Admin_Permissions_Var_Samp_Fields = {
  __typename?: 'strapi_admin_permissions_var_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Admin_Permissions_Variance_Fields = {
  __typename?: 'strapi_admin_permissions_variance_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "strapi.admin_roles" */
export type Strapi_Admin_Roles = {
  __typename?: 'strapi_admin_roles';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "strapi.admin_roles" */
export type Strapi_Admin_Roles_Aggregate = {
  __typename?: 'strapi_admin_roles_aggregate';
  aggregate?: Maybe<Strapi_Admin_Roles_Aggregate_Fields>;
  nodes: Array<Strapi_Admin_Roles>;
};

/** aggregate fields of "strapi.admin_roles" */
export type Strapi_Admin_Roles_Aggregate_Fields = {
  __typename?: 'strapi_admin_roles_aggregate_fields';
  avg?: Maybe<Strapi_Admin_Roles_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Admin_Roles_Max_Fields>;
  min?: Maybe<Strapi_Admin_Roles_Min_Fields>;
  stddev?: Maybe<Strapi_Admin_Roles_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Admin_Roles_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Admin_Roles_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Admin_Roles_Sum_Fields>;
  var_pop?: Maybe<Strapi_Admin_Roles_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Admin_Roles_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Admin_Roles_Variance_Fields>;
};


/** aggregate fields of "strapi.admin_roles" */
export type Strapi_Admin_Roles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Admin_Roles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_Admin_Roles_Avg_Fields = {
  __typename?: 'strapi_admin_roles_avg_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.admin_roles". All fields are combined with a logical 'AND'. */
export type Strapi_Admin_Roles_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Admin_Roles_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Admin_Roles_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Admin_Roles_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  created_by_id?: InputMaybe<Int_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  updated_by_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "strapi.admin_roles" */
export enum Strapi_Admin_Roles_Constraint {
  /** unique or primary key constraint on columns "id" */
  AdminRolesPkey = 'admin_roles_pkey'
}

/** input type for incrementing numeric columns in table "strapi.admin_roles" */
export type Strapi_Admin_Roles_Inc_Input = {
  created_by_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.admin_roles" */
export type Strapi_Admin_Roles_Insert_Input = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Strapi_Admin_Roles_Max_Fields = {
  __typename?: 'strapi_admin_roles_max_fields';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Strapi_Admin_Roles_Min_Fields = {
  __typename?: 'strapi_admin_roles_min_fields';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "strapi.admin_roles" */
export type Strapi_Admin_Roles_Mutation_Response = {
  __typename?: 'strapi_admin_roles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Admin_Roles>;
};

/** on_conflict condition type for table "strapi.admin_roles" */
export type Strapi_Admin_Roles_On_Conflict = {
  constraint: Strapi_Admin_Roles_Constraint;
  update_columns?: Array<Strapi_Admin_Roles_Update_Column>;
  where?: InputMaybe<Strapi_Admin_Roles_Bool_Exp>;
};

/** Ordering options when selecting data from "strapi.admin_roles". */
export type Strapi_Admin_Roles_Order_By = {
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_by_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: strapi_admin_roles */
export type Strapi_Admin_Roles_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "strapi.admin_roles" */
export enum Strapi_Admin_Roles_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id'
}

/** input type for updating data in table "strapi.admin_roles" */
export type Strapi_Admin_Roles_Set_Input = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Strapi_Admin_Roles_Stddev_Fields = {
  __typename?: 'strapi_admin_roles_stddev_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Admin_Roles_Stddev_Pop_Fields = {
  __typename?: 'strapi_admin_roles_stddev_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Admin_Roles_Stddev_Samp_Fields = {
  __typename?: 'strapi_admin_roles_stddev_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Admin_Roles_Sum_Fields = {
  __typename?: 'strapi_admin_roles_sum_fields';
  created_by_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "strapi.admin_roles" */
export enum Strapi_Admin_Roles_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id'
}

export type Strapi_Admin_Roles_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Admin_Roles_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Admin_Roles_Set_Input>;
  where: Strapi_Admin_Roles_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Admin_Roles_Var_Pop_Fields = {
  __typename?: 'strapi_admin_roles_var_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Admin_Roles_Var_Samp_Fields = {
  __typename?: 'strapi_admin_roles_var_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Admin_Roles_Variance_Fields = {
  __typename?: 'strapi_admin_roles_variance_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "strapi.admin_users" */
export type Strapi_Admin_Users = {
  __typename?: 'strapi_admin_users';
  blocked?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  is_active?: Maybe<Scalars['Boolean']>;
  lastname?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  prefered_language?: Maybe<Scalars['String']>;
  registration_token?: Maybe<Scalars['String']>;
  reset_password_token?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregated selection of "strapi.admin_users" */
export type Strapi_Admin_Users_Aggregate = {
  __typename?: 'strapi_admin_users_aggregate';
  aggregate?: Maybe<Strapi_Admin_Users_Aggregate_Fields>;
  nodes: Array<Strapi_Admin_Users>;
};

/** aggregate fields of "strapi.admin_users" */
export type Strapi_Admin_Users_Aggregate_Fields = {
  __typename?: 'strapi_admin_users_aggregate_fields';
  avg?: Maybe<Strapi_Admin_Users_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Admin_Users_Max_Fields>;
  min?: Maybe<Strapi_Admin_Users_Min_Fields>;
  stddev?: Maybe<Strapi_Admin_Users_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Admin_Users_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Admin_Users_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Admin_Users_Sum_Fields>;
  var_pop?: Maybe<Strapi_Admin_Users_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Admin_Users_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Admin_Users_Variance_Fields>;
};


/** aggregate fields of "strapi.admin_users" */
export type Strapi_Admin_Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Admin_Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_Admin_Users_Avg_Fields = {
  __typename?: 'strapi_admin_users_avg_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.admin_users". All fields are combined with a logical 'AND'. */
export type Strapi_Admin_Users_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Admin_Users_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Admin_Users_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Admin_Users_Bool_Exp>>;
  blocked?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  created_by_id?: InputMaybe<Int_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  firstname?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  lastname?: InputMaybe<String_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  prefered_language?: InputMaybe<String_Comparison_Exp>;
  registration_token?: InputMaybe<String_Comparison_Exp>;
  reset_password_token?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  updated_by_id?: InputMaybe<Int_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "strapi.admin_users" */
export enum Strapi_Admin_Users_Constraint {
  /** unique or primary key constraint on columns "id" */
  AdminUsersPkey = 'admin_users_pkey'
}

/** input type for incrementing numeric columns in table "strapi.admin_users" */
export type Strapi_Admin_Users_Inc_Input = {
  created_by_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.admin_users" */
export type Strapi_Admin_Users_Insert_Input = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  lastname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  prefered_language?: InputMaybe<Scalars['String']>;
  registration_token?: InputMaybe<Scalars['String']>;
  reset_password_token?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Strapi_Admin_Users_Max_Fields = {
  __typename?: 'strapi_admin_users_max_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lastname?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  prefered_language?: Maybe<Scalars['String']>;
  registration_token?: Maybe<Scalars['String']>;
  reset_password_token?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Strapi_Admin_Users_Min_Fields = {
  __typename?: 'strapi_admin_users_min_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lastname?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  prefered_language?: Maybe<Scalars['String']>;
  registration_token?: Maybe<Scalars['String']>;
  reset_password_token?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "strapi.admin_users" */
export type Strapi_Admin_Users_Mutation_Response = {
  __typename?: 'strapi_admin_users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Admin_Users>;
};

/** on_conflict condition type for table "strapi.admin_users" */
export type Strapi_Admin_Users_On_Conflict = {
  constraint: Strapi_Admin_Users_Constraint;
  update_columns?: Array<Strapi_Admin_Users_Update_Column>;
  where?: InputMaybe<Strapi_Admin_Users_Bool_Exp>;
};

/** Ordering options when selecting data from "strapi.admin_users". */
export type Strapi_Admin_Users_Order_By = {
  blocked?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by_id?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  firstname?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  lastname?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  prefered_language?: InputMaybe<Order_By>;
  registration_token?: InputMaybe<Order_By>;
  reset_password_token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_by_id?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** primary key columns input for table: strapi_admin_users */
export type Strapi_Admin_Users_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** columns and relationships of "strapi.admin_users_roles_links" */
export type Strapi_Admin_Users_Roles_Links = {
  __typename?: 'strapi_admin_users_roles_links';
  role_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "strapi.admin_users_roles_links" */
export type Strapi_Admin_Users_Roles_Links_Aggregate = {
  __typename?: 'strapi_admin_users_roles_links_aggregate';
  aggregate?: Maybe<Strapi_Admin_Users_Roles_Links_Aggregate_Fields>;
  nodes: Array<Strapi_Admin_Users_Roles_Links>;
};

/** aggregate fields of "strapi.admin_users_roles_links" */
export type Strapi_Admin_Users_Roles_Links_Aggregate_Fields = {
  __typename?: 'strapi_admin_users_roles_links_aggregate_fields';
  avg?: Maybe<Strapi_Admin_Users_Roles_Links_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Admin_Users_Roles_Links_Max_Fields>;
  min?: Maybe<Strapi_Admin_Users_Roles_Links_Min_Fields>;
  stddev?: Maybe<Strapi_Admin_Users_Roles_Links_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Admin_Users_Roles_Links_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Admin_Users_Roles_Links_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Admin_Users_Roles_Links_Sum_Fields>;
  var_pop?: Maybe<Strapi_Admin_Users_Roles_Links_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Admin_Users_Roles_Links_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Admin_Users_Roles_Links_Variance_Fields>;
};


/** aggregate fields of "strapi.admin_users_roles_links" */
export type Strapi_Admin_Users_Roles_Links_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Admin_Users_Roles_Links_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_Admin_Users_Roles_Links_Avg_Fields = {
  __typename?: 'strapi_admin_users_roles_links_avg_fields';
  role_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.admin_users_roles_links". All fields are combined with a logical 'AND'. */
export type Strapi_Admin_Users_Roles_Links_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Admin_Users_Roles_Links_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Admin_Users_Roles_Links_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Admin_Users_Roles_Links_Bool_Exp>>;
  role_id?: InputMaybe<Int_Comparison_Exp>;
  user_id?: InputMaybe<Int_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "strapi.admin_users_roles_links" */
export type Strapi_Admin_Users_Roles_Links_Inc_Input = {
  role_id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.admin_users_roles_links" */
export type Strapi_Admin_Users_Roles_Links_Insert_Input = {
  role_id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Strapi_Admin_Users_Roles_Links_Max_Fields = {
  __typename?: 'strapi_admin_users_roles_links_max_fields';
  role_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Strapi_Admin_Users_Roles_Links_Min_Fields = {
  __typename?: 'strapi_admin_users_roles_links_min_fields';
  role_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "strapi.admin_users_roles_links" */
export type Strapi_Admin_Users_Roles_Links_Mutation_Response = {
  __typename?: 'strapi_admin_users_roles_links_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Admin_Users_Roles_Links>;
};

/** Ordering options when selecting data from "strapi.admin_users_roles_links". */
export type Strapi_Admin_Users_Roles_Links_Order_By = {
  role_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "strapi.admin_users_roles_links" */
export enum Strapi_Admin_Users_Roles_Links_Select_Column {
  /** column name */
  RoleId = 'role_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "strapi.admin_users_roles_links" */
export type Strapi_Admin_Users_Roles_Links_Set_Input = {
  role_id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Strapi_Admin_Users_Roles_Links_Stddev_Fields = {
  __typename?: 'strapi_admin_users_roles_links_stddev_fields';
  role_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Admin_Users_Roles_Links_Stddev_Pop_Fields = {
  __typename?: 'strapi_admin_users_roles_links_stddev_pop_fields';
  role_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Admin_Users_Roles_Links_Stddev_Samp_Fields = {
  __typename?: 'strapi_admin_users_roles_links_stddev_samp_fields';
  role_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Admin_Users_Roles_Links_Sum_Fields = {
  __typename?: 'strapi_admin_users_roles_links_sum_fields';
  role_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type Strapi_Admin_Users_Roles_Links_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Admin_Users_Roles_Links_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Admin_Users_Roles_Links_Set_Input>;
  where: Strapi_Admin_Users_Roles_Links_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Admin_Users_Roles_Links_Var_Pop_Fields = {
  __typename?: 'strapi_admin_users_roles_links_var_pop_fields';
  role_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Admin_Users_Roles_Links_Var_Samp_Fields = {
  __typename?: 'strapi_admin_users_roles_links_var_samp_fields';
  role_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Admin_Users_Roles_Links_Variance_Fields = {
  __typename?: 'strapi_admin_users_roles_links_variance_fields';
  role_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** select columns of table "strapi.admin_users" */
export enum Strapi_Admin_Users_Select_Column {
  /** column name */
  Blocked = 'blocked',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Email = 'email',
  /** column name */
  Firstname = 'firstname',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Lastname = 'lastname',
  /** column name */
  Password = 'password',
  /** column name */
  PreferedLanguage = 'prefered_language',
  /** column name */
  RegistrationToken = 'registration_token',
  /** column name */
  ResetPasswordToken = 'reset_password_token',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "strapi.admin_users" */
export type Strapi_Admin_Users_Set_Input = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  is_active?: InputMaybe<Scalars['Boolean']>;
  lastname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  prefered_language?: InputMaybe<Scalars['String']>;
  registration_token?: InputMaybe<Scalars['String']>;
  reset_password_token?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Strapi_Admin_Users_Stddev_Fields = {
  __typename?: 'strapi_admin_users_stddev_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Admin_Users_Stddev_Pop_Fields = {
  __typename?: 'strapi_admin_users_stddev_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Admin_Users_Stddev_Samp_Fields = {
  __typename?: 'strapi_admin_users_stddev_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Admin_Users_Sum_Fields = {
  __typename?: 'strapi_admin_users_sum_fields';
  created_by_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "strapi.admin_users" */
export enum Strapi_Admin_Users_Update_Column {
  /** column name */
  Blocked = 'blocked',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Email = 'email',
  /** column name */
  Firstname = 'firstname',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Lastname = 'lastname',
  /** column name */
  Password = 'password',
  /** column name */
  PreferedLanguage = 'prefered_language',
  /** column name */
  RegistrationToken = 'registration_token',
  /** column name */
  ResetPasswordToken = 'reset_password_token',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id',
  /** column name */
  Username = 'username'
}

export type Strapi_Admin_Users_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Admin_Users_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Admin_Users_Set_Input>;
  where: Strapi_Admin_Users_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Admin_Users_Var_Pop_Fields = {
  __typename?: 'strapi_admin_users_var_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Admin_Users_Var_Samp_Fields = {
  __typename?: 'strapi_admin_users_var_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Admin_Users_Variance_Fields = {
  __typename?: 'strapi_admin_users_variance_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "strapi.files" */
export type Strapi_Files = {
  __typename?: 'strapi_files';
  alternative_text?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  ext?: Maybe<Scalars['String']>;
  folder_path?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['jsonb']>;
  hash?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  mime?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  preview_url?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  provider_metadata?: Maybe<Scalars['jsonb']>;
  size?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};


/** columns and relationships of "strapi.files" */
export type Strapi_FilesFormatsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "strapi.files" */
export type Strapi_FilesProvider_MetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "strapi.files" */
export type Strapi_Files_Aggregate = {
  __typename?: 'strapi_files_aggregate';
  aggregate?: Maybe<Strapi_Files_Aggregate_Fields>;
  nodes: Array<Strapi_Files>;
};

/** aggregate fields of "strapi.files" */
export type Strapi_Files_Aggregate_Fields = {
  __typename?: 'strapi_files_aggregate_fields';
  avg?: Maybe<Strapi_Files_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Files_Max_Fields>;
  min?: Maybe<Strapi_Files_Min_Fields>;
  stddev?: Maybe<Strapi_Files_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Files_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Files_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Files_Sum_Fields>;
  var_pop?: Maybe<Strapi_Files_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Files_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Files_Variance_Fields>;
};


/** aggregate fields of "strapi.files" */
export type Strapi_Files_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Files_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Strapi_Files_Append_Input = {
  formats?: InputMaybe<Scalars['jsonb']>;
  provider_metadata?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Strapi_Files_Avg_Fields = {
  __typename?: 'strapi_files_avg_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.files". All fields are combined with a logical 'AND'. */
export type Strapi_Files_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Files_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Files_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Files_Bool_Exp>>;
  alternative_text?: InputMaybe<String_Comparison_Exp>;
  caption?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  created_by_id?: InputMaybe<Int_Comparison_Exp>;
  ext?: InputMaybe<String_Comparison_Exp>;
  folder_path?: InputMaybe<String_Comparison_Exp>;
  formats?: InputMaybe<Jsonb_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  height?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  mime?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  preview_url?: InputMaybe<String_Comparison_Exp>;
  provider?: InputMaybe<String_Comparison_Exp>;
  provider_metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  size?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  updated_by_id?: InputMaybe<Int_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
  width?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "strapi.files" */
export enum Strapi_Files_Constraint {
  /** unique or primary key constraint on columns "id" */
  FilesPkey = 'files_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Strapi_Files_Delete_At_Path_Input = {
  formats?: InputMaybe<Array<Scalars['String']>>;
  provider_metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Strapi_Files_Delete_Elem_Input = {
  formats?: InputMaybe<Scalars['Int']>;
  provider_metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Strapi_Files_Delete_Key_Input = {
  formats?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "strapi.files" */
export type Strapi_Files_Inc_Input = {
  created_by_id?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['numeric']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.files" */
export type Strapi_Files_Insert_Input = {
  alternative_text?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  ext?: InputMaybe<Scalars['String']>;
  folder_path?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['jsonb']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  preview_url?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['jsonb']>;
  size?: InputMaybe<Scalars['numeric']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Strapi_Files_Max_Fields = {
  __typename?: 'strapi_files_max_fields';
  alternative_text?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  ext?: Maybe<Scalars['String']>;
  folder_path?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  mime?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  preview_url?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Strapi_Files_Min_Fields = {
  __typename?: 'strapi_files_min_fields';
  alternative_text?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  ext?: Maybe<Scalars['String']>;
  folder_path?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  mime?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  preview_url?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "strapi.files" */
export type Strapi_Files_Mutation_Response = {
  __typename?: 'strapi_files_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Files>;
};

/** on_conflict condition type for table "strapi.files" */
export type Strapi_Files_On_Conflict = {
  constraint: Strapi_Files_Constraint;
  update_columns?: Array<Strapi_Files_Update_Column>;
  where?: InputMaybe<Strapi_Files_Bool_Exp>;
};

/** Ordering options when selecting data from "strapi.files". */
export type Strapi_Files_Order_By = {
  alternative_text?: InputMaybe<Order_By>;
  caption?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by_id?: InputMaybe<Order_By>;
  ext?: InputMaybe<Order_By>;
  folder_path?: InputMaybe<Order_By>;
  formats?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mime?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  preview_url?: InputMaybe<Order_By>;
  provider?: InputMaybe<Order_By>;
  provider_metadata?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_by_id?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** primary key columns input for table: strapi_files */
export type Strapi_Files_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Strapi_Files_Prepend_Input = {
  formats?: InputMaybe<Scalars['jsonb']>;
  provider_metadata?: InputMaybe<Scalars['jsonb']>;
};

/** columns and relationships of "strapi.files_related_morphs" */
export type Strapi_Files_Related_Morphs = {
  __typename?: 'strapi_files_related_morphs';
  field?: Maybe<Scalars['String']>;
  file_id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
  related_id?: Maybe<Scalars['Int']>;
  related_type?: Maybe<Scalars['String']>;
};

/** aggregated selection of "strapi.files_related_morphs" */
export type Strapi_Files_Related_Morphs_Aggregate = {
  __typename?: 'strapi_files_related_morphs_aggregate';
  aggregate?: Maybe<Strapi_Files_Related_Morphs_Aggregate_Fields>;
  nodes: Array<Strapi_Files_Related_Morphs>;
};

/** aggregate fields of "strapi.files_related_morphs" */
export type Strapi_Files_Related_Morphs_Aggregate_Fields = {
  __typename?: 'strapi_files_related_morphs_aggregate_fields';
  avg?: Maybe<Strapi_Files_Related_Morphs_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Files_Related_Morphs_Max_Fields>;
  min?: Maybe<Strapi_Files_Related_Morphs_Min_Fields>;
  stddev?: Maybe<Strapi_Files_Related_Morphs_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Files_Related_Morphs_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Files_Related_Morphs_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Files_Related_Morphs_Sum_Fields>;
  var_pop?: Maybe<Strapi_Files_Related_Morphs_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Files_Related_Morphs_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Files_Related_Morphs_Variance_Fields>;
};


/** aggregate fields of "strapi.files_related_morphs" */
export type Strapi_Files_Related_Morphs_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Files_Related_Morphs_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_Files_Related_Morphs_Avg_Fields = {
  __typename?: 'strapi_files_related_morphs_avg_fields';
  file_id?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
  related_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.files_related_morphs". All fields are combined with a logical 'AND'. */
export type Strapi_Files_Related_Morphs_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Files_Related_Morphs_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Files_Related_Morphs_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Files_Related_Morphs_Bool_Exp>>;
  field?: InputMaybe<String_Comparison_Exp>;
  file_id?: InputMaybe<Int_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  related_id?: InputMaybe<Int_Comparison_Exp>;
  related_type?: InputMaybe<String_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "strapi.files_related_morphs" */
export type Strapi_Files_Related_Morphs_Inc_Input = {
  file_id?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['Int']>;
  related_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.files_related_morphs" */
export type Strapi_Files_Related_Morphs_Insert_Input = {
  field?: InputMaybe<Scalars['String']>;
  file_id?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['Int']>;
  related_id?: InputMaybe<Scalars['Int']>;
  related_type?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Strapi_Files_Related_Morphs_Max_Fields = {
  __typename?: 'strapi_files_related_morphs_max_fields';
  field?: Maybe<Scalars['String']>;
  file_id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
  related_id?: Maybe<Scalars['Int']>;
  related_type?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Strapi_Files_Related_Morphs_Min_Fields = {
  __typename?: 'strapi_files_related_morphs_min_fields';
  field?: Maybe<Scalars['String']>;
  file_id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
  related_id?: Maybe<Scalars['Int']>;
  related_type?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "strapi.files_related_morphs" */
export type Strapi_Files_Related_Morphs_Mutation_Response = {
  __typename?: 'strapi_files_related_morphs_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Files_Related_Morphs>;
};

/** Ordering options when selecting data from "strapi.files_related_morphs". */
export type Strapi_Files_Related_Morphs_Order_By = {
  field?: InputMaybe<Order_By>;
  file_id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  related_id?: InputMaybe<Order_By>;
  related_type?: InputMaybe<Order_By>;
};

/** select columns of table "strapi.files_related_morphs" */
export enum Strapi_Files_Related_Morphs_Select_Column {
  /** column name */
  Field = 'field',
  /** column name */
  FileId = 'file_id',
  /** column name */
  Order = 'order',
  /** column name */
  RelatedId = 'related_id',
  /** column name */
  RelatedType = 'related_type'
}

/** input type for updating data in table "strapi.files_related_morphs" */
export type Strapi_Files_Related_Morphs_Set_Input = {
  field?: InputMaybe<Scalars['String']>;
  file_id?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['Int']>;
  related_id?: InputMaybe<Scalars['Int']>;
  related_type?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Strapi_Files_Related_Morphs_Stddev_Fields = {
  __typename?: 'strapi_files_related_morphs_stddev_fields';
  file_id?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
  related_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Files_Related_Morphs_Stddev_Pop_Fields = {
  __typename?: 'strapi_files_related_morphs_stddev_pop_fields';
  file_id?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
  related_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Files_Related_Morphs_Stddev_Samp_Fields = {
  __typename?: 'strapi_files_related_morphs_stddev_samp_fields';
  file_id?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
  related_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Files_Related_Morphs_Sum_Fields = {
  __typename?: 'strapi_files_related_morphs_sum_fields';
  file_id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
  related_id?: Maybe<Scalars['Int']>;
};

export type Strapi_Files_Related_Morphs_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Files_Related_Morphs_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Files_Related_Morphs_Set_Input>;
  where: Strapi_Files_Related_Morphs_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Files_Related_Morphs_Var_Pop_Fields = {
  __typename?: 'strapi_files_related_morphs_var_pop_fields';
  file_id?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
  related_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Files_Related_Morphs_Var_Samp_Fields = {
  __typename?: 'strapi_files_related_morphs_var_samp_fields';
  file_id?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
  related_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Files_Related_Morphs_Variance_Fields = {
  __typename?: 'strapi_files_related_morphs_variance_fields';
  file_id?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
  related_id?: Maybe<Scalars['Float']>;
};

/** select columns of table "strapi.files" */
export enum Strapi_Files_Select_Column {
  /** column name */
  AlternativeText = 'alternative_text',
  /** column name */
  Caption = 'caption',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Ext = 'ext',
  /** column name */
  FolderPath = 'folder_path',
  /** column name */
  Formats = 'formats',
  /** column name */
  Hash = 'hash',
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  Mime = 'mime',
  /** column name */
  Name = 'name',
  /** column name */
  PreviewUrl = 'preview_url',
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderMetadata = 'provider_metadata',
  /** column name */
  Size = 'size',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id',
  /** column name */
  Url = 'url',
  /** column name */
  Width = 'width'
}

/** input type for updating data in table "strapi.files" */
export type Strapi_Files_Set_Input = {
  alternative_text?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  ext?: InputMaybe<Scalars['String']>;
  folder_path?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['jsonb']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  preview_url?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['jsonb']>;
  size?: InputMaybe<Scalars['numeric']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Strapi_Files_Stddev_Fields = {
  __typename?: 'strapi_files_stddev_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Files_Stddev_Pop_Fields = {
  __typename?: 'strapi_files_stddev_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Files_Stddev_Samp_Fields = {
  __typename?: 'strapi_files_stddev_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Files_Sum_Fields = {
  __typename?: 'strapi_files_sum_fields';
  created_by_id?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['numeric']>;
  updated_by_id?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

/** update columns of table "strapi.files" */
export enum Strapi_Files_Update_Column {
  /** column name */
  AlternativeText = 'alternative_text',
  /** column name */
  Caption = 'caption',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Ext = 'ext',
  /** column name */
  FolderPath = 'folder_path',
  /** column name */
  Formats = 'formats',
  /** column name */
  Hash = 'hash',
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  Mime = 'mime',
  /** column name */
  Name = 'name',
  /** column name */
  PreviewUrl = 'preview_url',
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderMetadata = 'provider_metadata',
  /** column name */
  Size = 'size',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id',
  /** column name */
  Url = 'url',
  /** column name */
  Width = 'width'
}

export type Strapi_Files_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Strapi_Files_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Strapi_Files_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Strapi_Files_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Strapi_Files_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Files_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Strapi_Files_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Files_Set_Input>;
  where: Strapi_Files_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Files_Var_Pop_Fields = {
  __typename?: 'strapi_files_var_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Files_Var_Samp_Fields = {
  __typename?: 'strapi_files_var_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Files_Variance_Fields = {
  __typename?: 'strapi_files_variance_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "strapi.i18n_locale" */
export type Strapi_I18n_Locale = {
  __typename?: 'strapi_i18n_locale';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "strapi.i18n_locale" */
export type Strapi_I18n_Locale_Aggregate = {
  __typename?: 'strapi_i18n_locale_aggregate';
  aggregate?: Maybe<Strapi_I18n_Locale_Aggregate_Fields>;
  nodes: Array<Strapi_I18n_Locale>;
};

/** aggregate fields of "strapi.i18n_locale" */
export type Strapi_I18n_Locale_Aggregate_Fields = {
  __typename?: 'strapi_i18n_locale_aggregate_fields';
  avg?: Maybe<Strapi_I18n_Locale_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_I18n_Locale_Max_Fields>;
  min?: Maybe<Strapi_I18n_Locale_Min_Fields>;
  stddev?: Maybe<Strapi_I18n_Locale_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_I18n_Locale_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_I18n_Locale_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_I18n_Locale_Sum_Fields>;
  var_pop?: Maybe<Strapi_I18n_Locale_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_I18n_Locale_Var_Samp_Fields>;
  variance?: Maybe<Strapi_I18n_Locale_Variance_Fields>;
};


/** aggregate fields of "strapi.i18n_locale" */
export type Strapi_I18n_Locale_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_I18n_Locale_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_I18n_Locale_Avg_Fields = {
  __typename?: 'strapi_i18n_locale_avg_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.i18n_locale". All fields are combined with a logical 'AND'. */
export type Strapi_I18n_Locale_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_I18n_Locale_Bool_Exp>>;
  _not?: InputMaybe<Strapi_I18n_Locale_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_I18n_Locale_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  created_by_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  updated_by_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "strapi.i18n_locale" */
export enum Strapi_I18n_Locale_Constraint {
  /** unique or primary key constraint on columns "id" */
  I18nLocalePkey = 'i18n_locale_pkey'
}

/** input type for incrementing numeric columns in table "strapi.i18n_locale" */
export type Strapi_I18n_Locale_Inc_Input = {
  created_by_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.i18n_locale" */
export type Strapi_I18n_Locale_Insert_Input = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Strapi_I18n_Locale_Max_Fields = {
  __typename?: 'strapi_i18n_locale_max_fields';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Strapi_I18n_Locale_Min_Fields = {
  __typename?: 'strapi_i18n_locale_min_fields';
  code?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "strapi.i18n_locale" */
export type Strapi_I18n_Locale_Mutation_Response = {
  __typename?: 'strapi_i18n_locale_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_I18n_Locale>;
};

/** on_conflict condition type for table "strapi.i18n_locale" */
export type Strapi_I18n_Locale_On_Conflict = {
  constraint: Strapi_I18n_Locale_Constraint;
  update_columns?: Array<Strapi_I18n_Locale_Update_Column>;
  where?: InputMaybe<Strapi_I18n_Locale_Bool_Exp>;
};

/** Ordering options when selecting data from "strapi.i18n_locale". */
export type Strapi_I18n_Locale_Order_By = {
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_by_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: strapi_i18n_locale */
export type Strapi_I18n_Locale_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "strapi.i18n_locale" */
export enum Strapi_I18n_Locale_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id'
}

/** input type for updating data in table "strapi.i18n_locale" */
export type Strapi_I18n_Locale_Set_Input = {
  code?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Strapi_I18n_Locale_Stddev_Fields = {
  __typename?: 'strapi_i18n_locale_stddev_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_I18n_Locale_Stddev_Pop_Fields = {
  __typename?: 'strapi_i18n_locale_stddev_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_I18n_Locale_Stddev_Samp_Fields = {
  __typename?: 'strapi_i18n_locale_stddev_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_I18n_Locale_Sum_Fields = {
  __typename?: 'strapi_i18n_locale_sum_fields';
  created_by_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "strapi.i18n_locale" */
export enum Strapi_I18n_Locale_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id'
}

export type Strapi_I18n_Locale_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_I18n_Locale_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_I18n_Locale_Set_Input>;
  where: Strapi_I18n_Locale_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_I18n_Locale_Var_Pop_Fields = {
  __typename?: 'strapi_i18n_locale_var_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_I18n_Locale_Var_Samp_Fields = {
  __typename?: 'strapi_i18n_locale_var_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_I18n_Locale_Variance_Fields = {
  __typename?: 'strapi_i18n_locale_variance_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "strapi.strapi_api_tokens" */
export type Strapi_Strapi_Api_Tokens = {
  __typename?: 'strapi_strapi_api_tokens';
  access_key?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "strapi.strapi_api_tokens" */
export type Strapi_Strapi_Api_Tokens_Aggregate = {
  __typename?: 'strapi_strapi_api_tokens_aggregate';
  aggregate?: Maybe<Strapi_Strapi_Api_Tokens_Aggregate_Fields>;
  nodes: Array<Strapi_Strapi_Api_Tokens>;
};

/** aggregate fields of "strapi.strapi_api_tokens" */
export type Strapi_Strapi_Api_Tokens_Aggregate_Fields = {
  __typename?: 'strapi_strapi_api_tokens_aggregate_fields';
  avg?: Maybe<Strapi_Strapi_Api_Tokens_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Strapi_Api_Tokens_Max_Fields>;
  min?: Maybe<Strapi_Strapi_Api_Tokens_Min_Fields>;
  stddev?: Maybe<Strapi_Strapi_Api_Tokens_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Strapi_Api_Tokens_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Strapi_Api_Tokens_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Strapi_Api_Tokens_Sum_Fields>;
  var_pop?: Maybe<Strapi_Strapi_Api_Tokens_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Strapi_Api_Tokens_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Strapi_Api_Tokens_Variance_Fields>;
};


/** aggregate fields of "strapi.strapi_api_tokens" */
export type Strapi_Strapi_Api_Tokens_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Strapi_Api_Tokens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_Strapi_Api_Tokens_Avg_Fields = {
  __typename?: 'strapi_strapi_api_tokens_avg_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.strapi_api_tokens". All fields are combined with a logical 'AND'. */
export type Strapi_Strapi_Api_Tokens_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Strapi_Api_Tokens_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Strapi_Api_Tokens_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Strapi_Api_Tokens_Bool_Exp>>;
  access_key?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  created_by_id?: InputMaybe<Int_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  updated_by_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "strapi.strapi_api_tokens" */
export enum Strapi_Strapi_Api_Tokens_Constraint {
  /** unique or primary key constraint on columns "id" */
  StrapiApiTokensPkey = 'strapi_api_tokens_pkey'
}

/** input type for incrementing numeric columns in table "strapi.strapi_api_tokens" */
export type Strapi_Strapi_Api_Tokens_Inc_Input = {
  created_by_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.strapi_api_tokens" */
export type Strapi_Strapi_Api_Tokens_Insert_Input = {
  access_key?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Strapi_Strapi_Api_Tokens_Max_Fields = {
  __typename?: 'strapi_strapi_api_tokens_max_fields';
  access_key?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Strapi_Strapi_Api_Tokens_Min_Fields = {
  __typename?: 'strapi_strapi_api_tokens_min_fields';
  access_key?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "strapi.strapi_api_tokens" */
export type Strapi_Strapi_Api_Tokens_Mutation_Response = {
  __typename?: 'strapi_strapi_api_tokens_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Strapi_Api_Tokens>;
};

/** on_conflict condition type for table "strapi.strapi_api_tokens" */
export type Strapi_Strapi_Api_Tokens_On_Conflict = {
  constraint: Strapi_Strapi_Api_Tokens_Constraint;
  update_columns?: Array<Strapi_Strapi_Api_Tokens_Update_Column>;
  where?: InputMaybe<Strapi_Strapi_Api_Tokens_Bool_Exp>;
};

/** Ordering options when selecting data from "strapi.strapi_api_tokens". */
export type Strapi_Strapi_Api_Tokens_Order_By = {
  access_key?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_by_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: strapi_strapi_api_tokens */
export type Strapi_Strapi_Api_Tokens_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "strapi.strapi_api_tokens" */
export enum Strapi_Strapi_Api_Tokens_Select_Column {
  /** column name */
  AccessKey = 'access_key',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id'
}

/** input type for updating data in table "strapi.strapi_api_tokens" */
export type Strapi_Strapi_Api_Tokens_Set_Input = {
  access_key?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Strapi_Strapi_Api_Tokens_Stddev_Fields = {
  __typename?: 'strapi_strapi_api_tokens_stddev_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Strapi_Api_Tokens_Stddev_Pop_Fields = {
  __typename?: 'strapi_strapi_api_tokens_stddev_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Strapi_Api_Tokens_Stddev_Samp_Fields = {
  __typename?: 'strapi_strapi_api_tokens_stddev_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Strapi_Api_Tokens_Sum_Fields = {
  __typename?: 'strapi_strapi_api_tokens_sum_fields';
  created_by_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "strapi.strapi_api_tokens" */
export enum Strapi_Strapi_Api_Tokens_Update_Column {
  /** column name */
  AccessKey = 'access_key',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id'
}

export type Strapi_Strapi_Api_Tokens_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Strapi_Api_Tokens_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Strapi_Api_Tokens_Set_Input>;
  where: Strapi_Strapi_Api_Tokens_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Strapi_Api_Tokens_Var_Pop_Fields = {
  __typename?: 'strapi_strapi_api_tokens_var_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Strapi_Api_Tokens_Var_Samp_Fields = {
  __typename?: 'strapi_strapi_api_tokens_var_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Strapi_Api_Tokens_Variance_Fields = {
  __typename?: 'strapi_strapi_api_tokens_variance_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "strapi.strapi_core_store_settings" */
export type Strapi_Strapi_Core_Store_Settings = {
  __typename?: 'strapi_strapi_core_store_settings';
  environment?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  key?: Maybe<Scalars['String']>;
  tag?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregated selection of "strapi.strapi_core_store_settings" */
export type Strapi_Strapi_Core_Store_Settings_Aggregate = {
  __typename?: 'strapi_strapi_core_store_settings_aggregate';
  aggregate?: Maybe<Strapi_Strapi_Core_Store_Settings_Aggregate_Fields>;
  nodes: Array<Strapi_Strapi_Core_Store_Settings>;
};

/** aggregate fields of "strapi.strapi_core_store_settings" */
export type Strapi_Strapi_Core_Store_Settings_Aggregate_Fields = {
  __typename?: 'strapi_strapi_core_store_settings_aggregate_fields';
  avg?: Maybe<Strapi_Strapi_Core_Store_Settings_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Strapi_Core_Store_Settings_Max_Fields>;
  min?: Maybe<Strapi_Strapi_Core_Store_Settings_Min_Fields>;
  stddev?: Maybe<Strapi_Strapi_Core_Store_Settings_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Strapi_Core_Store_Settings_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Strapi_Core_Store_Settings_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Strapi_Core_Store_Settings_Sum_Fields>;
  var_pop?: Maybe<Strapi_Strapi_Core_Store_Settings_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Strapi_Core_Store_Settings_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Strapi_Core_Store_Settings_Variance_Fields>;
};


/** aggregate fields of "strapi.strapi_core_store_settings" */
export type Strapi_Strapi_Core_Store_Settings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Strapi_Core_Store_Settings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_Strapi_Core_Store_Settings_Avg_Fields = {
  __typename?: 'strapi_strapi_core_store_settings_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.strapi_core_store_settings". All fields are combined with a logical 'AND'. */
export type Strapi_Strapi_Core_Store_Settings_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Strapi_Core_Store_Settings_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Strapi_Core_Store_Settings_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Strapi_Core_Store_Settings_Bool_Exp>>;
  environment?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  key?: InputMaybe<String_Comparison_Exp>;
  tag?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "strapi.strapi_core_store_settings" */
export enum Strapi_Strapi_Core_Store_Settings_Constraint {
  /** unique or primary key constraint on columns "id" */
  StrapiCoreStoreSettingsPkey = 'strapi_core_store_settings_pkey'
}

/** input type for incrementing numeric columns in table "strapi.strapi_core_store_settings" */
export type Strapi_Strapi_Core_Store_Settings_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.strapi_core_store_settings" */
export type Strapi_Strapi_Core_Store_Settings_Insert_Input = {
  environment?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  key?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Strapi_Strapi_Core_Store_Settings_Max_Fields = {
  __typename?: 'strapi_strapi_core_store_settings_max_fields';
  environment?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
  tag?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Strapi_Strapi_Core_Store_Settings_Min_Fields = {
  __typename?: 'strapi_strapi_core_store_settings_min_fields';
  environment?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
  tag?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "strapi.strapi_core_store_settings" */
export type Strapi_Strapi_Core_Store_Settings_Mutation_Response = {
  __typename?: 'strapi_strapi_core_store_settings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Strapi_Core_Store_Settings>;
};

/** on_conflict condition type for table "strapi.strapi_core_store_settings" */
export type Strapi_Strapi_Core_Store_Settings_On_Conflict = {
  constraint: Strapi_Strapi_Core_Store_Settings_Constraint;
  update_columns?: Array<Strapi_Strapi_Core_Store_Settings_Update_Column>;
  where?: InputMaybe<Strapi_Strapi_Core_Store_Settings_Bool_Exp>;
};

/** Ordering options when selecting data from "strapi.strapi_core_store_settings". */
export type Strapi_Strapi_Core_Store_Settings_Order_By = {
  environment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  tag?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: strapi_strapi_core_store_settings */
export type Strapi_Strapi_Core_Store_Settings_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "strapi.strapi_core_store_settings" */
export enum Strapi_Strapi_Core_Store_Settings_Select_Column {
  /** column name */
  Environment = 'environment',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  Tag = 'tag',
  /** column name */
  Type = 'type',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "strapi.strapi_core_store_settings" */
export type Strapi_Strapi_Core_Store_Settings_Set_Input = {
  environment?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  key?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Strapi_Strapi_Core_Store_Settings_Stddev_Fields = {
  __typename?: 'strapi_strapi_core_store_settings_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Strapi_Core_Store_Settings_Stddev_Pop_Fields = {
  __typename?: 'strapi_strapi_core_store_settings_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Strapi_Core_Store_Settings_Stddev_Samp_Fields = {
  __typename?: 'strapi_strapi_core_store_settings_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Strapi_Core_Store_Settings_Sum_Fields = {
  __typename?: 'strapi_strapi_core_store_settings_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "strapi.strapi_core_store_settings" */
export enum Strapi_Strapi_Core_Store_Settings_Update_Column {
  /** column name */
  Environment = 'environment',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  Tag = 'tag',
  /** column name */
  Type = 'type',
  /** column name */
  Value = 'value'
}

export type Strapi_Strapi_Core_Store_Settings_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Strapi_Core_Store_Settings_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Strapi_Core_Store_Settings_Set_Input>;
  where: Strapi_Strapi_Core_Store_Settings_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Strapi_Core_Store_Settings_Var_Pop_Fields = {
  __typename?: 'strapi_strapi_core_store_settings_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Strapi_Core_Store_Settings_Var_Samp_Fields = {
  __typename?: 'strapi_strapi_core_store_settings_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Strapi_Core_Store_Settings_Variance_Fields = {
  __typename?: 'strapi_strapi_core_store_settings_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "strapi.strapi_database_schema" */
export type Strapi_Strapi_Database_Schema = {
  __typename?: 'strapi_strapi_database_schema';
  hash?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  schema?: Maybe<Scalars['json']>;
  time?: Maybe<Scalars['timestamp']>;
};


/** columns and relationships of "strapi.strapi_database_schema" */
export type Strapi_Strapi_Database_SchemaSchemaArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "strapi.strapi_database_schema" */
export type Strapi_Strapi_Database_Schema_Aggregate = {
  __typename?: 'strapi_strapi_database_schema_aggregate';
  aggregate?: Maybe<Strapi_Strapi_Database_Schema_Aggregate_Fields>;
  nodes: Array<Strapi_Strapi_Database_Schema>;
};

/** aggregate fields of "strapi.strapi_database_schema" */
export type Strapi_Strapi_Database_Schema_Aggregate_Fields = {
  __typename?: 'strapi_strapi_database_schema_aggregate_fields';
  avg?: Maybe<Strapi_Strapi_Database_Schema_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Strapi_Database_Schema_Max_Fields>;
  min?: Maybe<Strapi_Strapi_Database_Schema_Min_Fields>;
  stddev?: Maybe<Strapi_Strapi_Database_Schema_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Strapi_Database_Schema_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Strapi_Database_Schema_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Strapi_Database_Schema_Sum_Fields>;
  var_pop?: Maybe<Strapi_Strapi_Database_Schema_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Strapi_Database_Schema_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Strapi_Database_Schema_Variance_Fields>;
};


/** aggregate fields of "strapi.strapi_database_schema" */
export type Strapi_Strapi_Database_Schema_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Strapi_Database_Schema_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_Strapi_Database_Schema_Avg_Fields = {
  __typename?: 'strapi_strapi_database_schema_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.strapi_database_schema". All fields are combined with a logical 'AND'. */
export type Strapi_Strapi_Database_Schema_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Strapi_Database_Schema_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Strapi_Database_Schema_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Strapi_Database_Schema_Bool_Exp>>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  schema?: InputMaybe<Json_Comparison_Exp>;
  time?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "strapi.strapi_database_schema" */
export enum Strapi_Strapi_Database_Schema_Constraint {
  /** unique or primary key constraint on columns "id" */
  StrapiDatabaseSchemaPkey = 'strapi_database_schema_pkey'
}

/** input type for incrementing numeric columns in table "strapi.strapi_database_schema" */
export type Strapi_Strapi_Database_Schema_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.strapi_database_schema" */
export type Strapi_Strapi_Database_Schema_Insert_Input = {
  hash?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  schema?: InputMaybe<Scalars['json']>;
  time?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Strapi_Strapi_Database_Schema_Max_Fields = {
  __typename?: 'strapi_strapi_database_schema_max_fields';
  hash?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  time?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type Strapi_Strapi_Database_Schema_Min_Fields = {
  __typename?: 'strapi_strapi_database_schema_min_fields';
  hash?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  time?: Maybe<Scalars['timestamp']>;
};

/** response of any mutation on the table "strapi.strapi_database_schema" */
export type Strapi_Strapi_Database_Schema_Mutation_Response = {
  __typename?: 'strapi_strapi_database_schema_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Strapi_Database_Schema>;
};

/** on_conflict condition type for table "strapi.strapi_database_schema" */
export type Strapi_Strapi_Database_Schema_On_Conflict = {
  constraint: Strapi_Strapi_Database_Schema_Constraint;
  update_columns?: Array<Strapi_Strapi_Database_Schema_Update_Column>;
  where?: InputMaybe<Strapi_Strapi_Database_Schema_Bool_Exp>;
};

/** Ordering options when selecting data from "strapi.strapi_database_schema". */
export type Strapi_Strapi_Database_Schema_Order_By = {
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  schema?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** primary key columns input for table: strapi_strapi_database_schema */
export type Strapi_Strapi_Database_Schema_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "strapi.strapi_database_schema" */
export enum Strapi_Strapi_Database_Schema_Select_Column {
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  Schema = 'schema',
  /** column name */
  Time = 'time'
}

/** input type for updating data in table "strapi.strapi_database_schema" */
export type Strapi_Strapi_Database_Schema_Set_Input = {
  hash?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  schema?: InputMaybe<Scalars['json']>;
  time?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate stddev on columns */
export type Strapi_Strapi_Database_Schema_Stddev_Fields = {
  __typename?: 'strapi_strapi_database_schema_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Strapi_Database_Schema_Stddev_Pop_Fields = {
  __typename?: 'strapi_strapi_database_schema_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Strapi_Database_Schema_Stddev_Samp_Fields = {
  __typename?: 'strapi_strapi_database_schema_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Strapi_Database_Schema_Sum_Fields = {
  __typename?: 'strapi_strapi_database_schema_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "strapi.strapi_database_schema" */
export enum Strapi_Strapi_Database_Schema_Update_Column {
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  Schema = 'schema',
  /** column name */
  Time = 'time'
}

export type Strapi_Strapi_Database_Schema_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Strapi_Database_Schema_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Strapi_Database_Schema_Set_Input>;
  where: Strapi_Strapi_Database_Schema_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Strapi_Database_Schema_Var_Pop_Fields = {
  __typename?: 'strapi_strapi_database_schema_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Strapi_Database_Schema_Var_Samp_Fields = {
  __typename?: 'strapi_strapi_database_schema_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Strapi_Database_Schema_Variance_Fields = {
  __typename?: 'strapi_strapi_database_schema_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "strapi.strapi_migrations" */
export type Strapi_Strapi_Migrations = {
  __typename?: 'strapi_strapi_migrations';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['timestamp']>;
};

/** aggregated selection of "strapi.strapi_migrations" */
export type Strapi_Strapi_Migrations_Aggregate = {
  __typename?: 'strapi_strapi_migrations_aggregate';
  aggregate?: Maybe<Strapi_Strapi_Migrations_Aggregate_Fields>;
  nodes: Array<Strapi_Strapi_Migrations>;
};

/** aggregate fields of "strapi.strapi_migrations" */
export type Strapi_Strapi_Migrations_Aggregate_Fields = {
  __typename?: 'strapi_strapi_migrations_aggregate_fields';
  avg?: Maybe<Strapi_Strapi_Migrations_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Strapi_Migrations_Max_Fields>;
  min?: Maybe<Strapi_Strapi_Migrations_Min_Fields>;
  stddev?: Maybe<Strapi_Strapi_Migrations_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Strapi_Migrations_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Strapi_Migrations_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Strapi_Migrations_Sum_Fields>;
  var_pop?: Maybe<Strapi_Strapi_Migrations_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Strapi_Migrations_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Strapi_Migrations_Variance_Fields>;
};


/** aggregate fields of "strapi.strapi_migrations" */
export type Strapi_Strapi_Migrations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Strapi_Migrations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_Strapi_Migrations_Avg_Fields = {
  __typename?: 'strapi_strapi_migrations_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.strapi_migrations". All fields are combined with a logical 'AND'. */
export type Strapi_Strapi_Migrations_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Strapi_Migrations_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Strapi_Migrations_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Strapi_Migrations_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  time?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "strapi.strapi_migrations" */
export enum Strapi_Strapi_Migrations_Constraint {
  /** unique or primary key constraint on columns "id" */
  StrapiMigrationsPkey = 'strapi_migrations_pkey'
}

/** input type for incrementing numeric columns in table "strapi.strapi_migrations" */
export type Strapi_Strapi_Migrations_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.strapi_migrations" */
export type Strapi_Strapi_Migrations_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Strapi_Strapi_Migrations_Max_Fields = {
  __typename?: 'strapi_strapi_migrations_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type Strapi_Strapi_Migrations_Min_Fields = {
  __typename?: 'strapi_strapi_migrations_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['timestamp']>;
};

/** response of any mutation on the table "strapi.strapi_migrations" */
export type Strapi_Strapi_Migrations_Mutation_Response = {
  __typename?: 'strapi_strapi_migrations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Strapi_Migrations>;
};

/** on_conflict condition type for table "strapi.strapi_migrations" */
export type Strapi_Strapi_Migrations_On_Conflict = {
  constraint: Strapi_Strapi_Migrations_Constraint;
  update_columns?: Array<Strapi_Strapi_Migrations_Update_Column>;
  where?: InputMaybe<Strapi_Strapi_Migrations_Bool_Exp>;
};

/** Ordering options when selecting data from "strapi.strapi_migrations". */
export type Strapi_Strapi_Migrations_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** primary key columns input for table: strapi_strapi_migrations */
export type Strapi_Strapi_Migrations_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "strapi.strapi_migrations" */
export enum Strapi_Strapi_Migrations_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Time = 'time'
}

/** input type for updating data in table "strapi.strapi_migrations" */
export type Strapi_Strapi_Migrations_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate stddev on columns */
export type Strapi_Strapi_Migrations_Stddev_Fields = {
  __typename?: 'strapi_strapi_migrations_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Strapi_Migrations_Stddev_Pop_Fields = {
  __typename?: 'strapi_strapi_migrations_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Strapi_Migrations_Stddev_Samp_Fields = {
  __typename?: 'strapi_strapi_migrations_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Strapi_Migrations_Sum_Fields = {
  __typename?: 'strapi_strapi_migrations_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "strapi.strapi_migrations" */
export enum Strapi_Strapi_Migrations_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Time = 'time'
}

export type Strapi_Strapi_Migrations_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Strapi_Migrations_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Strapi_Migrations_Set_Input>;
  where: Strapi_Strapi_Migrations_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Strapi_Migrations_Var_Pop_Fields = {
  __typename?: 'strapi_strapi_migrations_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Strapi_Migrations_Var_Samp_Fields = {
  __typename?: 'strapi_strapi_migrations_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Strapi_Migrations_Variance_Fields = {
  __typename?: 'strapi_strapi_migrations_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "strapi.strapi_webhooks" */
export type Strapi_Strapi_Webhooks = {
  __typename?: 'strapi_strapi_webhooks';
  enabled?: Maybe<Scalars['Boolean']>;
  events?: Maybe<Scalars['jsonb']>;
  headers?: Maybe<Scalars['jsonb']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};


/** columns and relationships of "strapi.strapi_webhooks" */
export type Strapi_Strapi_WebhooksEventsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "strapi.strapi_webhooks" */
export type Strapi_Strapi_WebhooksHeadersArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "strapi.strapi_webhooks" */
export type Strapi_Strapi_Webhooks_Aggregate = {
  __typename?: 'strapi_strapi_webhooks_aggregate';
  aggregate?: Maybe<Strapi_Strapi_Webhooks_Aggregate_Fields>;
  nodes: Array<Strapi_Strapi_Webhooks>;
};

/** aggregate fields of "strapi.strapi_webhooks" */
export type Strapi_Strapi_Webhooks_Aggregate_Fields = {
  __typename?: 'strapi_strapi_webhooks_aggregate_fields';
  avg?: Maybe<Strapi_Strapi_Webhooks_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Strapi_Webhooks_Max_Fields>;
  min?: Maybe<Strapi_Strapi_Webhooks_Min_Fields>;
  stddev?: Maybe<Strapi_Strapi_Webhooks_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Strapi_Webhooks_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Strapi_Webhooks_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Strapi_Webhooks_Sum_Fields>;
  var_pop?: Maybe<Strapi_Strapi_Webhooks_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Strapi_Webhooks_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Strapi_Webhooks_Variance_Fields>;
};


/** aggregate fields of "strapi.strapi_webhooks" */
export type Strapi_Strapi_Webhooks_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Strapi_Webhooks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Strapi_Strapi_Webhooks_Append_Input = {
  events?: InputMaybe<Scalars['jsonb']>;
  headers?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Strapi_Strapi_Webhooks_Avg_Fields = {
  __typename?: 'strapi_strapi_webhooks_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.strapi_webhooks". All fields are combined with a logical 'AND'. */
export type Strapi_Strapi_Webhooks_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Strapi_Webhooks_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Strapi_Webhooks_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Strapi_Webhooks_Bool_Exp>>;
  enabled?: InputMaybe<Boolean_Comparison_Exp>;
  events?: InputMaybe<Jsonb_Comparison_Exp>;
  headers?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "strapi.strapi_webhooks" */
export enum Strapi_Strapi_Webhooks_Constraint {
  /** unique or primary key constraint on columns "id" */
  StrapiWebhooksPkey = 'strapi_webhooks_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Strapi_Strapi_Webhooks_Delete_At_Path_Input = {
  events?: InputMaybe<Array<Scalars['String']>>;
  headers?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Strapi_Strapi_Webhooks_Delete_Elem_Input = {
  events?: InputMaybe<Scalars['Int']>;
  headers?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Strapi_Strapi_Webhooks_Delete_Key_Input = {
  events?: InputMaybe<Scalars['String']>;
  headers?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "strapi.strapi_webhooks" */
export type Strapi_Strapi_Webhooks_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.strapi_webhooks" */
export type Strapi_Strapi_Webhooks_Insert_Input = {
  enabled?: InputMaybe<Scalars['Boolean']>;
  events?: InputMaybe<Scalars['jsonb']>;
  headers?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Strapi_Strapi_Webhooks_Max_Fields = {
  __typename?: 'strapi_strapi_webhooks_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Strapi_Strapi_Webhooks_Min_Fields = {
  __typename?: 'strapi_strapi_webhooks_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "strapi.strapi_webhooks" */
export type Strapi_Strapi_Webhooks_Mutation_Response = {
  __typename?: 'strapi_strapi_webhooks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Strapi_Webhooks>;
};

/** on_conflict condition type for table "strapi.strapi_webhooks" */
export type Strapi_Strapi_Webhooks_On_Conflict = {
  constraint: Strapi_Strapi_Webhooks_Constraint;
  update_columns?: Array<Strapi_Strapi_Webhooks_Update_Column>;
  where?: InputMaybe<Strapi_Strapi_Webhooks_Bool_Exp>;
};

/** Ordering options when selecting data from "strapi.strapi_webhooks". */
export type Strapi_Strapi_Webhooks_Order_By = {
  enabled?: InputMaybe<Order_By>;
  events?: InputMaybe<Order_By>;
  headers?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** primary key columns input for table: strapi_strapi_webhooks */
export type Strapi_Strapi_Webhooks_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Strapi_Strapi_Webhooks_Prepend_Input = {
  events?: InputMaybe<Scalars['jsonb']>;
  headers?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "strapi.strapi_webhooks" */
export enum Strapi_Strapi_Webhooks_Select_Column {
  /** column name */
  Enabled = 'enabled',
  /** column name */
  Events = 'events',
  /** column name */
  Headers = 'headers',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Url = 'url'
}

/** input type for updating data in table "strapi.strapi_webhooks" */
export type Strapi_Strapi_Webhooks_Set_Input = {
  enabled?: InputMaybe<Scalars['Boolean']>;
  events?: InputMaybe<Scalars['jsonb']>;
  headers?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Strapi_Strapi_Webhooks_Stddev_Fields = {
  __typename?: 'strapi_strapi_webhooks_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Strapi_Webhooks_Stddev_Pop_Fields = {
  __typename?: 'strapi_strapi_webhooks_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Strapi_Webhooks_Stddev_Samp_Fields = {
  __typename?: 'strapi_strapi_webhooks_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Strapi_Webhooks_Sum_Fields = {
  __typename?: 'strapi_strapi_webhooks_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "strapi.strapi_webhooks" */
export enum Strapi_Strapi_Webhooks_Update_Column {
  /** column name */
  Enabled = 'enabled',
  /** column name */
  Events = 'events',
  /** column name */
  Headers = 'headers',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Url = 'url'
}

export type Strapi_Strapi_Webhooks_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Strapi_Strapi_Webhooks_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Strapi_Strapi_Webhooks_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Strapi_Strapi_Webhooks_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Strapi_Strapi_Webhooks_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Strapi_Webhooks_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Strapi_Strapi_Webhooks_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Strapi_Webhooks_Set_Input>;
  where: Strapi_Strapi_Webhooks_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Strapi_Webhooks_Var_Pop_Fields = {
  __typename?: 'strapi_strapi_webhooks_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Strapi_Webhooks_Var_Samp_Fields = {
  __typename?: 'strapi_strapi_webhooks_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Strapi_Webhooks_Variance_Fields = {
  __typename?: 'strapi_strapi_webhooks_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "strapi.up_permissions" */
export type Strapi_Up_Permissions = {
  __typename?: 'strapi_up_permissions';
  action?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "strapi.up_permissions" */
export type Strapi_Up_Permissions_Aggregate = {
  __typename?: 'strapi_up_permissions_aggregate';
  aggregate?: Maybe<Strapi_Up_Permissions_Aggregate_Fields>;
  nodes: Array<Strapi_Up_Permissions>;
};

/** aggregate fields of "strapi.up_permissions" */
export type Strapi_Up_Permissions_Aggregate_Fields = {
  __typename?: 'strapi_up_permissions_aggregate_fields';
  avg?: Maybe<Strapi_Up_Permissions_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Up_Permissions_Max_Fields>;
  min?: Maybe<Strapi_Up_Permissions_Min_Fields>;
  stddev?: Maybe<Strapi_Up_Permissions_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Up_Permissions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Up_Permissions_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Up_Permissions_Sum_Fields>;
  var_pop?: Maybe<Strapi_Up_Permissions_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Up_Permissions_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Up_Permissions_Variance_Fields>;
};


/** aggregate fields of "strapi.up_permissions" */
export type Strapi_Up_Permissions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Up_Permissions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_Up_Permissions_Avg_Fields = {
  __typename?: 'strapi_up_permissions_avg_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.up_permissions". All fields are combined with a logical 'AND'. */
export type Strapi_Up_Permissions_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Up_Permissions_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Up_Permissions_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Up_Permissions_Bool_Exp>>;
  action?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  created_by_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  updated_by_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "strapi.up_permissions" */
export enum Strapi_Up_Permissions_Constraint {
  /** unique or primary key constraint on columns "id" */
  UpPermissionsPkey = 'up_permissions_pkey'
}

/** input type for incrementing numeric columns in table "strapi.up_permissions" */
export type Strapi_Up_Permissions_Inc_Input = {
  created_by_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.up_permissions" */
export type Strapi_Up_Permissions_Insert_Input = {
  action?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Strapi_Up_Permissions_Max_Fields = {
  __typename?: 'strapi_up_permissions_max_fields';
  action?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Strapi_Up_Permissions_Min_Fields = {
  __typename?: 'strapi_up_permissions_min_fields';
  action?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "strapi.up_permissions" */
export type Strapi_Up_Permissions_Mutation_Response = {
  __typename?: 'strapi_up_permissions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Up_Permissions>;
};

/** on_conflict condition type for table "strapi.up_permissions" */
export type Strapi_Up_Permissions_On_Conflict = {
  constraint: Strapi_Up_Permissions_Constraint;
  update_columns?: Array<Strapi_Up_Permissions_Update_Column>;
  where?: InputMaybe<Strapi_Up_Permissions_Bool_Exp>;
};

/** Ordering options when selecting data from "strapi.up_permissions". */
export type Strapi_Up_Permissions_Order_By = {
  action?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_by_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: strapi_up_permissions */
export type Strapi_Up_Permissions_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** columns and relationships of "strapi.up_permissions_role_links" */
export type Strapi_Up_Permissions_Role_Links = {
  __typename?: 'strapi_up_permissions_role_links';
  permission_id?: Maybe<Scalars['Int']>;
  role_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "strapi.up_permissions_role_links" */
export type Strapi_Up_Permissions_Role_Links_Aggregate = {
  __typename?: 'strapi_up_permissions_role_links_aggregate';
  aggregate?: Maybe<Strapi_Up_Permissions_Role_Links_Aggregate_Fields>;
  nodes: Array<Strapi_Up_Permissions_Role_Links>;
};

/** aggregate fields of "strapi.up_permissions_role_links" */
export type Strapi_Up_Permissions_Role_Links_Aggregate_Fields = {
  __typename?: 'strapi_up_permissions_role_links_aggregate_fields';
  avg?: Maybe<Strapi_Up_Permissions_Role_Links_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Up_Permissions_Role_Links_Max_Fields>;
  min?: Maybe<Strapi_Up_Permissions_Role_Links_Min_Fields>;
  stddev?: Maybe<Strapi_Up_Permissions_Role_Links_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Up_Permissions_Role_Links_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Up_Permissions_Role_Links_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Up_Permissions_Role_Links_Sum_Fields>;
  var_pop?: Maybe<Strapi_Up_Permissions_Role_Links_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Up_Permissions_Role_Links_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Up_Permissions_Role_Links_Variance_Fields>;
};


/** aggregate fields of "strapi.up_permissions_role_links" */
export type Strapi_Up_Permissions_Role_Links_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Up_Permissions_Role_Links_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_Up_Permissions_Role_Links_Avg_Fields = {
  __typename?: 'strapi_up_permissions_role_links_avg_fields';
  permission_id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.up_permissions_role_links". All fields are combined with a logical 'AND'. */
export type Strapi_Up_Permissions_Role_Links_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Up_Permissions_Role_Links_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Up_Permissions_Role_Links_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Up_Permissions_Role_Links_Bool_Exp>>;
  permission_id?: InputMaybe<Int_Comparison_Exp>;
  role_id?: InputMaybe<Int_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "strapi.up_permissions_role_links" */
export type Strapi_Up_Permissions_Role_Links_Inc_Input = {
  permission_id?: InputMaybe<Scalars['Int']>;
  role_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.up_permissions_role_links" */
export type Strapi_Up_Permissions_Role_Links_Insert_Input = {
  permission_id?: InputMaybe<Scalars['Int']>;
  role_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Strapi_Up_Permissions_Role_Links_Max_Fields = {
  __typename?: 'strapi_up_permissions_role_links_max_fields';
  permission_id?: Maybe<Scalars['Int']>;
  role_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Strapi_Up_Permissions_Role_Links_Min_Fields = {
  __typename?: 'strapi_up_permissions_role_links_min_fields';
  permission_id?: Maybe<Scalars['Int']>;
  role_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "strapi.up_permissions_role_links" */
export type Strapi_Up_Permissions_Role_Links_Mutation_Response = {
  __typename?: 'strapi_up_permissions_role_links_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Up_Permissions_Role_Links>;
};

/** Ordering options when selecting data from "strapi.up_permissions_role_links". */
export type Strapi_Up_Permissions_Role_Links_Order_By = {
  permission_id?: InputMaybe<Order_By>;
  role_id?: InputMaybe<Order_By>;
};

/** select columns of table "strapi.up_permissions_role_links" */
export enum Strapi_Up_Permissions_Role_Links_Select_Column {
  /** column name */
  PermissionId = 'permission_id',
  /** column name */
  RoleId = 'role_id'
}

/** input type for updating data in table "strapi.up_permissions_role_links" */
export type Strapi_Up_Permissions_Role_Links_Set_Input = {
  permission_id?: InputMaybe<Scalars['Int']>;
  role_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Strapi_Up_Permissions_Role_Links_Stddev_Fields = {
  __typename?: 'strapi_up_permissions_role_links_stddev_fields';
  permission_id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Up_Permissions_Role_Links_Stddev_Pop_Fields = {
  __typename?: 'strapi_up_permissions_role_links_stddev_pop_fields';
  permission_id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Up_Permissions_Role_Links_Stddev_Samp_Fields = {
  __typename?: 'strapi_up_permissions_role_links_stddev_samp_fields';
  permission_id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Up_Permissions_Role_Links_Sum_Fields = {
  __typename?: 'strapi_up_permissions_role_links_sum_fields';
  permission_id?: Maybe<Scalars['Int']>;
  role_id?: Maybe<Scalars['Int']>;
};

export type Strapi_Up_Permissions_Role_Links_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Up_Permissions_Role_Links_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Up_Permissions_Role_Links_Set_Input>;
  where: Strapi_Up_Permissions_Role_Links_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Up_Permissions_Role_Links_Var_Pop_Fields = {
  __typename?: 'strapi_up_permissions_role_links_var_pop_fields';
  permission_id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Up_Permissions_Role_Links_Var_Samp_Fields = {
  __typename?: 'strapi_up_permissions_role_links_var_samp_fields';
  permission_id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Up_Permissions_Role_Links_Variance_Fields = {
  __typename?: 'strapi_up_permissions_role_links_variance_fields';
  permission_id?: Maybe<Scalars['Float']>;
  role_id?: Maybe<Scalars['Float']>;
};

/** select columns of table "strapi.up_permissions" */
export enum Strapi_Up_Permissions_Select_Column {
  /** column name */
  Action = 'action',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id'
}

/** input type for updating data in table "strapi.up_permissions" */
export type Strapi_Up_Permissions_Set_Input = {
  action?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Strapi_Up_Permissions_Stddev_Fields = {
  __typename?: 'strapi_up_permissions_stddev_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Up_Permissions_Stddev_Pop_Fields = {
  __typename?: 'strapi_up_permissions_stddev_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Up_Permissions_Stddev_Samp_Fields = {
  __typename?: 'strapi_up_permissions_stddev_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Up_Permissions_Sum_Fields = {
  __typename?: 'strapi_up_permissions_sum_fields';
  created_by_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "strapi.up_permissions" */
export enum Strapi_Up_Permissions_Update_Column {
  /** column name */
  Action = 'action',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id'
}

export type Strapi_Up_Permissions_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Up_Permissions_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Up_Permissions_Set_Input>;
  where: Strapi_Up_Permissions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Up_Permissions_Var_Pop_Fields = {
  __typename?: 'strapi_up_permissions_var_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Up_Permissions_Var_Samp_Fields = {
  __typename?: 'strapi_up_permissions_var_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Up_Permissions_Variance_Fields = {
  __typename?: 'strapi_up_permissions_variance_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "strapi.up_roles" */
export type Strapi_Up_Roles = {
  __typename?: 'strapi_up_roles';
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "strapi.up_roles" */
export type Strapi_Up_Roles_Aggregate = {
  __typename?: 'strapi_up_roles_aggregate';
  aggregate?: Maybe<Strapi_Up_Roles_Aggregate_Fields>;
  nodes: Array<Strapi_Up_Roles>;
};

/** aggregate fields of "strapi.up_roles" */
export type Strapi_Up_Roles_Aggregate_Fields = {
  __typename?: 'strapi_up_roles_aggregate_fields';
  avg?: Maybe<Strapi_Up_Roles_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Up_Roles_Max_Fields>;
  min?: Maybe<Strapi_Up_Roles_Min_Fields>;
  stddev?: Maybe<Strapi_Up_Roles_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Up_Roles_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Up_Roles_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Up_Roles_Sum_Fields>;
  var_pop?: Maybe<Strapi_Up_Roles_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Up_Roles_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Up_Roles_Variance_Fields>;
};


/** aggregate fields of "strapi.up_roles" */
export type Strapi_Up_Roles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Up_Roles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_Up_Roles_Avg_Fields = {
  __typename?: 'strapi_up_roles_avg_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.up_roles". All fields are combined with a logical 'AND'. */
export type Strapi_Up_Roles_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Up_Roles_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Up_Roles_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Up_Roles_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  created_by_id?: InputMaybe<Int_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  updated_by_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "strapi.up_roles" */
export enum Strapi_Up_Roles_Constraint {
  /** unique or primary key constraint on columns "id" */
  UpRolesPkey = 'up_roles_pkey'
}

/** input type for incrementing numeric columns in table "strapi.up_roles" */
export type Strapi_Up_Roles_Inc_Input = {
  created_by_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.up_roles" */
export type Strapi_Up_Roles_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Strapi_Up_Roles_Max_Fields = {
  __typename?: 'strapi_up_roles_max_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Strapi_Up_Roles_Min_Fields = {
  __typename?: 'strapi_up_roles_min_fields';
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "strapi.up_roles" */
export type Strapi_Up_Roles_Mutation_Response = {
  __typename?: 'strapi_up_roles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Up_Roles>;
};

/** on_conflict condition type for table "strapi.up_roles" */
export type Strapi_Up_Roles_On_Conflict = {
  constraint: Strapi_Up_Roles_Constraint;
  update_columns?: Array<Strapi_Up_Roles_Update_Column>;
  where?: InputMaybe<Strapi_Up_Roles_Bool_Exp>;
};

/** Ordering options when selecting data from "strapi.up_roles". */
export type Strapi_Up_Roles_Order_By = {
  created_at?: InputMaybe<Order_By>;
  created_by_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_by_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: strapi_up_roles */
export type Strapi_Up_Roles_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "strapi.up_roles" */
export enum Strapi_Up_Roles_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id'
}

/** input type for updating data in table "strapi.up_roles" */
export type Strapi_Up_Roles_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Strapi_Up_Roles_Stddev_Fields = {
  __typename?: 'strapi_up_roles_stddev_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Up_Roles_Stddev_Pop_Fields = {
  __typename?: 'strapi_up_roles_stddev_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Up_Roles_Stddev_Samp_Fields = {
  __typename?: 'strapi_up_roles_stddev_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Up_Roles_Sum_Fields = {
  __typename?: 'strapi_up_roles_sum_fields';
  created_by_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "strapi.up_roles" */
export enum Strapi_Up_Roles_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id'
}

export type Strapi_Up_Roles_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Up_Roles_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Up_Roles_Set_Input>;
  where: Strapi_Up_Roles_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Up_Roles_Var_Pop_Fields = {
  __typename?: 'strapi_up_roles_var_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Up_Roles_Var_Samp_Fields = {
  __typename?: 'strapi_up_roles_var_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Up_Roles_Variance_Fields = {
  __typename?: 'strapi_up_roles_variance_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "strapi.up_users" */
export type Strapi_Up_Users = {
  __typename?: 'strapi_up_users';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmation_token?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  password?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  reset_password_token?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregated selection of "strapi.up_users" */
export type Strapi_Up_Users_Aggregate = {
  __typename?: 'strapi_up_users_aggregate';
  aggregate?: Maybe<Strapi_Up_Users_Aggregate_Fields>;
  nodes: Array<Strapi_Up_Users>;
};

/** aggregate fields of "strapi.up_users" */
export type Strapi_Up_Users_Aggregate_Fields = {
  __typename?: 'strapi_up_users_aggregate_fields';
  avg?: Maybe<Strapi_Up_Users_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Up_Users_Max_Fields>;
  min?: Maybe<Strapi_Up_Users_Min_Fields>;
  stddev?: Maybe<Strapi_Up_Users_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Up_Users_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Up_Users_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Up_Users_Sum_Fields>;
  var_pop?: Maybe<Strapi_Up_Users_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Up_Users_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Up_Users_Variance_Fields>;
};


/** aggregate fields of "strapi.up_users" */
export type Strapi_Up_Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Up_Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_Up_Users_Avg_Fields = {
  __typename?: 'strapi_up_users_avg_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.up_users". All fields are combined with a logical 'AND'. */
export type Strapi_Up_Users_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Up_Users_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Up_Users_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Up_Users_Bool_Exp>>;
  blocked?: InputMaybe<Boolean_Comparison_Exp>;
  confirmation_token?: InputMaybe<String_Comparison_Exp>;
  confirmed?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  created_by_id?: InputMaybe<Int_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  provider?: InputMaybe<String_Comparison_Exp>;
  reset_password_token?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  updated_by_id?: InputMaybe<Int_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "strapi.up_users" */
export enum Strapi_Up_Users_Constraint {
  /** unique or primary key constraint on columns "id" */
  UpUsersPkey = 'up_users_pkey'
}

/** input type for incrementing numeric columns in table "strapi.up_users" */
export type Strapi_Up_Users_Inc_Input = {
  created_by_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.up_users" */
export type Strapi_Up_Users_Insert_Input = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmation_token?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  reset_password_token?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Strapi_Up_Users_Max_Fields = {
  __typename?: 'strapi_up_users_max_fields';
  confirmation_token?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  reset_password_token?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Strapi_Up_Users_Min_Fields = {
  __typename?: 'strapi_up_users_min_fields';
  confirmation_token?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamp']>;
  created_by_id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  reset_password_token?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  updated_by_id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "strapi.up_users" */
export type Strapi_Up_Users_Mutation_Response = {
  __typename?: 'strapi_up_users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Up_Users>;
};

/** on_conflict condition type for table "strapi.up_users" */
export type Strapi_Up_Users_On_Conflict = {
  constraint: Strapi_Up_Users_Constraint;
  update_columns?: Array<Strapi_Up_Users_Update_Column>;
  where?: InputMaybe<Strapi_Up_Users_Bool_Exp>;
};

/** Ordering options when selecting data from "strapi.up_users". */
export type Strapi_Up_Users_Order_By = {
  blocked?: InputMaybe<Order_By>;
  confirmation_token?: InputMaybe<Order_By>;
  confirmed?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  created_by_id?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  provider?: InputMaybe<Order_By>;
  reset_password_token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  updated_by_id?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** primary key columns input for table: strapi_up_users */
export type Strapi_Up_Users_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** columns and relationships of "strapi.up_users_role_links" */
export type Strapi_Up_Users_Role_Links = {
  __typename?: 'strapi_up_users_role_links';
  role_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "strapi.up_users_role_links" */
export type Strapi_Up_Users_Role_Links_Aggregate = {
  __typename?: 'strapi_up_users_role_links_aggregate';
  aggregate?: Maybe<Strapi_Up_Users_Role_Links_Aggregate_Fields>;
  nodes: Array<Strapi_Up_Users_Role_Links>;
};

/** aggregate fields of "strapi.up_users_role_links" */
export type Strapi_Up_Users_Role_Links_Aggregate_Fields = {
  __typename?: 'strapi_up_users_role_links_aggregate_fields';
  avg?: Maybe<Strapi_Up_Users_Role_Links_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Strapi_Up_Users_Role_Links_Max_Fields>;
  min?: Maybe<Strapi_Up_Users_Role_Links_Min_Fields>;
  stddev?: Maybe<Strapi_Up_Users_Role_Links_Stddev_Fields>;
  stddev_pop?: Maybe<Strapi_Up_Users_Role_Links_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Strapi_Up_Users_Role_Links_Stddev_Samp_Fields>;
  sum?: Maybe<Strapi_Up_Users_Role_Links_Sum_Fields>;
  var_pop?: Maybe<Strapi_Up_Users_Role_Links_Var_Pop_Fields>;
  var_samp?: Maybe<Strapi_Up_Users_Role_Links_Var_Samp_Fields>;
  variance?: Maybe<Strapi_Up_Users_Role_Links_Variance_Fields>;
};


/** aggregate fields of "strapi.up_users_role_links" */
export type Strapi_Up_Users_Role_Links_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Strapi_Up_Users_Role_Links_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Strapi_Up_Users_Role_Links_Avg_Fields = {
  __typename?: 'strapi_up_users_role_links_avg_fields';
  role_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "strapi.up_users_role_links". All fields are combined with a logical 'AND'. */
export type Strapi_Up_Users_Role_Links_Bool_Exp = {
  _and?: InputMaybe<Array<Strapi_Up_Users_Role_Links_Bool_Exp>>;
  _not?: InputMaybe<Strapi_Up_Users_Role_Links_Bool_Exp>;
  _or?: InputMaybe<Array<Strapi_Up_Users_Role_Links_Bool_Exp>>;
  role_id?: InputMaybe<Int_Comparison_Exp>;
  user_id?: InputMaybe<Int_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "strapi.up_users_role_links" */
export type Strapi_Up_Users_Role_Links_Inc_Input = {
  role_id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "strapi.up_users_role_links" */
export type Strapi_Up_Users_Role_Links_Insert_Input = {
  role_id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Strapi_Up_Users_Role_Links_Max_Fields = {
  __typename?: 'strapi_up_users_role_links_max_fields';
  role_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Strapi_Up_Users_Role_Links_Min_Fields = {
  __typename?: 'strapi_up_users_role_links_min_fields';
  role_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "strapi.up_users_role_links" */
export type Strapi_Up_Users_Role_Links_Mutation_Response = {
  __typename?: 'strapi_up_users_role_links_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Strapi_Up_Users_Role_Links>;
};

/** Ordering options when selecting data from "strapi.up_users_role_links". */
export type Strapi_Up_Users_Role_Links_Order_By = {
  role_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "strapi.up_users_role_links" */
export enum Strapi_Up_Users_Role_Links_Select_Column {
  /** column name */
  RoleId = 'role_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "strapi.up_users_role_links" */
export type Strapi_Up_Users_Role_Links_Set_Input = {
  role_id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Strapi_Up_Users_Role_Links_Stddev_Fields = {
  __typename?: 'strapi_up_users_role_links_stddev_fields';
  role_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Up_Users_Role_Links_Stddev_Pop_Fields = {
  __typename?: 'strapi_up_users_role_links_stddev_pop_fields';
  role_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Up_Users_Role_Links_Stddev_Samp_Fields = {
  __typename?: 'strapi_up_users_role_links_stddev_samp_fields';
  role_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Up_Users_Role_Links_Sum_Fields = {
  __typename?: 'strapi_up_users_role_links_sum_fields';
  role_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type Strapi_Up_Users_Role_Links_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Up_Users_Role_Links_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Up_Users_Role_Links_Set_Input>;
  where: Strapi_Up_Users_Role_Links_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Up_Users_Role_Links_Var_Pop_Fields = {
  __typename?: 'strapi_up_users_role_links_var_pop_fields';
  role_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Up_Users_Role_Links_Var_Samp_Fields = {
  __typename?: 'strapi_up_users_role_links_var_samp_fields';
  role_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Up_Users_Role_Links_Variance_Fields = {
  __typename?: 'strapi_up_users_role_links_variance_fields';
  role_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** select columns of table "strapi.up_users" */
export enum Strapi_Up_Users_Select_Column {
  /** column name */
  Blocked = 'blocked',
  /** column name */
  ConfirmationToken = 'confirmation_token',
  /** column name */
  Confirmed = 'confirmed',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  Provider = 'provider',
  /** column name */
  ResetPasswordToken = 'reset_password_token',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "strapi.up_users" */
export type Strapi_Up_Users_Set_Input = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmation_token?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  created_by_id?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  reset_password_token?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  updated_by_id?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Strapi_Up_Users_Stddev_Fields = {
  __typename?: 'strapi_up_users_stddev_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Strapi_Up_Users_Stddev_Pop_Fields = {
  __typename?: 'strapi_up_users_stddev_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Strapi_Up_Users_Stddev_Samp_Fields = {
  __typename?: 'strapi_up_users_stddev_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Strapi_Up_Users_Sum_Fields = {
  __typename?: 'strapi_up_users_sum_fields';
  created_by_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  updated_by_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "strapi.up_users" */
export enum Strapi_Up_Users_Update_Column {
  /** column name */
  Blocked = 'blocked',
  /** column name */
  ConfirmationToken = 'confirmation_token',
  /** column name */
  Confirmed = 'confirmed',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  Provider = 'provider',
  /** column name */
  ResetPasswordToken = 'reset_password_token',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedById = 'updated_by_id',
  /** column name */
  Username = 'username'
}

export type Strapi_Up_Users_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Strapi_Up_Users_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Strapi_Up_Users_Set_Input>;
  where: Strapi_Up_Users_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Strapi_Up_Users_Var_Pop_Fields = {
  __typename?: 'strapi_up_users_var_pop_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Strapi_Up_Users_Var_Samp_Fields = {
  __typename?: 'strapi_up_users_var_samp_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Strapi_Up_Users_Variance_Fields = {
  __typename?: 'strapi_up_users_variance_fields';
  created_by_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  updated_by_id?: Maybe<Scalars['Float']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "batch_search_queries_processing_state" */
  batch_search_queries_processing_state: Array<Batch_Search_Queries_Processing_State>;
  /** fetch aggregated fields from the table: "batch_search_queries_processing_state" */
  batch_search_queries_processing_state_aggregate: Batch_Search_Queries_Processing_State_Aggregate;
  /** fetch data from the table: "batch_search_queries_processing_state" using primary key columns */
  batch_search_queries_processing_state_by_pk?: Maybe<Batch_Search_Queries_Processing_State>;
  /** fetch data from the table: "master_batch_search_queries" */
  master_batch_search_queries: Array<Master_Batch_Search_Queries>;
  /** fetch aggregated fields from the table: "master_batch_search_queries" */
  master_batch_search_queries_aggregate: Master_Batch_Search_Queries_Aggregate;
  /** fetch data from the table: "master_batch_search_queries" using primary key columns */
  master_batch_search_queries_by_pk?: Maybe<Master_Batch_Search_Queries>;
  /** fetch data from the table: "master_batch_search_query_categories" */
  master_batch_search_query_categories: Array<Master_Batch_Search_Query_Categories>;
  /** fetch aggregated fields from the table: "master_batch_search_query_categories" */
  master_batch_search_query_categories_aggregate: Master_Batch_Search_Query_Categories_Aggregate;
  /** fetch data from the table: "master_batch_search_query_categories" using primary key columns */
  master_batch_search_query_categories_by_pk?: Maybe<Master_Batch_Search_Query_Categories>;
  /** fetch data from the table: "strapi.admin_permissions" */
  strapi_admin_permissions: Array<Strapi_Admin_Permissions>;
  /** fetch aggregated fields from the table: "strapi.admin_permissions" */
  strapi_admin_permissions_aggregate: Strapi_Admin_Permissions_Aggregate;
  /** fetch data from the table: "strapi.admin_permissions" using primary key columns */
  strapi_admin_permissions_by_pk?: Maybe<Strapi_Admin_Permissions>;
  /** fetch data from the table: "strapi.admin_permissions_role_links" */
  strapi_admin_permissions_role_links: Array<Strapi_Admin_Permissions_Role_Links>;
  /** fetch aggregated fields from the table: "strapi.admin_permissions_role_links" */
  strapi_admin_permissions_role_links_aggregate: Strapi_Admin_Permissions_Role_Links_Aggregate;
  /** fetch data from the table: "strapi.admin_roles" */
  strapi_admin_roles: Array<Strapi_Admin_Roles>;
  /** fetch aggregated fields from the table: "strapi.admin_roles" */
  strapi_admin_roles_aggregate: Strapi_Admin_Roles_Aggregate;
  /** fetch data from the table: "strapi.admin_roles" using primary key columns */
  strapi_admin_roles_by_pk?: Maybe<Strapi_Admin_Roles>;
  /** fetch data from the table: "strapi.admin_users" */
  strapi_admin_users: Array<Strapi_Admin_Users>;
  /** fetch aggregated fields from the table: "strapi.admin_users" */
  strapi_admin_users_aggregate: Strapi_Admin_Users_Aggregate;
  /** fetch data from the table: "strapi.admin_users" using primary key columns */
  strapi_admin_users_by_pk?: Maybe<Strapi_Admin_Users>;
  /** fetch data from the table: "strapi.admin_users_roles_links" */
  strapi_admin_users_roles_links: Array<Strapi_Admin_Users_Roles_Links>;
  /** fetch aggregated fields from the table: "strapi.admin_users_roles_links" */
  strapi_admin_users_roles_links_aggregate: Strapi_Admin_Users_Roles_Links_Aggregate;
  /** fetch data from the table: "strapi.files" */
  strapi_files: Array<Strapi_Files>;
  /** fetch aggregated fields from the table: "strapi.files" */
  strapi_files_aggregate: Strapi_Files_Aggregate;
  /** fetch data from the table: "strapi.files" using primary key columns */
  strapi_files_by_pk?: Maybe<Strapi_Files>;
  /** fetch data from the table: "strapi.files_related_morphs" */
  strapi_files_related_morphs: Array<Strapi_Files_Related_Morphs>;
  /** fetch aggregated fields from the table: "strapi.files_related_morphs" */
  strapi_files_related_morphs_aggregate: Strapi_Files_Related_Morphs_Aggregate;
  /** fetch data from the table: "strapi.i18n_locale" */
  strapi_i18n_locale: Array<Strapi_I18n_Locale>;
  /** fetch aggregated fields from the table: "strapi.i18n_locale" */
  strapi_i18n_locale_aggregate: Strapi_I18n_Locale_Aggregate;
  /** fetch data from the table: "strapi.i18n_locale" using primary key columns */
  strapi_i18n_locale_by_pk?: Maybe<Strapi_I18n_Locale>;
  /** fetch data from the table: "strapi.strapi_api_tokens" */
  strapi_strapi_api_tokens: Array<Strapi_Strapi_Api_Tokens>;
  /** fetch aggregated fields from the table: "strapi.strapi_api_tokens" */
  strapi_strapi_api_tokens_aggregate: Strapi_Strapi_Api_Tokens_Aggregate;
  /** fetch data from the table: "strapi.strapi_api_tokens" using primary key columns */
  strapi_strapi_api_tokens_by_pk?: Maybe<Strapi_Strapi_Api_Tokens>;
  /** fetch data from the table: "strapi.strapi_core_store_settings" */
  strapi_strapi_core_store_settings: Array<Strapi_Strapi_Core_Store_Settings>;
  /** fetch aggregated fields from the table: "strapi.strapi_core_store_settings" */
  strapi_strapi_core_store_settings_aggregate: Strapi_Strapi_Core_Store_Settings_Aggregate;
  /** fetch data from the table: "strapi.strapi_core_store_settings" using primary key columns */
  strapi_strapi_core_store_settings_by_pk?: Maybe<Strapi_Strapi_Core_Store_Settings>;
  /** fetch data from the table: "strapi.strapi_database_schema" */
  strapi_strapi_database_schema: Array<Strapi_Strapi_Database_Schema>;
  /** fetch aggregated fields from the table: "strapi.strapi_database_schema" */
  strapi_strapi_database_schema_aggregate: Strapi_Strapi_Database_Schema_Aggregate;
  /** fetch data from the table: "strapi.strapi_database_schema" using primary key columns */
  strapi_strapi_database_schema_by_pk?: Maybe<Strapi_Strapi_Database_Schema>;
  /** fetch data from the table: "strapi.strapi_migrations" */
  strapi_strapi_migrations: Array<Strapi_Strapi_Migrations>;
  /** fetch aggregated fields from the table: "strapi.strapi_migrations" */
  strapi_strapi_migrations_aggregate: Strapi_Strapi_Migrations_Aggregate;
  /** fetch data from the table: "strapi.strapi_migrations" using primary key columns */
  strapi_strapi_migrations_by_pk?: Maybe<Strapi_Strapi_Migrations>;
  /** fetch data from the table: "strapi.strapi_webhooks" */
  strapi_strapi_webhooks: Array<Strapi_Strapi_Webhooks>;
  /** fetch aggregated fields from the table: "strapi.strapi_webhooks" */
  strapi_strapi_webhooks_aggregate: Strapi_Strapi_Webhooks_Aggregate;
  /** fetch data from the table: "strapi.strapi_webhooks" using primary key columns */
  strapi_strapi_webhooks_by_pk?: Maybe<Strapi_Strapi_Webhooks>;
  /** fetch data from the table: "strapi.up_permissions" */
  strapi_up_permissions: Array<Strapi_Up_Permissions>;
  /** fetch aggregated fields from the table: "strapi.up_permissions" */
  strapi_up_permissions_aggregate: Strapi_Up_Permissions_Aggregate;
  /** fetch data from the table: "strapi.up_permissions" using primary key columns */
  strapi_up_permissions_by_pk?: Maybe<Strapi_Up_Permissions>;
  /** fetch data from the table: "strapi.up_permissions_role_links" */
  strapi_up_permissions_role_links: Array<Strapi_Up_Permissions_Role_Links>;
  /** fetch aggregated fields from the table: "strapi.up_permissions_role_links" */
  strapi_up_permissions_role_links_aggregate: Strapi_Up_Permissions_Role_Links_Aggregate;
  /** fetch data from the table: "strapi.up_roles" */
  strapi_up_roles: Array<Strapi_Up_Roles>;
  /** fetch aggregated fields from the table: "strapi.up_roles" */
  strapi_up_roles_aggregate: Strapi_Up_Roles_Aggregate;
  /** fetch data from the table: "strapi.up_roles" using primary key columns */
  strapi_up_roles_by_pk?: Maybe<Strapi_Up_Roles>;
  /** fetch data from the table: "strapi.up_users" */
  strapi_up_users: Array<Strapi_Up_Users>;
  /** fetch aggregated fields from the table: "strapi.up_users" */
  strapi_up_users_aggregate: Strapi_Up_Users_Aggregate;
  /** fetch data from the table: "strapi.up_users" using primary key columns */
  strapi_up_users_by_pk?: Maybe<Strapi_Up_Users>;
  /** fetch data from the table: "strapi.up_users_role_links" */
  strapi_up_users_role_links: Array<Strapi_Up_Users_Role_Links>;
  /** fetch aggregated fields from the table: "strapi.up_users_role_links" */
  strapi_up_users_role_links_aggregate: Strapi_Up_Users_Role_Links_Aggregate;
};


export type Subscription_RootBatch_Search_Queries_Processing_StateArgs = {
  distinct_on?: InputMaybe<Array<Batch_Search_Queries_Processing_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Batch_Search_Queries_Processing_State_Order_By>>;
  where?: InputMaybe<Batch_Search_Queries_Processing_State_Bool_Exp>;
};


export type Subscription_RootBatch_Search_Queries_Processing_State_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Batch_Search_Queries_Processing_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Batch_Search_Queries_Processing_State_Order_By>>;
  where?: InputMaybe<Batch_Search_Queries_Processing_State_Bool_Exp>;
};


export type Subscription_RootBatch_Search_Queries_Processing_State_By_PkArgs = {
  query_id: Scalars['Int'];
};


export type Subscription_RootMaster_Batch_Search_QueriesArgs = {
  distinct_on?: InputMaybe<Array<Master_Batch_Search_Queries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Master_Batch_Search_Queries_Order_By>>;
  where?: InputMaybe<Master_Batch_Search_Queries_Bool_Exp>;
};


export type Subscription_RootMaster_Batch_Search_Queries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Master_Batch_Search_Queries_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Master_Batch_Search_Queries_Order_By>>;
  where?: InputMaybe<Master_Batch_Search_Queries_Bool_Exp>;
};


export type Subscription_RootMaster_Batch_Search_Queries_By_PkArgs = {
  query_id: Scalars['Int'];
};


export type Subscription_RootMaster_Batch_Search_Query_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Master_Batch_Search_Query_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Master_Batch_Search_Query_Categories_Order_By>>;
  where?: InputMaybe<Master_Batch_Search_Query_Categories_Bool_Exp>;
};


export type Subscription_RootMaster_Batch_Search_Query_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Master_Batch_Search_Query_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Master_Batch_Search_Query_Categories_Order_By>>;
  where?: InputMaybe<Master_Batch_Search_Query_Categories_Bool_Exp>;
};


export type Subscription_RootMaster_Batch_Search_Query_Categories_By_PkArgs = {
  query_category_id: Scalars['Int'];
};


export type Subscription_RootStrapi_Admin_PermissionsArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Permissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Permissions_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Permissions_Bool_Exp>;
};


export type Subscription_RootStrapi_Admin_Permissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Permissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Permissions_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Permissions_Bool_Exp>;
};


export type Subscription_RootStrapi_Admin_Permissions_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootStrapi_Admin_Permissions_Role_LinksArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Permissions_Role_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Permissions_Role_Links_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Permissions_Role_Links_Bool_Exp>;
};


export type Subscription_RootStrapi_Admin_Permissions_Role_Links_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Permissions_Role_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Permissions_Role_Links_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Permissions_Role_Links_Bool_Exp>;
};


export type Subscription_RootStrapi_Admin_RolesArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Roles_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Roles_Bool_Exp>;
};


export type Subscription_RootStrapi_Admin_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Roles_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Roles_Bool_Exp>;
};


export type Subscription_RootStrapi_Admin_Roles_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootStrapi_Admin_UsersArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Users_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Users_Bool_Exp>;
};


export type Subscription_RootStrapi_Admin_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Users_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Users_Bool_Exp>;
};


export type Subscription_RootStrapi_Admin_Users_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootStrapi_Admin_Users_Roles_LinksArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Users_Roles_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Users_Roles_Links_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Users_Roles_Links_Bool_Exp>;
};


export type Subscription_RootStrapi_Admin_Users_Roles_Links_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Admin_Users_Roles_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Admin_Users_Roles_Links_Order_By>>;
  where?: InputMaybe<Strapi_Admin_Users_Roles_Links_Bool_Exp>;
};


export type Subscription_RootStrapi_FilesArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Files_Order_By>>;
  where?: InputMaybe<Strapi_Files_Bool_Exp>;
};


export type Subscription_RootStrapi_Files_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Files_Order_By>>;
  where?: InputMaybe<Strapi_Files_Bool_Exp>;
};


export type Subscription_RootStrapi_Files_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootStrapi_Files_Related_MorphsArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Files_Related_Morphs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Files_Related_Morphs_Order_By>>;
  where?: InputMaybe<Strapi_Files_Related_Morphs_Bool_Exp>;
};


export type Subscription_RootStrapi_Files_Related_Morphs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Files_Related_Morphs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Files_Related_Morphs_Order_By>>;
  where?: InputMaybe<Strapi_Files_Related_Morphs_Bool_Exp>;
};


export type Subscription_RootStrapi_I18n_LocaleArgs = {
  distinct_on?: InputMaybe<Array<Strapi_I18n_Locale_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_I18n_Locale_Order_By>>;
  where?: InputMaybe<Strapi_I18n_Locale_Bool_Exp>;
};


export type Subscription_RootStrapi_I18n_Locale_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_I18n_Locale_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_I18n_Locale_Order_By>>;
  where?: InputMaybe<Strapi_I18n_Locale_Bool_Exp>;
};


export type Subscription_RootStrapi_I18n_Locale_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootStrapi_Strapi_Api_TokensArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Api_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Api_Tokens_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Api_Tokens_Bool_Exp>;
};


export type Subscription_RootStrapi_Strapi_Api_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Api_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Api_Tokens_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Api_Tokens_Bool_Exp>;
};


export type Subscription_RootStrapi_Strapi_Api_Tokens_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootStrapi_Strapi_Core_Store_SettingsArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Core_Store_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Core_Store_Settings_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Core_Store_Settings_Bool_Exp>;
};


export type Subscription_RootStrapi_Strapi_Core_Store_Settings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Core_Store_Settings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Core_Store_Settings_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Core_Store_Settings_Bool_Exp>;
};


export type Subscription_RootStrapi_Strapi_Core_Store_Settings_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootStrapi_Strapi_Database_SchemaArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Database_Schema_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Database_Schema_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Database_Schema_Bool_Exp>;
};


export type Subscription_RootStrapi_Strapi_Database_Schema_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Database_Schema_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Database_Schema_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Database_Schema_Bool_Exp>;
};


export type Subscription_RootStrapi_Strapi_Database_Schema_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootStrapi_Strapi_MigrationsArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Migrations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Migrations_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Migrations_Bool_Exp>;
};


export type Subscription_RootStrapi_Strapi_Migrations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Migrations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Migrations_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Migrations_Bool_Exp>;
};


export type Subscription_RootStrapi_Strapi_Migrations_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootStrapi_Strapi_WebhooksArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Webhooks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Webhooks_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Webhooks_Bool_Exp>;
};


export type Subscription_RootStrapi_Strapi_Webhooks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Strapi_Webhooks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Strapi_Webhooks_Order_By>>;
  where?: InputMaybe<Strapi_Strapi_Webhooks_Bool_Exp>;
};


export type Subscription_RootStrapi_Strapi_Webhooks_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootStrapi_Up_PermissionsArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Permissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Permissions_Order_By>>;
  where?: InputMaybe<Strapi_Up_Permissions_Bool_Exp>;
};


export type Subscription_RootStrapi_Up_Permissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Permissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Permissions_Order_By>>;
  where?: InputMaybe<Strapi_Up_Permissions_Bool_Exp>;
};


export type Subscription_RootStrapi_Up_Permissions_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootStrapi_Up_Permissions_Role_LinksArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Permissions_Role_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Permissions_Role_Links_Order_By>>;
  where?: InputMaybe<Strapi_Up_Permissions_Role_Links_Bool_Exp>;
};


export type Subscription_RootStrapi_Up_Permissions_Role_Links_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Permissions_Role_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Permissions_Role_Links_Order_By>>;
  where?: InputMaybe<Strapi_Up_Permissions_Role_Links_Bool_Exp>;
};


export type Subscription_RootStrapi_Up_RolesArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Roles_Order_By>>;
  where?: InputMaybe<Strapi_Up_Roles_Bool_Exp>;
};


export type Subscription_RootStrapi_Up_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Roles_Order_By>>;
  where?: InputMaybe<Strapi_Up_Roles_Bool_Exp>;
};


export type Subscription_RootStrapi_Up_Roles_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootStrapi_Up_UsersArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Users_Order_By>>;
  where?: InputMaybe<Strapi_Up_Users_Bool_Exp>;
};


export type Subscription_RootStrapi_Up_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Users_Order_By>>;
  where?: InputMaybe<Strapi_Up_Users_Bool_Exp>;
};


export type Subscription_RootStrapi_Up_Users_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootStrapi_Up_Users_Role_LinksArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Users_Role_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Users_Role_Links_Order_By>>;
  where?: InputMaybe<Strapi_Up_Users_Role_Links_Bool_Exp>;
};


export type Subscription_RootStrapi_Up_Users_Role_Links_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Strapi_Up_Users_Role_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Strapi_Up_Users_Role_Links_Order_By>>;
  where?: InputMaybe<Strapi_Up_Users_Role_Links_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

export type MasterQueriesQueryVariables = Exact<{ [key: string]: never; }>;


export type MasterQueriesQuery = { __typename?: 'query_root', master_batch_search_queries: Array<{ __typename?: 'master_batch_search_queries', query: string, query_id: number }>, master_batch_search_query_categories: Array<{ __typename?: 'master_batch_search_query_categories', query_category_id: number, name: string }> };


export const MasterQueriesDocument = gql`
    query MasterQueries {
  master_batch_search_queries(
    where: {is_published_all: {_eq: true}}
    order_by: {updated_at: asc}
  ) {
    query
    query_id
  }
  master_batch_search_query_categories {
    query_category_id
    name
  }
}
    `;

export function useMasterQueriesQuery(options?: Omit<Urql.UseQueryArgs<MasterQueriesQueryVariables>, 'query'>) {
  return Urql.useQuery<MasterQueriesQuery, MasterQueriesQueryVariables>({ query: MasterQueriesDocument, ...options });
};