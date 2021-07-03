import { Router } from "express";
import { injectable, inject } from "inversify";
import { AppRoute } from "../common/interfaces/app-route";
import { UserController } from "../controllers/user-controller";

@injectable()
export class UsersApi implements AppRoute {
  private router: Router;

  constructor(@inject(UserController) private usersController: UserController) {
    this.setRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  private setRoutes(): void {
    this.router = Router();

    this.router.post("/login", this.usersController.login);
    this.router.post("/register", this.usersController.createUser);
  }
}
