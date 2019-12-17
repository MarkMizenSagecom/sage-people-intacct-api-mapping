export interface ApiRelationship {
  from: string,
  to: string
}

export interface ApiProperty {
  id: string,
  name: string,
  index: number,
  type?: 'string' | 'number' | 'checkbox',
  state?: 'selected' | 'highlighted' | 'disabled',
  group?: string,
}

export interface ApiProperties {
  [property: string]: ApiProperty | ApiPropertyGroupHeading;
}

export interface ApiPropertyGroupHeading {
  id: string,
  groupTitle: string,
  index: number,
  type?: 'string' | 'number' | 'checkbox',
  state?: 'selected' | 'highlighted' | 'disabled',
  group?: string,
}
