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

    this.router.post("/add-to-cart", this.cartController.addToCart);
    this.router.get("/cart", this.cartController.getCartByUserId);
    // this.router.put("/update", this.productsController.update);
    this.router.delete("/cart/delete", this.cartController.delete);
  }
}
