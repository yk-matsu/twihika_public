import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { User } from 'src/user-subscription/user.graphql.model';
import { pubsub } from '../client.pubsub';

@Resolver()
export class UserResolver {
  // QueryがないとGraphqlSchemaの生成時に怒られる
  @Query(() => User, { description: 'User,ID指定単数取得' })
  async sample(@Args('userId') input: string): Promise<User> {
    return {
      id: 'sample',
      email: 'sample@gmail.com',
      gender: 'MALE',
      name: 'hello',
    };
  }

  @Subscription((returns) => User,{
    filter(this: UserResolver, payload, variables, context) {
      console.log(payload)
      console.log(variables)
      console.log(context)
      // "this" refers to an instance of "AuthorResolver"
      return context.userId == payload.userSIgnUp.email
    }
  })
  userSignUp() {
    return pubsub.asyncIterator(['userSignUp']);
  }
  @Subscription((returns) => User)
  userDelete() {
    return pubsub.asyncIterator(['userDelete']);
  }
}
