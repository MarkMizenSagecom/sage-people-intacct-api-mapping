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
  data: {
    [property: string]: SageIntactApiItem | SageIntactApiItemGroup
  }
};

export interface SageIntactApiSchema {
  version: string,
  date: string,
  data: {
    [property: string]: SageIntactApiItem | SageIntactApiItemGroup
  }
}
