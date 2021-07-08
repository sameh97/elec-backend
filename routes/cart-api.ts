import { Router } from "express";
import { injectable, inject } from "inversify";
import { AppRoute } from "../common/interfaces/app-route";
import { CartController } from "../controllers/cart-controller";

@injectable()
export class CartApi implements AppRoute {
  private router: Router;

  constructor(@inject(CartController) private cartController: CartController) {
    this.setRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  private setRoutes(): void {
    this.router = Router();

    this.router.post("/add-to-cart/:user_id", this.cartController.addToCart);
    // this.router.post("/add-product", this.productsController.createProduct);
    // this.router.put("/update", this.productsController.update);
    // this.router.delete("/delete/:id", this.productsController.delete);
  }
}
