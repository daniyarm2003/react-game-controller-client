import { useState } from "react"

let dropdownNum = 0

function CustomDropdown({name, optionArray, onChange}) {
  const [dropdownID] = useState(dropdownNum++)

  return (
    <span>
      <input type="text" name={name} list={`datalist-${name}-${dropdownID}`} onChange={onChange} />
      <datalist id={`datalist-${name}-${dropdownID}`}>
        {optionArray.map(opt => <option>{opt}</option>)}
      </datalist>
    </span>
  )
}

export default CustomDropdown