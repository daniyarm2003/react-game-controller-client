import { useState } from "react"
import Toast from "./Toast"
import consts from "../../consts"

const useToast = id => {
    const [toastClass, setToastClass] = useState(consts.TOAST_CLASS.hidden)
    const [toastTxt, setToastTxt] = useState("")
    const [, setToastTimeout] = useState()

    const renewToastTimeout = prevTimeout => {
        if(prevTimeout) clearTimeout(prevTimeout)
        return setTimeout(setToastClass, consts.TOAST_VISIBLE_TIME, consts.TOAST_CLASS.hidden)
    }

    const doToast = msg => {
        setToastTxt(msg)
        setToastClass(consts.TOAST_CLASS.visible)
        setToastTimeout(renewToastTimeout)
    }

    const toast = (<Toast id={id} toastTxt={toastTxt} toastClass={toastClass} />)

    return [toast, doToast]
}

export default useToast