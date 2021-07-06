import { Router } from "express";
import { injectable, inject } from "inversify";
import { AppRoute } from "../common/interfaces/app-route";
import { ProductsController } from "../controllers/product-controller";

@injectable()
export class ProductsApi implements AppRoute {
  private router: Router;

  constructor(
    @inject(ProductsController) private productsController: ProductsController
  ) {
    this.setRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  private setRoutes(): void {
    this.router = Router();

    this.router.get("/products", this.productsController.getAll);
    this.router.post("/add-product", this.productsController.createProduct);
    this.router.put("/update", this.productsController.update);
    this.router.delete("/delete/:id", this.productsController.delete);
  }
}

