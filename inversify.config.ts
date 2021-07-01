import { Container } from "inversify";
import { UserDtoMapper } from "./common/dto-mappers/user-dto-mapper";
import { Logger } from "./common/logger";
import { AppDBConnection } from "./config/database";
import { UserController } from "./controllers/user-controller";
import { UsersRepository } from "./repositories/user-repository";
import { UsersApi } from "./routes/user-api";
import { PasswordManagerService } from "./services/password-manager-service";
import { UserService } from "./services/user-service";

const container = new Container({ defaultScope: "Singleton" });

container.bind<AppDBConnection>(AppDBConnection).toSelf();
container.bind<UserDtoMapper>(UserDtoMapper).toSelf();
container.bind<UsersRepository>(UsersRepository).toSelf();
container.bind<UserService>(UserService).toSelf();
container.bind<UserController>(UserController).toSelf();
container.bind<PasswordManagerService>(PasswordManagerService).toSelf();
container.bind<UsersApi>(UsersApi).toSelf();
container.bind<Logger>(Logger).toSelf();

export default container;
