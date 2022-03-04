import { IsEmail } from "class-validator";
import "reflect-metadata";
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
} from "type-graphql";
import sendVerfCode from "../account/sendVerfCode";
import { createUser, CreateUserInput } from "../account/createUser";
import { Context } from "./context";
import { User } from "./types";

@InputType()
class UserUniqueInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  email: string;
}

@InputType()
class CreateCredentialAuthenticatedUserInput extends CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  picture: string;

  @Field()
  password: string;
}
// UserCreate is handled in the nextauth api route

@Resolver(User)
export class UserResolver {
  @Mutation((returns) => User)
  async createCredentialAuthenticatedUser(
    @Arg("input") input: CreateCredentialAuthenticatedUserInput,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    createUser(input);
    sendVerfCode(input.email, input.name);
    return true;
    // the client should now initiate a login using the email and password
  }

  @Query(() => User)
  async currentUser(@Ctx() ctx: Context) {
    // TODO get current user from context
    return ctx.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
  }

  @Query(() => [User])
  async allUsers(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany();
  }
}
