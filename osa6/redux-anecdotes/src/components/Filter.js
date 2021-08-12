import React from 'react'
import { filterActionCreator } from '../reducers/filterReducer'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const Filter = (props) => {
  // const dispatch = useDispatch()
  
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    // dispatch(filterActionCreator(event.target.value))
    props.filterActionCreator(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  filterActionCreator,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

// export default Filter