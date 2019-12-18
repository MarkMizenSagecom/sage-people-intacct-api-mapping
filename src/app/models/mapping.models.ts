export type MappingItemTypes = 'string' | 'number' | 'boolean' | 'date';

export interface MappingItem {
  label: string,
  ref: string,
  type: MappingItemTypes,
  length: number,
  order: number,
  category?: string,
  required?: false,
  middlePosition?: number,
  state?: 'selected' | 'highlighted' | 'disabled',
}

export interface MappingListCategory {
  [category: string]: {
    label: string,
    order: number,
  }
}

export interface MappingListData {
  [item: string]: MappingItem
}
