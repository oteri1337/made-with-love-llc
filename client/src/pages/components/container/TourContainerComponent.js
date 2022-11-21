import React from "react";
import { Helmet } from "react-helmet";
import NavComponent from "./TourNavComponent";
import BreadComponent from "./BreadComponent";
import FooterComponent from "./TourFooterComponent";
import SideNavComponent from "./TourSideNavComponent";
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
      return (
        <div className="bg app-relative app-image-hero-1">
          <div className="app-bg-overlay"></div>
          <NavComponent />
          {/* <div className=" app-py-1 center">
            <div>
              <CSSTransition
                classNames="fade"
                in={true}
                appear={true}
                timeout={300}
              >
                <div>
                  <h1 className="app-relative">{title}</h1>
                  <br />
                </div>
              </CSSTransition>
            </div>
          </div> */}
        </div>
      );
    }
  };

  const renderFooter = () => {
    const params = new URLSearchParams(location.search);
    const pwa = params.get("pwa") || props.hideFooter;

    if (!pwa) {
      return <FooterComponent />;
    }
  };

  const renderBread = () => {
    if (props.bread) {
      return (
        <React.Fragment>
          <div className="bg bg-secondary">
            <BreadComponent data={props.bread} className="container" />
          </div>
        </React.Fragment>
      );
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
          <div>{props.children}</div>
        </CSSTransition>
      </main>
      {renderFooter()}
    </React.Fragment>
  );
}

export default ContainerComponent;
