const setNameStyle = (type, color) => {

  const StyleEditName = {
    display: "flex",
    position: "relative",
    "&::before": {
      display: () => (!type ? "block" : "none"),
      content: "''",
      position: "absolute",
      bottom: "0",
      width: "100%",
      height: "1px",
      backgroundColor: color,
    },
  };

  return StyleEditName;
}

export default setNameStyle;
