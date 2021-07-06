import { Container } from "inversify";
import { ProductDtoMapper } from "./common/dto-mappers/product-dto-mapper";
import { UserDtoMapper } from "./common/dto-mappers/user-dto-mapper";
import { Logger } from "./common/logger";
import { AppDBConnection } from "./config/database";
import { ProductsController } from "./controllers/product-controller";
import { UserController } from "./controllers/user-controller";
import { ProductsRepository } from "./repositories/product-repository";
import { UsersRepository } from "./repositories/user-repository";
import { ProductsApi } from "./routes/product-api";
import { UsersApi } from "./routes/user-api";
import { PasswordManagerService } from "./services/password-manager-service";
import { ProductsService } from "./services/product-service";
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

container.bind<ProductsApi>(ProductsApi).toSelf();
container.bind<ProductsController>(ProductsController).toSelf();
container.bind<ProductsService>(ProductsService).toSelf();
container.bind<ProductsRepository>(ProductsRepository).toSelf();
container.bind<ProductDtoMapper>(ProductDtoMapper).toSelf();

export default container;
