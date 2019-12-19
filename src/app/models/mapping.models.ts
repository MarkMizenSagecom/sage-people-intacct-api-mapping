import { ElementRef } from '@angular/core';

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

export interface MappingListCategories {
  [category: string]: {
    label: string,
    order: number,
  }
}

export interface MappingListItemTargets {
  from:{ [label:string]: ElementRef },
  to: { [label:string]: ElementRef }
}

export interface MappingListData {
  [item: string]: MappingItem
}

export interface MappingRelationship {
  to: string,
  from: string,
  highlight?: boolean
}

export interface MappingDataComplete {
  from: MappingListData,
  to: MappingListData,
  relationships: MappingRelationship[]
}

export interface MappingOutput {
  [intacctProperty:string]: string | MappingOutput
}
