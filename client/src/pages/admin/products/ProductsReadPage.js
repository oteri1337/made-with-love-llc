import React from "react";
import { Link } from "react-router-dom";
import ErrorPage from "../../tour/ErrorPage";
import { getRequestThenDispatch } from "hooks";
import ContainerComponent from "components/container/AdminContainerComponent";

function ProductReadPage({ match }) {
  const { slug } = match.params;
  const url = `/api/products/${slug}`;
  const { state, request } = getRequestThenDispatch(url, "UPDATE_PRODUCT");
  const data = state.products.object[slug];

  if (!data) {
    if (request.fetching) {
      return (
        <ContainerComponent bread={[]}>
          <div className="card-panel">Fetching data...</div>
        </ContainerComponent>
      );
    }
    return <ErrorPage />;
  }

  const nav = [
    {
      label: "Control Panel",
      link: "/control/index.html",
    },
    {
      label: "Products",
      link: "/control/products/index.html",
    },
    {
      label: "List",
      link: "/control/products/list.html",
    },
    {
      label: `${data.title}`,
    },
  ];

  const renderRow = Object.keys(data).map((key) => {
    if (
      typeof data[key] == "object" ||
      key == "description" ||
      key == "short_description"
    )
      return false;
    return (
      <tr key={key}>
        <td style={{ textTransform: "uppercase" }}>{key.replace(/_/g, " ")}</td>
        <td>{data[key]}</td>
      </tr>
    );
  });

  const renderCategories = () => {
    console.log(data);
    return data.groups?.map((group) => {
      return <p key={group.id}>{group.name}</p>;
    });
  };

  return (
    <ContainerComponent bread={nav}>
      <div className="card-panel">
        <div className="row">
          <div className="col l4 s12">
            <center>
              <img
                src={`/uploads/images/${data.image_one}`}
                className="responsive-img"
              />

              <div>
                <br />
                <Link
                  to={{
                    pathname: `/control/products/${data.slug}/updateimage`,
                    data,
                  }}
                  className="btn"
                >
                  Update Image
                </Link>
                <br />
                <br />
                <Link
                  to={`/control/products/${data.slug}/update`}
                  className="btn"
                >
                  Update Product
                </Link>
                <br />
                <br />
                <Link
                  to={{
                    pathname: `/control/products/${data.slug}/updategroups`,
                  }}
                  className="btn"
                >
                  Update Categories
                </Link>
                <br />
                <h2>Categories</h2>
                {renderCategories()}
              </div>
            </center>
          </div>
          <div className="col l8 s12">
            <pre>{data.description}</pre>
            <table className="striped">
              <tbody>{renderRow}</tbody>
            </table>
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default ProductReadPage;
