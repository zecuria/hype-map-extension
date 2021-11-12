/* eslint-disable react/require-default-props */
import React from "react";
// import classNames from "classnames";

// const SuccessIcon = () => (
//   <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" className="ScIconSVG-sc-1bgeryd-1 cMQeyU">
//     <g>
//       <path d="M4 10l5 5 8-8-1.5-1.5L9 12 5.5 8.5 4 10z" />
//     </g>
//   </svg>
// );

type ProcessVideoButtonProps = {
  isLoading?: boolean,
  tooltip?: string,
  children: React.ReactNode;
  onClick?: () => void;
}

export const ProcessVideoButton = ({ isLoading, children, tooltip, onClick }: ProcessVideoButtonProps) => (
  <div className="tw-mg-05 tw-relative tw-tooltip-wrapper channel-root__right-column tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium">
    <button type="button" className="button" onClick={onClick} data-a-target="top-nav-get-bits-button">
      <div className="label">
        {isLoading && <div className="icon-wrapper">
          <div className="button-icon">
            <div className="icon" data-a-selector="tw-core-button-icon">
              <div className="aspect">
                <div className="spacer" />
                <div className="loading-icon" />
              </div>
            </div>
          </div>
        </div>}
        <div className="tw-flex-grow-0">{children}</div>
      </div>
    </button>
    {tooltip && <div className="tw-tooltip tw-tooltip--align-left tw-tooltip--up" role="tooltip">{tooltip}</div>}
  </div>
)
