import React from "react";

function TradingViewSliderComponent({ theme = "light" }) {
  const iframe = React.useRef();

  React.useEffect(() => {
    var aScript = document.createElement("script");
    aScript.type = "text/javascript";
    aScript.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    aScript.innerHTML = `{
"symbols": [
          {
            "title": "BTC/USD",
            "proName": "BITFINEX:BTCUSD"
          },
          {
            "title": "ETH/USD",
            "proName": "BITFINEX:ETHUSD"
          }
        ],
        "colorTheme": "${theme.toLowerCase() ?? "light"}",
        "isTransparent": false,
        "displayMode": "adaptive",
        "locale": "en"
      }`;

    iframe.current.innerHTML = "";
    iframe.current.appendChild(aScript);
  }, [theme]);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget" />
      <div id="tradingview_3e2" />
      <div className="tradingview-widget-copyright" />
      <div ref={iframe}></div>
    </div>
  );
}

export default TradingViewSliderComponent;
