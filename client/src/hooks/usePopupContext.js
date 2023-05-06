import { useContext } from "react"
import { PopupContext } from "../contexts/PopupContext"

export const usePopupContext = () => {
  return useContext(PopupContext)
}