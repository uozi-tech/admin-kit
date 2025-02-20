import { AutoIncrement, Field, Model } from 'jsonx-mock'

@Model({ name: 'comments' })
export class Comment {
  @AutoIncrement()
  @Field({ type: 'number' })
  id?: number

  @Field({ type: 'string', required: true, min: 1, max: 500 })
  content?: string

  @Field({ type: 'number', ref: 'posts' })
  postId?: number

  @Field({ type: 'number', ref: 'users' })
  userId?: number

  @Field({ type: 'date', defaultValue: () => new Date() })
  createdAt?: Date
}
