import React from 'react';

interface ToggleProps {
    toggled: boolean;
    handleToggle: (toggled: boolean) => void;
};

export const Toggle: React.FC<ToggleProps> = ({ toggled, handleToggle }) => {
    return (
        <div className="channel-root__right-column" style={{borderRadius: "1rem/50%", alignSelf: "center"}}>
            <div className="tw-toggle tw-tooltip-wrapper" data-a-target="share-activity-toggle" data-a-value="true" data-test-selector="user-menu__is-sharing-activity-toggle">
                <input type="checkbox" className="tw-toggle__input" id="2737303ea3cdbe7926c50c7e5fcfa60f" data-a-target="tw-toggle" checked={toggled} onChange={() => handleToggle(!toggled)} />
                <label htmlFor="2737303ea3cdbe7926c50c7e5fcfa60f" className="tw-toggle__button"><p className="tw-hide-accessible">Share My Activity</p></label>
                <div className="tw-tooltip tw-tooltip--align-left tw-tooltip--up" data-a-target="tw-tooltip-label" role="tooltip" id="ceec16a7e8d4d93fcb63748baaaad752">Toggle graph color</div>
            </div>
        </div>
    );
}