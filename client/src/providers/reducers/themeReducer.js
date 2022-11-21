function themeReducer(state = "LIGHT", action) {
  switch (action.dispatch) {
    case "UPDATE_THEME":
      const root = document.querySelector(":root");
      if (action.data == "LIGHT") {
        //#151D2E
        root.style.setProperty("--primary-backgroud", "#313080");
        root.style.setProperty("--background-colour", "#f2f2f2");
        root.style.setProperty("--background-font-colour", "#000000");
        root.style.setProperty("--border-colour", "#d6d8e0");
        root.style.setProperty("--secondary-background", "#ffffff");
        root.style.setProperty("--secondary-font-colour", "#2E5067");
        root.style.setProperty(
          "--image",
          `url("/assets/images/bitcoinbg.jpg")`
        );
      } else {
        root.style.setProperty("--primary-backgroud", "#000000");
        root.style.setProperty("--background-colour", "#000000");
        root.style.setProperty("--background-font-colour", "#e3e3e3");
        root.style.setProperty("--border-colour", "#434651");
        root.style.setProperty("--secondary-background", "#1e222d");
        root.style.setProperty("--secondary-font-colour", "#898C95");
        root.style.setProperty("--image", `url("/assets/images/Slider1.jpg")`);
      }
      return action.data;
    default:
      return state;
  }
}

export default themeReducer;
