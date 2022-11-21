import React from "react";
import { Helmet } from "react-helmet";
import BreadComponent from "./BreadComponent";
import NavComponent from "./AdminNavComponent";
import SideNavComponent from "./AdminSideNavComponent";
import { CSSTransition } from "react-transition-group";

function ContainerComponent(props) {
  const bread = props.bread || [];
  const title = bread[bread.length - 1]?.label || "";

  React.useEffect(() => {
    scrollTo(0, 0);
  }, []);

  React.useLayoutEffect(() => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
  }, []);

  const renderHeader = () => {
    const renderHeader = props.renderHeader ?? true;
    if (renderHeader) {
      return <NavComponent />;
    }
  };

  const renderBread = () => {
    if (props.bread) {
      return <BreadComponent data={props.bread} className="container" />;
    }
    return <Helmet title={PWA_NAME} />;
  };

  return (
    <React.Fragment>
      <main style={{ minHeight: "75vh" }}>
        {renderHeader()}
        <SideNavComponent />
        {renderBread()}
        <CSSTransition classNames="fade" in={true} appear={true} timeout={300}>
          <div className="container">{props.children}</div>
        </CSSTransition>
        <br />
      </main>
    </React.Fragment>
  );
}

export default ContainerComponent;
