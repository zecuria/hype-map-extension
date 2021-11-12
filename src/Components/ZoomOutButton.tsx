import React from 'react';

interface ZoomOutProps {
  onClick: () => void;
}

export const ZoomOutButton = ({ onClick }: ZoomOutProps) => (
  <div className="tw-mg-05 channel-root__right-column tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium">
    <button type="button" onClick={onClick} className="button" data-a-target="top-nav-get-bits-button">
      <div className="label">
        <div className="icon-wrapper">
          <div className="button-icon">
            <div className="icon" data-a-selector="tw-core-button-icon">
              <div className="aspect">
                <div className="spacer" />
                <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" fill="currentcolor">
                  <path fillRule="evenodd" d="M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div data-a-target="label-text" className="tw-flex-grow-0">Zoom out</div>
      </div>
    </button>
  </div>
);
