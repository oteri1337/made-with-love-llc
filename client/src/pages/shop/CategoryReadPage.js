import React from "react";
import { Link } from "react-router-dom";
import { getRequestThenDispatch } from "hooks";
import ListComponent from "components/ListComponent";
import ContainerComponent from "components/container/TourContainerComponent";

function CategoryReadPage({ match }) {
  const { slug } = match.params;
  const { state } = getRequestThenDispatch(
    `/api/parentgroups/${slug}`,
    "UPDATE_PARENTGROUP"
  );

  const data = state.parentgroups.object[slug];
  const array = data.groups;

  const nav = [
    {
      label: "Categories",
      link: "/shop/categories/list.html",
    },
    {
      label: data.name,
    },
  ];

  const callback = (props) => {
    return (
      <li className="collection-item" key={props.id}>
        <Link to={`/shop/categories/${slug}/${props.slug}`}>{props.name}</Link>
      </li>
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
