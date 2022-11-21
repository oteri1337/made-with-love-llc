import React from "react";
import { Helmet } from "react-helmet";
import NavComponent from "./UserNavComponent";
import BreadComponent from "./BreadComponent";
import SideNavComponent from "./UserSideNavComponent";
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
          <div>{props.children}</div>
        </CSSTransition>
        <br />
      </main>
    </React.Fragment>
  );
}

export default ContainerComponent;

// import React from "react";
// import HeaderComponent from "./UserHeaderComponent";
// import FooterComponent from "./UserFooterComponent";
// import BreadComponent from "./BreadComponent";
// import ReactCSSTransitionGroup from "react-transition-group/CSSTransition";

// function ContainerComponent(props) {
//   const showFooter = props.showFooter ?? true;

//   const getClassName = () => {
//     if (props.bread) {
//       return "container app-my-1";
//     }

//     return "";
//   };

//   const renderFooter = () => {
//     if (showFooter) {
//       return <FooterComponent />;
//     }
//   };

//   return (
//     <React.Fragment>
//       <HeaderComponent />
//       <main className={getClassName()}>
//         {props.bread?.length ? (
//           <BreadComponent data={props.bread} />
//         ) : (
//           <React.Fragment />
//         )}
//         <ReactCSSTransitionGroup
//           classNames="fade"
//           in={true}
//           appear={true}
//           timeout={600}
//         >
//           <div>{props.children}</div>
//         </ReactCSSTransitionGroup>
//       </main>
//       {renderFooter()}
//     </React.Fragment>
//   );
// }

// export default ContainerComponent;
