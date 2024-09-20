import React, { useState, useEffect } from 'react'
import "./ControlPanel.css"

function ControlPanel(props) {
  const [input, setInput] = useState({})
  const [modified, setModified] = useState()

  const handleChange = evt => {
    setInput(prevInput => ({...prevInput, [evt.target.name]: evt.target.value}))
  }

  useEffect(() => {
    setModified(React.Children.map(props.children, child => React.createElement(child.type, {...child.props, onChange: handleChange})))
  }, [props.children])

  return (
    <div className="Control-panel">
      {modified}&nbsp;
      <button onClick={() => props.onEnter(input)}>Enter</button>
    </div>
  )
}

export default ControlPanel