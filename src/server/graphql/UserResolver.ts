import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  InputType,
  Field,
} from 'type-graphql'
import { Context } from './context'
import { User } from './User'

@InputType()
class UserUniqueInput {
  @Field({ nullable: true })
  id: number

  @Field({ nullable: true })
  email: string
}

@InputType()
class CreateCredentialAuthenticatedUserInput {

  @Field()
  email: string

  @Field()
  name: string

  @Field({ nullable: true })
  picture: string

  @Field()
  password: string
}
// UserCreate is handled in the nextauth api route

@Resolver(User)
export class UserResolver {

  @Mutation((returns) => User)
  async createCredentialAuthenticatedUser(
    @Arg('input') input: CreateCredentialAuthenticatedUserInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    ctx.prisma.user.create({
      data: {
        TODO
      }
    })
    return getUserData
  }

  @Query(() => User)
  async get(@Root() user: User, @Ctx() ctx: Context) {
    return ctx.prisma.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
  }

  @Query(() => [User])
  async allUsers(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany()
  }
}
