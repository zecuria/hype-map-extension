import React from 'react';
import RemoveIcon from './RemoveIcon';

interface FilterPillProps {
    onRemove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const FilterPill: React.SFC<FilterPillProps> = ({ onRemove, children }) => (
    <div className="tw-mg-05">
        <div className="animated-tag--no-bounce" data-tag-filter="4d1eaa36-f750-4862-b7e9-d0a13970d535">
            <div className="channel-root__right-column tw-border-radius-rounded">
                <button onClick={onRemove} className="tw-align-items-center tw-border-radius-rounded tw-flex tw-form-tag tw-form-tag--selected tw-interactive" >
                    <div className="tw-align-items-center tw-border-radius-rounded tw-flex tw-font-size-6 tw-semibold">
                        {children}
                        <div className="tw-align-items-center tw-border-radius-rounded tw-flex tw-form-tag__icon tw-justify-content-center">
                            <RemoveIcon />
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </div>
);

export default FilterPill;