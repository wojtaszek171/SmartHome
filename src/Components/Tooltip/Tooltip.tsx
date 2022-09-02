import React, { FC, ReactElement, useState } from "react";
import "./Tooltip.scss";

interface TooltipProps {
    delay?: number;
    direction?: 'top' | 'right' | 'bottom' | 'left';
    content: ReactElement;
}

const Tooltip: FC<TooltipProps> = ({ children, delay, direction, content }) => {
  let timeout: ReturnType<typeof setTimeout>;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="pwd-tooltip-wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className={`pwd-tooltip-tip ${direction || 'top'}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
