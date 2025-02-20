import { AutoIncrement, Field, Model } from 'jsonx-mock'

@Model({ name: 'posts' })
export class Post {
  @AutoIncrement()
  @Field({ type: 'number' })
  id?: number

  @Field({ type: 'string', required: true })
  title?: string

  @Field({ type: 'string' })
  content?: string

  @Field({ type: 'number', ref: 'users' })
  authorId?: number
}
