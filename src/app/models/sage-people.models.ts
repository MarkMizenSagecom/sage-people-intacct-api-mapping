export type SagePeopleApiDataTypes = 'string' | 'number' | 'date' | 'boolean' | 'object' | 'array';

export interface SagePeopleApiItem {
  label: string,
  type?: SagePeopleApiDataTypes,
  length?: number,
  required?: boolean,
}

export interface SagePeopleApiItemObject extends SagePeopleApiItem {
  type: 'object',
  data: SagePeopleApiSchemaData
}

export interface SagePeopleApiItemArrayItem extends SagePeopleApiItem {
  source: string
}

export interface SagePeopleApiItemArray extends SagePeopleApiItem {
  type: 'array',
  data: SagePeopleApiItemArrayItem[]
}

export interface SagePeopleApiSchemaData {
  [property: string]: SagePeopleApiItem |
      SagePeopleApiItemObject |
      SagePeopleApiItemArray;
}

export interface SagePeopleApiSchema {
  version: string,
  date: string,
  data: SagePeopleApiSchemaData
}

export function SagePeopleApiItemTypeGuard(item: SagePeopleApiItem | SagePeopleApiItemObject | SagePeopleApiItemArray): item is SagePeopleApiItem {
  const castItem = (item as SagePeopleApiItem);
  return castItem.type === undefined || (castItem.type !== 'array' && castItem.type !== 'object');
}

export function SagePeopleApiItemObjectTypeGuard(item: SagePeopleApiItem | SagePeopleApiItemObject | SagePeopleApiItemArray): item is SagePeopleApiItemObject {
  return (item as SagePeopleApiItemObject).type === 'object';
}

export function SagePeopleApiItemArrayTypeGuard(item: SagePeopleApiItem | SagePeopleApiItemObject | SagePeopleApiItemArray): item is SagePeopleApiItemObject {
  return (item as SagePeopleApiItemArray).type === 'array';
}
