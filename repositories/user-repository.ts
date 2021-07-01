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

    await UserModel.find({ email: user.email }, (err, data) => {
      userInDB = data;
    });

    if (AppUtils.hasValue(userInDB)) {
      throw new AlreadyExistError(
        `User with mail '${user.email}' already exist`
      );
    }

    let createdUser: User = null;

    await UserModel.create(user, (error, data) => {
      createdUser = data;
    });

    return createdUser;
  }

  // function that checks user when login occurs:
  public async getByEmail(email: string): Promise<User> {
    let userInDB: User = null;

    await UserModel.find({ email: email }, (err, data) => {
      userInDB = data;
    });

    if (!AppUtils.hasValue(userInDB)) {
      throw new NotFoundErr(`User with mail ${email} does not exist`);
    }

    return userInDB;
  }
}
