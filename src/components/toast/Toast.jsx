import "./Toast.css"

function Toast({id, toastClass, toastTxt}) {
    return (
      <div id={id} className={toastClass}>
        {toastTxt}
      </div>
    )
}

export default Toast