export type SageIntactApiDataTypes = 'string' | 'number' | 'date' | 'boolean' | 'object' | 'array';

export interface SageIntactApiItem {
  label: string,
  length?: number,
  type?: SageIntactApiDataTypes,
  required?: boolean,
};

export interface SageIntactApiItemGroup extends SageIntactApiItem {
  type: 'object',
  length: number,
  data: SageIntactApiSchemaData
};

export interface SageIntactApiSchemaData {
  [property: string]: SageIntactApiItem | SageIntactApiItemGroup
}

export interface SageIntactApiSchema {
  data: SageIntactApiSchemaData
  version: string,
  date: string,
}

export function SageIntactApiItemTypeGuard(item: SageIntactApiItem | SageIntactApiItemGroup): item is SageIntactApiItem{
  const castItem = (item as SageIntactApiItem);
  return castItem.type === undefined || (castItem.type !== 'array' && castItem.type !== 'object');
}

export function SageIntactApiItemGroupTypeGuard(item: SageIntactApiItem | SageIntactApiItemGroup): item is SageIntactApiItemGroup{
  return (item as SageIntactApiItemGroup).type === 'object';
}
