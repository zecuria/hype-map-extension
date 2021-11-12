import React from "react";

type CloseButtonProps = {
  onClick: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => (
  <div className="tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium">
    <button type="button" onClick={onClick} className="button">
      <div className="label">
        <div className="tw-flex-grow-0">Close</div>
      </div>
    </button>
  </div>
)

