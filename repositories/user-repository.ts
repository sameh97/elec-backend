import { AlreadyExistError } from "./../exeptions/already-exist-error";
import { injectable } from "inversify";
import { User } from "../common/interfaces/user";
import { AppUtils } from "../common/app-utils";
import { NotFoundErr } from "../exeptions/not-found-error";
const UserModel = require("./../models/user");

@injectable()
export class UsersRepository {
  public async save(user: User): Promise<User> {
    let userInDB: User = null;

    await UserModel.findOne({ email: user.email }, (err, user) => {
      userInDB = user;
    });

    if (AppUtils.hasValue(userInDB)) {
      throw new AlreadyExistError(
        `User with mail '${user.email}' already exist`
      );
    }

    const createdUser = new UserModel({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    await createdUser.save();

    return createdUser;
  }

  // function that checks user when login occurs:
  public async getByEmail(email: string): Promise<User> {
    let userInDB: User = null;

    await UserModel.findOne({ email: email }, (err, user) => {
      userInDB = user;
    });

    if (!AppUtils.hasValue(userInDB)) {
      throw new NotFoundErr(`User with mail ${email} does not exist`);
    }

    return userInDB;
  }
}
