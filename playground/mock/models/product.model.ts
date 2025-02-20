import { AutoIncrement, Field, Model } from 'jsonx-mock'

@Model({ name: 'products' })
export class Product {
  @AutoIncrement()
  @Field({ type: 'number' })
  id?: number

  @Field({ type: 'string', required: true, min: 2, max: 100 })
  name?: string

  @Field({ type: 'number', min: 0 })
  price?: number

  @Field({ type: 'number', min: 0 })
  stock?: number

  @Field({ type: 'number', ref: 'categories' })
  categoryId?: number

  @Field({ type: 'array' })
  images?: string[]

  @Field({ type: 'number', min: 0, max: 5 })
  rating?: number
}
