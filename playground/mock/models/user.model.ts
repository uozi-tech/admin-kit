import { AutoIncrement, Field, Model } from 'jsonx-mock'

@Model({ name: 'users' })
export class User {
  @AutoIncrement()
  @Field({ type: 'number' })
  id?: number

  @Field({ type: 'string', required: true, min: 2, max: 50, filterable: true })
  name?: string

  @Field({ type: 'number', min: 0, max: 150 })
  age?: number

  @Field({ type: 'string', required: true, min: 2, max: 50, filterable: true })
  email?: string

  @Field({ type: 'string', required: true, min: 2, max: 50, filterable: true })
  password?: string

  @Field({ type: 'number', required: true, filterable: true })
  status?: number
}
