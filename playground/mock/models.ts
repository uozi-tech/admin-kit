import { AutoIncrement, Field, Model } from 'jsonx-mock'

@Model({ name: 'users' })
export class User {
  @AutoIncrement()
  @Field({ type: 'number' })
  id?: number

  @Field({ type: 'string', required: true, min: 2, max: 50 })
  name?: string

  @Field({ type: 'number', min: 0, max: 150 })
  age?: number
}

@Model({ name: 'posts' })
export class Post {
  @AutoIncrement()
  @Field({ type: 'number' })
  id?: number

  @Field({ type: 'string', required: true })
  title?: string

  @Field({ type: 'string' })
  content?: string

  @Field({ type: 'number', ref: 'user' })
  authorId?: number
}
