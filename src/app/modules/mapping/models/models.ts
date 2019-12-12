export interface ApiRelationship {
  from: string,
  to: string
}

export interface ApiRelationships {
  [index: number]: ApiRelationship
}

export interface ApiProperty {
  name: string,
  index: number
}

export interface ApiProperties {
  [property: string]: ApiProperty
}

