import { AutoIncrement, Field, Model } from 'jsonx-mock'

@Model({ name: 'tags' })
export class Tag {
  @AutoIncrement()
  @Field({ type: 'number' })
  id?: number

  @Field({ type: 'string', required: true, unique: true, min: 2, max: 20 })
  name?: string

  @Field({ type: 'array', itemType: 'number', ref: 'posts' })
  postIds?: number[]
}
