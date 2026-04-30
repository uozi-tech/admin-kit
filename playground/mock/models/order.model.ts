import { AutoIncrement, Field, Model } from 'jsonx-mock'

@Model({ name: 'orders' })
export class Order {
  @AutoIncrement()
  @Field({ type: 'number' })
  id?: number

  @Field({ type: 'number', ref: 'users' })
  userId?: number

  @Field({ type: 'number', min: 0 })
  total?: number

  @Field({ type: 'string' })
  status?: string

  @Field({ type: 'date' })
  createdAt?: Date

  @Field({ type: 'date' })
  updatedAt?: Date
}
