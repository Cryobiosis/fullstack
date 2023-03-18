import React from 'react'


const Total = (props) => {
    const total = props.parts.reduce( (a, b) => {
       return a + b.exercises; 
    }, 0);
  
    return (
      <div>
       <b>
         Total of exercises {total}
         </b>
      </div>
    )
  }
  
  const Header = ({name}) => {
    //console.log(name)
    return (
      <h2>{name}</h2>
    )
  }
  
  const Part = (props) => {
    // console.log(props);
    return (
    <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  const Content = ({parts}) => {
    return parts.map((part, i) => <Part key={part.id} part={part} />)
  }
  
  const Course = ({ course }) => {
    console.log(course);
  
    return (<div>
      <Header name={course.name}/>
      <Content parts={course.parts}/> 
      <Total parts={course.parts}/> 
    </div>
    )
  }
  
export default Course