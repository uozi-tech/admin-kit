import { AutoIncrement, Field, Model } from 'jsonx-mock'

@Model({ name: 'categories' })
export class Category {
  @AutoIncrement()
  @Field({ type: 'number' })
  id?: number

  @Field({ type: 'string', required: true, min: 2, max: 30 })
  name?: string
}
