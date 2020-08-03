import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEnter: () => void;
}

const Input: React.SFC<InputProps> = ({ label, onChange, onEnter, value, ...props }) => (
    <div className="tw-mg-05 channel-root__right-column tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium">
        <input
            {...props}
            onChange={onChange}
            onKeyUp={e => {
                if(e.keyCode === 13) {
                    onEnter();
                }
            }}
            aria-label={label}
            aria-autocomplete="list"
            aria-controls="mllGLivY"
            className="tw-block tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-font-size-6 tw-full-width tw-input tw-pd-l-1 tw-pd-r-1 tw-pd-y-05"
            placeholder={label}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            id="dropdown-search-input"
            spellCheck="false"
            value={value}
        />
    </div>
);

export default Input;
