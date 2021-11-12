import React from 'react';

const HiddenIcon = () => (
  <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" className="ScIconSVG-sc-1bgeryd-1" fill="#fff">
    <g>
      <path fillRule="evenodd" d="M16.5 18l1.5-1.5-2.876-2.876a9.99 9.99 0 001.051-1.191L18 10l-1.825-2.433a9.992 9.992 0 00-2.855-2.575 35.993 35.993 0 01-.232-.14 6 6 0 00-6.175 0 35.993 35.993 0 01-.35.211L3.5 2 2 3.5 16.5 18zm-2.79-5.79a8 8 0 00.865-.977L15.5 10l-.924-1.233a7.996 7.996 0 00-2.281-2.058 37.22 37.22 0 01-.24-.144 4 4 0 00-4.034-.044l1.53 1.53a2 2 0 012.397 2.397l1.762 1.762z" clipRule="evenodd" />
      <path d="M11.35 15.85l-1.883-1.883a3.996 3.996 0 01-1.522-.532 38.552 38.552 0 00-.239-.144 7.994 7.994 0 01-2.28-2.058L4.5 10l.428-.571L3.5 8 2 10l1.825 2.433a9.992 9.992 0 002.855 2.575c.077.045.155.092.233.14a6 6 0 004.437.702z" />
    </g>
  </svg>
);

const DisplayedIcon = () => (
  <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" className="ScIconSVG-sc-1bgeryd-1" fill="#fff">
    <g>
      <path d="M11.998 10a2 2 0 11-4 0 2 2 0 014 0z" />
      <path fillRule="evenodd" d="M16.175 7.567L18 10l-1.825 2.433a9.992 9.992 0 01-2.855 2.575l-.232.14a6 6 0 01-6.175 0 35.993 35.993 0 00-.233-.14 9.992 9.992 0 01-2.855-2.575L2 10l1.825-2.433A9.992 9.992 0 016.68 4.992l.233-.14a6 6 0 016.175 0l.232.14a9.992 9.992 0 012.855 2.575zm-1.6 3.666a7.99 7.99 0 01-2.28 2.058l-.24.144a4 4 0 01-4.11 0 38.552 38.552 0 00-.239-.144 7.994 7.994 0 01-2.28-2.058L4.5 10l.925-1.233a7.992 7.992 0 012.28-2.058 37.9 37.9 0 00.24-.144 4 4 0 014.11 0l.239.144a7.996 7.996 0 012.28 2.058L15.5 10l-.925 1.233z" clipRule="evenodd" />
    </g>
  </svg>
);

interface ToggleHideProps {
  isHidden: boolean;
  onToggle: (isHidden: boolean) => void;
}

export const ToggleHide = ({ isHidden, onToggle }: ToggleHideProps) => (
  <div className="tw-inline-flex tw-relative tw-tooltip-wrapper" style={{ alignSelf: 'center', marginRight: '5px' }}>
    <button
      type="button"
      className="tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-button-icon tw-button-icon--overlay tw-core-button tw-core-button--overlay tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative"
      aria-expanded="false"
      aria-label="Help Button"
      onClick={() => onToggle(!isHidden)}
    >
      <span className="tw-button-icon__icon">
        <div style={{ width: '2rem', height: '2rem' }}>
          <div className="ScIconLayout-sc-1bgeryd-0 krdRbW tw-align-items-center tw-icon tw-inline-flex">
            <div className="tw-aspect tw-aspect--align-top">
              {isHidden ? <HiddenIcon /> : <DisplayedIcon />}
            </div>
          </div>
        </div>
      </span>
    </button>
    <div className="tw-tooltip tw-tooltip--align-left tw-tooltip--up" role="tooltip">To {isHidden ? 'show' : 'hide'} click or press Alt+h</div>
  </div>
);
