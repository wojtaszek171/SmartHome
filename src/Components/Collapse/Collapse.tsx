import React, { FC, useEffect, useRef, useState } from 'react';
import './Collapse.scss';

interface CollapseProps {
    collapsed: boolean;
    collapseTitle?: string | Element;
    onCollapse?: (isCollapsed: boolean) => void
}

const collapseSection = (element: HTMLElement) => {
    var sectionHeight = element.scrollHeight;
    
    var elementTransition = element.style.transition;
    element.style.transition = '';
    
    requestAnimationFrame(() => {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;
      
      requestAnimationFrame(() => {
        element.style.height = 0 + 'px';
      });
    });
    
    element.setAttribute('data-collapsed', 'true');
}

const expandSection = (element: HTMLElement, heightToSet?: number) => {
    var sectionHeight = heightToSet || element.scrollHeight;

    element.style.height = sectionHeight + 'px';
    
    element.setAttribute('data-collapsed', 'false');
}

const Collapse: FC<CollapseProps> = ({ collapsed, collapseTitle, onCollapse, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    const boxRef = useRef<HTMLDivElement>(null);

    const handleAnimation = () => {
        if (!boxRef.current) return;

        if (isCollapsed) {
            expandSection(boxRef.current);
        } else {
            collapseSection(boxRef.current);
        }
    };

    const handleCollapse = () => {
        setIsCollapsed(prev => !prev);

        handleAnimation();

        onCollapse && onCollapse(isCollapsed);
    };
    
    const currentScrollHeight = boxRef.current?.scrollHeight;

    useEffect(() => {
        if (boxRef.current && !isCollapsed)
            expandSection(boxRef.current, currentScrollHeight);
    }, [currentScrollHeight, isCollapsed]);

    return (
        <div className={`pwd-collapse${isCollapsed ? ' collapsed' : ''}`}>
            <div
                className="collapse-button"
                onClick={() => handleCollapse()}
            >
                <span className='collapse-arrow'>&#9660;</span>
                <span>{collapseTitle}</span>
            </div>
            <div
                className='collapse-content'
                ref={boxRef}
                aria-expanded={isCollapsed}
            >
                {children}
            </div>
        </div>
    );
}

export default Collapse;
