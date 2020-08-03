import React from 'react';

export const HelpToolTip = () => (
    <div className="tw-inline-flex tw-relative tw-tooltip-wrapper" style={{ alignSelf: 'center', marginRight: '5px' }}>
        <div className="tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-button-icon__icon tw-border-top-right-radius-medium tw-core-button tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative" aria-expanded="false" aria-label="Help Button">
            <span className="tw-button-icon__icon">
                <div style={{ width: '2rem', height: '2rem' }}>
                    <div className="ScIconLayout-sc-1bgeryd-0 krdRbW tw-align-items-center tw-icon tw-inline-flex">
                        <div className="tw-aspect tw-aspect--align-top">
                            <div className="tw-aspect__spacer" style={{ paddingBottom: '100%' }}>
                            </div>
                            <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" className="" fill="#fff">
                                <g><path d="M9 8a1 1 0 011-1h.146a.87.87 0 01.854.871c0 .313-.179.6-.447.735A2.81 2.81 0 009 11.118V12h2v-.882a.81.81 0 01.447-.724A2.825 2.825 0 0013 7.871C13 6.307 11.734 5 10.146 5H10a3 3 0 00-3 3h2zM9 14a1 1 0 112 0 1 1 0 01-2 0z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8 6a6 6 0 110-12 6 6 0 010 12z"></path></g>
                            </svg>
                        </div>
                    </div>
                </div>
            </span>
        </div>
        <div className="tw-tooltip tw-tooltip--align-left tw-tooltip--up" role="tooltip">To hide press Alt+h</div>
    </div>
);