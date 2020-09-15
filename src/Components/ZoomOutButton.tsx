import React from 'react';

interface ZoomOutProps {
    onClick: () => void;
}

export const ZoomOutButton = ({ onClick }: ZoomOutProps) => (
    <div className="tw-mg-05 channel-root__right-column tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium">
        <button onClick={onClick} className="tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-core-button--secondary tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative" data-a-target="top-nav-get-bits-button">
            <div className="tw-align-items-center tw-core-button-label tw-core-button-label--icon tw-flex tw-flex-grow-0">
                <div className="tw-align-items-center tw-flex tw-mg-r-05">
                    <div className="tw-align-items-center tw-core-button-icon tw-inline-flex">
                        <div className="ScIconLayout-sc-1bgeryd-0 kbOjdP tw-icon" data-a-selector="tw-core-button-icon">
                            <div className="icon-parent tw-aspect">
                                <div className="spacer full-pb"></div>
                                <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" fill="currentcolor">
                                    <path fillRule="evenodd" d="M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-a-target="tw-core-button-label-text" className="tw-flex-grow-0">Zoom out</div>
            </div>
        </button>
    </div>
);