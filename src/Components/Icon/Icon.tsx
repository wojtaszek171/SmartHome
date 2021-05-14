import React, { FC } from "react";

interface IconProps {
  name: string;
  className?: string;
  width?: string;
}

const Icon: FC<IconProps> = (props) => {
  const { name } = props;

  let icon = undefined;
  try {
    icon = require(`./assets/${name}.svg`);
  }
  catch (e) {
    icon = require(`./assets/broken-image.svg`);
  }

  return (
    <>
      {name && <img {...props} src={icon} alt=""/>}
    </>
  );
};

export default Icon;
