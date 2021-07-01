import { inject, injectable } from "inversify";
import { AuthenticationError } from "../exeptions/authentication-error";
import { User } from "../common/interfaces/user";
import { UsersRepository } from "../repositories/user-repository";
import { PasswordManagerService } from "./password-manager-service";
import { AppDBConnection } from "../config/database";
import { AppUtils } from "../common/app-utils";

@injectable()
export class UserService {
  public static TOKEN_SECRET = "asfwsgvwregwegfrgfwg"; // TODO: use env. variable

  private static readonly TOKEN_EXPIRATION_HOURS = 240;
  constructor(
    @inject(UsersRepository) private usersRepository: UsersRepository,
    @inject(PasswordManagerService)
    private passwordManager: PasswordManagerService,
    @inject(AppDBConnection) private appDBconnection: AppDBConnection
  ) {}

  public async login(email: string, password: string): Promise<User> {
    const userInDB = await this.usersRepository.getByEmail(email);

    const isPasswordOk = await this.passwordManager.isEqual(
      password,
      userInDB.password
    );
    if (!isPasswordOk) {
      throw new AuthenticationError(`User with ${email} not authenticated`);
    }

    return userInDB;
  }

  public async create(user: User): Promise<User> {
    try {
      const hashedPassword = await this.passwordManager.hashAndSalt(
        user.password
      );

      user.password = hashedPassword;

      const createdUser = await this.usersRepository.save(user);

      return createdUser;
    } catch (err) {
      console.log(
        `Error while creating user , error: ${AppUtils.getFullException(err)}`
      );
      throw err;
    }
  }
}
