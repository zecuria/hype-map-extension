import classNames from "classnames";
import React, { useEffect, useState } from "react"
import { CloseButton } from "./CloseButton";

type MessageProps = {
  children: React.ReactNode;
}

export const Message = ({ children }: MessageProps) => {
  const [open, setOpen] = useState(true);
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
