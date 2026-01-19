import React from 'react'

function BillInput({bill,onChangebill}) {
    return (
        <label htmlFor="">
            How Much Was The Bill?
            <input value={bill} type="text" onChange={onChangebill}/>
        </label>
    )
}

export default BillInput