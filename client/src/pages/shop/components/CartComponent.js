import React from "react";
import { format } from "functions/dom";
import { AppContext } from "providers/AppProvider";

function CartComponent() {
  const { state, callReducer } = React.useContext(AppContext);
  const { cart } = state;

  // const onChange = ({ target }) => {
  //   let { id, value } = target;

  //   callReducer({ dispatch: "UPDATE_QUANTITY", data: { id, value } });
  // };

  const removeFromCart = (id) => {
    callReducer({ dispatch: "REMOVE_FROM_CART", data: { id } });
  };

  let total = 0;

  const products = Object.keys(cart).map((id) => {
    const product = cart[id];

    total = total + product.price * product.quantity;

    const updateQuantity = (id, value) => {
      if (value >= product.min_order && value <= product.max_order) {
        callReducer({ dispatch: "UPDATE_QUANTITY", data: { id, value } });
      }
    };

    return (
      <div className="col l4 s12" key={product.id}>
        <div className="card-panel app-my-1 center">
          <img
            src={`/uploads/images/${product.image_one}`}
            className="responsive-img"
          />
          <br />

          <h1 style={{ fontWeight: "bold" }}>{product.title} </h1>
          <br />
          {format("USD", product.price)}
          <br />
          <br />

          <div>
            <button
              className="cart-button"
              onClick={() => updateQuantity(product.id, product.quantity - 1)}
            >
              -
            </button>
            <input
              id={product.id}
              min={product.min_order}
              max={product.max_order}
              value={product.quantity}
              type="number"
              onChange={(e) => updateQuantity(e.target.id, e.target.value)}
              style={{
                width: "100px",
                textAlign: "center",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
            <button
              className="cart-button"
              onClick={() => updateQuantity(product.id, product.quantity + 1)}
            >
              +
            </button>
          </div>

          <br />
          <br />
          <button
            className="btn"
            onClick={() => {
              removeFromCart(product.id);
            }}
          >
            REMOVE FROM CART
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <br />
      <center>
        <b>TOTAL: {format("USD", total)}</b>
        <div className="row">{products}</div>
        <b>TOTAL: {format("USD", total)}</b>
      </center>
    </div>
  );

  // Object.keys(cart).map((key) => {
  // const item = cart[key];
  // total = total + item.price * item.quantity;
  //   return (
  //     <div key={key} className="app-my-3">
  //       {renderCartButton(item)}
  //       <br />
  //       <br />
  // <img
  //   src={`/uploads/images/${item.image_one}`}
  //   className="responsive-img"
  //   style={{ maxHeight: "100px" }}
  // />
  // <p>{item.title} </p>
  // <p>${item.price}</p>
  //       <div className="app-flex">
  //         <div className="app-flex-1">Quantity:</div>
  //         <div className="app-flex-1">
  //           <input
  //             id={item.id}
  //             min={item.min_order}
  //             max={item.max_order}
  //             value={item.quantity}
  //             type="number"
  //             onChange={onChange}
  //           />
  // <hr />

  //         </div>
  //       </div>
  //     </div>
  //   );
  // });

  // return (
  //   <div>
  //     <p>Total ${total}</p>
  //     {renderedCart}
  //     <p>Total ${total}</p>
  //   </div>
  // );
}

export default CartComponent;
