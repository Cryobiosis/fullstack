import React, { useState } from 'react'

const Filter = (props) => {
    return (
        <div>
            Filter shown with
            <input type="text" name="filter" value={props.value} onChange={props.callback}/>
        </div>
    )
}

export default Filter