import { hash } from "bcryptjs";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return `Hello world`
  }

  @Mutation(() => Boolean)
  async signup(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      const findUser = await User.findOne({ where: { email } })
      if (findUser) throw new Error("User with that email already exist")
      User.insert({
        email,
        password: await hash(password, 12),
        username: email.split("@")[0]
      })
    } catch (error: any) {
      console.error(error)
      throw new Error(error)

    }
  }
}