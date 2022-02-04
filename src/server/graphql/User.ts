import 'reflect-metadata'
import { ObjectType, Field, ID } from 'type-graphql'
import { IsDate, IsEmail } from 'class-validator'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  emails: string[]

  @Field()
  name?: string

  @Field()
  picture: string

  @Field()
  @IsDate()
  createdAt: Date

  @Field()
  @IsDate()
  updatedAt: Date

  @Field()
  deleted: boolean

  @Field((type) => [Date], { nullable: true })
  deletedAt: Date | null
}