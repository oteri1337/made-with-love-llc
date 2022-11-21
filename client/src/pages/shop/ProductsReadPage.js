import React from "react";
import { format } from "functions/dom";
import { Link } from "react-router-dom";
import { getRequestThenDispatch } from "hooks";
import TourContainerComponent from "components/container/TourContainerComponent";

function ProductReadPage({ match, location }) {
  const { slug } = match.params;
  const { state, callReducer } = getRequestThenDispatch(
    `/api/products/${slug}`,
    "UPDATE_PRODUCT"
  );

  const data = state.products.object[slug] || location.props;

  if (!data) {
    return (
      <TourContainerComponent>
        <div className="container app-mt-2">
          <div className="card-panel">Not Found</div>
        </div>
      </TourContainerComponent>
    );
  }

  const nav = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: data.title,
    },
  ];

  const renderCartButton = (data) => {
    const cart = state.cart;

    if (cart[data.id]) {
      //prettier-ignore
      return <a className="btn" onClick={() => {callReducer({ dispatch: "REMOVE_FROM_CART", data });}}>
        Remove from cart
      </a>
    }

    return (
      //prettier-ignore
      <a className="btn" onClick={() => {callReducer({ dispatch: "ADD_TO_CART", data });}}>
        Add to cart
      </a>
    );
  };

  return (
    <TourContainerComponent bread={nav}>
      <div className="container app-mt-2">
        <div className="card-panel">
          <div className="row">
            <div className="col l4 s12 center">
              <img
                src={`/uploads/images/${data.image_one}`}
                className="responsive-img"
              />
              <br />

              <p>{format("USD", data.price)}</p>
              {renderCartButton(data)}
            </div>
            <div className="col l8 s12">
              <div className="container">
                <h1 style={{ fontWeight: "bold" }}>{data.title}</h1>

                <pre>{data.description}</pre>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </TourContainerComponent>
  );
}

export default ProductReadPage;
