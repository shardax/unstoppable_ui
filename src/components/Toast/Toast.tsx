import React from 'react'
import './Toast.scss'
import toaster from "toasted-notes";

interface IToastProps {
  title: string | JSX.Element
  appearance: "success" | "info" | "error" | "warning" | "splash"
}

const Toast: React.FC<IToastProps> = ({ title, appearance }) => {

  return (
    <div className={"toast-class " + appearance + "-toast"}>
      {title}
    </div>
  )
}

type positionType = "top-left" | "top" | "top-right" | "bottom-left" | "bottom" | "bottom-right"

export const displayToast = (title: string, appearance: IToastProps["appearance"], duration: number, position: positionType) => {
  toaster.notify(() => <Toast title={title} appearance={appearance} />, {
    position: position,
    duration: duration
  });
}

export default Toast