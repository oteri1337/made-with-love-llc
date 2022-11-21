import React from "react";
import { format } from "functions/dom";
import { Link } from "react-router-dom";
import ErrorPage from "../tour/ErrorPage";
import { getRequestThenDispatch } from "hooks";
import ListComponent from "components/ListComponent";
import ContainerComponent from "components/container/TourContainerComponent";

function CategoryReadPage({ match }) {
  const { slug, sub } = match.params;
  const dispatch = "UPDATE_GROUP";
  const { state, callReducer } = getRequestThenDispatch(
    `/api/groups/${sub}`,
    dispatch
  );

  const parent = state.parentgroups.object[slug];

  if (!parent) {
    return <ErrorPage />;
  }

  const data = state.groups.object[sub];
  const array = data?.products;

  const nav = [
    {
      label: "Categories",
      link: "/shop/categories/list.html",
    },
    {
      label: parent.name,
      link: `/shop/categories/${parent.slug}`,
    },
    {
      label: data.name,
    },
  ];

  const callback = function (props) {
    const renderCartButton = (data) => {
      if (state.cart[data.id]) {
        //prettier-ignore
        return <a onClick={() => {callReducer({ dispatch: "REMOVE_FROM_CART", data });}}>
          <span className="material-icons notranslate">remove_shopping_cart</span> Remove
        </a>
      }

      return (
        //prettier-ignore
        <a onClick={() => {callReducer({ dispatch: "ADD_TO_CART", data });}}>
          <span className="material-icons notranslate">add_shopping_cart</span> Add
        </a>
      );
    };
    return (
      <div className="col l4 m6 s6" key={props.id}>
        <div className="card animated fadeInUp">
          <div className="card-image">
            <img src={`/uploads/images/${props.image_one}`} />
          </div>
          <div className="card-content">
            <center>
              <Link to={{ pathname: `/shop/products/${props.slug}`, props }}>
                {props.title}
              </Link>
              <br />
              <p>{format("USD", props.price)}</p>
            </center>
          </div>
          <div className="card-action" style={{ fontSize: "1rem" }}>
            <center>
              {renderCartButton(props)}
              <Link to="/shop/cart.html" className="waves-effect">
                <span className="material-icons notranslate">
                  shopping_cart
                </span>
                Cart
              </Link>
            </center>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="container row">
        <br />
        <ListComponent {...{ array, callback }} />
      </div>
    </ContainerComponent>
  );
}

export default CategoryReadPage;
