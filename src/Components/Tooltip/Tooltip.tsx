import React, { CSSProperties, FC, ReactElement, useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'src/utils/useWindowSize';
import Portal from '../Portal';
import './Tooltip.scss';

interface TooltipProps {
    delay?: number;
    direction?: 'top' | 'right' | 'bottom' | 'left';
    content: ReactElement;
}

const Tooltip: FC<TooltipProps> = ({ children, delay, direction, content }) => {
  let timeout: ReturnType<typeof setTimeout>;
  const [active, setActive] = useState(false);
  const wrapperRef = useRef(document.createElement('div'));
  const tooltipRef = useRef(document.createElement('div'));
  const [styles, setStyles] = useState<CSSProperties>({});
  const size = useWindowSize();

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  const getTooltipPosition = () => {
    const wrapperCords = wrapperRef.current.getBoundingClientRect();
    const tooltipCords = tooltipRef.current.getBoundingClientRect();

    let left = wrapperCords.x + wrapperCords.width / 2;
    let top = wrapperCords.y + window.scrollY;

    switch (direction) {
      case 'right':
        left = left + wrapperCords.width;
        top = top + wrapperCords.width/2;
        break;
      case 'left':
        left = left - wrapperCords.width - tooltipCords.width;
        top = top + wrapperCords.width/2;
        break;
      case 'bottom':
        top = top + tooltipCords.height;
        break;
      case 'top':
      default:
        top = top - wrapperCords.height/2 - tooltipCords.height;
        break;
    }

    return {
      left,
      top
    };
  }

  useEffect(() => {
    if (tooltipRef.current && wrapperRef.current && active) {
      const positioning = getTooltipPosition();

      setStyles({...positioning});
    }
  }, [size, active])

  return (
    <div
      ref={wrapperRef}
      className='pwd-tooltip-wrapper'
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <Portal>
          <div
            ref={tooltipRef}
            className={`pwd-tooltip-tip ${direction || 'top'}`}
            style={styles}
          >
            {content}
          </div>
        </Portal>
      )}
    </div>
  );
};

export default Tooltip;
