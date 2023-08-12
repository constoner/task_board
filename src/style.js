// HTML, BODY and ROOT styles for making App fullscreen on mobile

export const documentStyle = (elem) => {
  const htmlElement = document.querySelector("html");
  const bodyElement = document.querySelector("body");

  const htmlStyle = {
    height: "100%",
  };

  const bodyStyle = {
    position: "fixed",
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    touchAction: "none",
    overflow: "hidden",
  };

  const rootStyle = {
    minHeight: "100%",
    height: "100%",
  };

  Object.assign(htmlElement.style, htmlStyle);
  Object.assign(bodyElement.style, bodyStyle);
  Object.assign(elem.style, rootStyle);

  document.body.ontouchstart = (evt) => {
    evt.preventDefault();
  };
};
