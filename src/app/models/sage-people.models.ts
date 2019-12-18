export type SagePeopleApiDataTypes = 'string' | 'number' | 'date' | 'boolean' | 'object' | 'array';

export interface SagePeopleApiItem {
  label: string,
  type?: SagePeopleApiDataTypes,
  length?: number,
  required?: boolean,
}

export interface SagePeopleApiItemObject extends SagePeopleApiItem {
  type: 'object',
  data: {
    [property: string]: SagePeopleApiItem |
      SagePeopleApiItemObject |
      SagePeopleApiItemArray
  }
}

export interface SagePeopleApiItemArrrayItem extends SagePeopleApiItem {
  source: string
}

export interface SagePeopleApiItemArray extends SagePeopleApiItem {
  type: 'array',
  data: SagePeopleApiItemArrrayItem[]
}

export interface SagePeopleApiSchema {
  version: string,
  date: string,
  data: {
    [property: string]: SagePeopleApiItem |
      SagePeopleApiItemObject |
      SagePeopleApiItemArray;
  }
}
