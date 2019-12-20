import { MappingRelationship, MappingListData, MappingListCategories } from './mapping.models';

export interface StorageDataFormat {
  id: string,
  name: string,
  lastUpdated?: number,
  data: {
    output?: string,
    mapping: MappingRelationship[],
    from: {
      properties: MappingListData,
      categories: MappingListCategories,
    },
    to: {
      properties: MappingListData,
      categories: MappingListCategories,
    }
  }
}
