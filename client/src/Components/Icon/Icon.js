import React from "react";

const Icon = (props) => {
  const { name, width } = props;

  let icon = undefined;
  try {
    icon = require(`./assets/${name}.svg`);
   }
   catch (e) {
    icon = require(`./assets/broken-image.svg`);
   }
  return (
    <>
      {name && <img width={width} src={icon} alt=""/>}
    </>
  );
};

export default Icon;
