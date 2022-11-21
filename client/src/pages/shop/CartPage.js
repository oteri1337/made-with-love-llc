import React from "react";
import CartComponent from "./components/CartComponent";
import CheckoutFormComponent from "./components/CheckoutFormComponent";
import TourContainerComponent from "components/container/TourContainerComponent";

function CartPage() {
  const nav = [
    {
      label: "Shop",
      link: "/shop/products.html",
    },
    {
      label: "Cart",
    },
  ];

  return (
    <TourContainerComponent bread={nav}>
      <div className="container">
        <CartComponent />
        <div className="row">
          <div className="col l8 offset-l2 s12">
            <div className="card-panel app-my-1">
              <center>
                <p>please complete checkout form to place order</p>
              </center>
              <CheckoutFormComponent />
            </div>
          </div>
        </div>
      </div>
    </TourContainerComponent>
  );
}
export default CartPage;
