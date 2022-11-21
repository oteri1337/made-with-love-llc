import React from "react";
import { AppContext } from "providers/AppProvider";
import TradingViewSlider from "components/charts/SliderComponent";
import TourNavComponent from "components/container/TourNavComponent";
import TourSliderComponent from "components/tour/TourSliderComponent";
import TourWalletComponent from "components/tour/TourWalletComponent";
import TourServicesComponent from "components/tour/TourServicesComponent";
import ContainerComponent from "components/container/TourContainerComponent";
import TourGetStartedComponent from "components/tour/TourGetStartedComponent";

function HomePage() {
  const { state } = React.useContext(AppContext);
  const parent = React.useRef();

  return (
    <ContainerComponent renderHeader={false}>
      <div className="app-relative bg app-vh-image">
        <div className="app-bg-overlay"></div>
        <TourNavComponent />
        <div ref={parent}>
          <TourSliderComponent parentRef={parent} />
        </div>
      </div>
      <TradingViewSlider theme={state.theme} />
      <TourGetStartedComponent />
      <TourWalletComponent />
      <TourServicesComponent />
    </ContainerComponent>
  );
}

export default HomePage;
