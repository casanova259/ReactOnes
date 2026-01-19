import React from 'react'

function Service({text,ur_tip,onChangeUrTip}) {
  return (
    <div>
        {text}
        <select onChange={onChangeUrTip} value={ur_tip} name="" id="">
            <option value={0}> 0% DisSatisfied</option>
            <option value={5}> 5% it was okay</option>
            <option value={10}> 10% it was good</option>
            <option value={20}> 20% Absolutely Amazing</option>
        </select>
    </div>
  )
}

export default Service