import React from "react";

function SliderOne() {
	React.useEffect(() => {
		console.log("slider one mounts");
	}, []);

	return <div>slider one</div>;
}

function SliderTwo() {
	React.useEffect(() => {
		console.log("slider two mounts");
	}, []);

	return <div>slider two</div>;
}

function ReactSliderComponent() {
	let [current, setCurrent] = React.useState(1);

	React.useEffect(() => {
		setTimeout(() => {
			if (current == 1) {
				setCurrent(2);
			}
			if (current == 2) {
				setCurrent(1);
			}
		}, 5000);
	}, [current]);

	const renderSlide = () => {
		if (current == 1) {
			return <SliderOne />;
		}

		if (current == 2) {
			return <SliderTwo />;
		}
	};

	return <div>{renderSlide()}</div>;
}

export default ReactSliderComponent;
