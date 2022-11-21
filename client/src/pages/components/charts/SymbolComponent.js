import React from "react";

function TradingViewSymbolComponent({ theme = "light", symbol }) {
  const iframe = React.useRef();

  React.useEffect(() => {
    var aScript = document.createElement("script");
    aScript.type = "text/javascript";
    aScript.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    aScript.innerHTML = `  {
        "symbol": "${symbol || "BTCUSD"}",
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "dateRange": "1d",
        "colorTheme": "${theme.toLowerCase() ?? "light"}",
        "isTransparent": false,
        "autosize": true,
        "largeChartUrl": ""
      }`;

    iframe.current.innerHTML = "";
    iframe.current.appendChild(aScript);
  }, [theme]);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget" />
      <div id="tradingview_3e2" />
      <div className="tradingview-widget-copyright" />
      <div ref={iframe} style={{ height: "150px", marginBottom: "15px" }}></div>
    </div>
  );
}

export default TradingViewSymbolComponent;
