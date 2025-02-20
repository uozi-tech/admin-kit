import { AutoIncrement, Field, Model } from 'jsonx-mock'

@Model({ name: 'orders' })
export class Order {
  @AutoIncrement()
  @Field({ type: 'number' })
  id?: number

  @Field({ type: 'number', ref: 'users' })
  userId?: number

  @Field({ type: 'number', min: 0, precision: 2 })
  total?: number

  @Field({
    type: 'string',
    allowed: ['pending', 'processing', 'shipped', 'cancelled'],
  })
  status?: string

  @Field({ type: 'date', defaultValue: () => new Date() })
  createdAt?: Date

  @Field({ type: 'date', onUpdate: () => new Date() })
  updatedAt?: Date
}
