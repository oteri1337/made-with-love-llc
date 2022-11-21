import React from "react";
import TourSliderOneComponent from "./TourSliderOneComponent";
import TourSliderTwoComponent from "./TourSliderTwoComponent";
import TourSliderThreeComponent from "./TourSliderThreeComponent";

function TourSliderComponent({ parentRef }) {
  React.useLayoutEffect(() => {
    const elems = document.querySelectorAll(".carousel.top");
    M.Carousel.init(elems, {
      fullWidth: true,
      indicators: true,
    });

    const elem = document.querySelector("#topcar");

    const instance = M.Carousel.getInstance(elem);

    const nextImage = () => {
      instance.next();
      // const classList = parentRef.current.classList;

      // if (classList.contains("app-vh-image")) {
      //   classList.remove("app-vh-image");
      //   classList.add("app-vh-image-2");
      //   return;
      // }

      // if (classList.contains("app-vh-image-2")) {
      //   classList.remove("app-vh-image-2");
      //   classList.add("app-vh-image-3");
      //   return;
      // }

      // if (classList.contains("app-vh-image-3")) {
      //   classList.remove("app-vh-image-3");
      //   classList.add("app-vh-image");
      // }
    };

    const interval = setInterval(nextImage, 1 * 2500 * 3);

    return () => {
      instance.destroy();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="app-flex-vh app-flex-center">
      <div
        className="carousel top carousel-slider"
        id="topcar"
        style={{ zIndex: 1 }}
      >
        <div className="carousel-item ">
          <TourSliderOneComponent />
        </div>
        <div className="carousel-item">
          <TourSliderTwoComponent />
        </div>
        <div className="carousel-item">
          <TourSliderThreeComponent />
        </div>
      </div>
    </div>
  );
}

export default TourSliderComponent;
