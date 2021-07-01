import { AppUtils } from "../app-utils";
import { injectable } from "inversify";
import { User } from "../../common/interfaces/user";
import { UserDto } from "../../common/interfaces/user-dto";

@injectable()
export class UserDtoMapper {
  public asDto(user: User): UserDto {
    if (!AppUtils.hasValue(user)) {
      return null;
    }
    return {
      email: user.email,
      name: user.name,
    } as UserDto;
  }

  public asEntity(userDto: UserDto): User {
    if (!AppUtils.hasValue(userDto)) {
      return null;
    }
    return {
      email: userDto.email,
      name: userDto.name,
      password: userDto.password,
    } as User;
  }
}
