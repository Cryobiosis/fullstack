import React from 'react'
import ReactDOM from 'react-dom'
// import Course from './components/Course'

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
    <h1>{name}</h1>
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
  return (<div>
    <Header name={course.name}/>
    <Content parts={course.parts}/> 
    <Total parts={course.parts}/> 
  </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))