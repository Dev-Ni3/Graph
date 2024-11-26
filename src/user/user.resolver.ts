import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query(() => [User], { name: 'findAll' })
    findAll() {
        return this.userService.findAll()
    }

    @Mutation(() => User)
  async create(
    @Args('userDto') userDto: UserDto
  ) {
    return this.userService.create(userDto);  // This returns the full user object with id
  }


}
