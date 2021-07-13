import { Router } from "express";
import { injectable, inject } from "inversify";
import { AppRoute } from "../common/interfaces/app-route";
import { CartController } from "../controllers/cart-controller";
import { CategoryController } from "../controllers/category-controller";

@injectable()
export class CategoryApi implements AppRoute {
  private router: Router;

  constructor(
    @inject(CategoryController) private categoryController: CategoryController
  ) {
    this.setRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  private setRoutes(): void {
    this.router = Router();

    this.router.post("/category/add", this.categoryController.create);
    this.router.post("/category/categorys", this.categoryController.getAll);
    this.router.put("/category/update", this.categoryController.update);
    this.router.delete("/category/delete/:id", this.categoryController.delete);
  }
}
