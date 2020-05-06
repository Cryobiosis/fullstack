import React from 'react'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
        <div>
          name:
          <input type="text" name="name" value={props.name} onChange={props.nameOnChange}/>
        </div>
        <div>
          number:
          <input type="text" name="number" value={props.number} onChange={props.numberOnChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      )
}

export default PersonForm