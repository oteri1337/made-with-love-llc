import React, { Fragment } from "react";
import { AppContext } from "providers/AppProvider";
import { getRequest } from "functions/http";

const PaginationComponent = function (props) {
  const { callReducer } = React.useContext(AppContext);
  const [fetching, setFetching] = React.useState(false);

  const list = props.list || [];

  if (list.current_page === undefined || list.last_page == 1) {
    return <Fragment />;
  }

  const onClick =
    props.onClick ||
    (async () => {
      setFetching(true);
      const { errors, data } = await getRequest(props.list.next_page_url);
      if (errors.length === 0) {
        callReducer({ dispatch: props.dispatch, data });
      }
      setFetching(false);
    });

  const renderNextButton = () => {
    if (!list.next_page_url) {
      return <Fragment />;
    }

    if (fetching) {
      return (
        <div id="fetching">
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-blue">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <i className="material-icons notranslate" onClick={onClick} id="next">
        chevron_right
      </i>
    );
  };

  return (
    <center>
      <ul className="pagination">
        {renderNextButton()}
        {
          <li>
            ({list.current_page} / {list.last_page})
          </li>
        }
      </ul>
    </center>
  );
};

export default PaginationComponent;
