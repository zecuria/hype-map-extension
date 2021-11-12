import classNames from "classnames";
import React, { useEffect, useState } from "react"
import { CloseButton } from "./CloseButton";

type MessageProps = {
  isOpen: React.ReactNode;
  children: React.ReactNode;
}

export const Message = ({ children, isOpen }: MessageProps) => {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => {
    const root = document.getElementById("hype-map-extension-root");
    if (!root) {
      return;
    }
    if (open) {
      root.classList.add('has-pop-up')
    } else {
      root.classList.remove('has-pop-up')
    }
  }, [open]);

  const classes = classNames('popup', {
    'tw-hidden': !open
  })
  return (
    <div className={classes}>
      <div>{children}</div>
      <CloseButton onClick={() => setOpen(false)} />
    </div>
  )
}
