const Course = ({course}) => {
  
    const total = course.parts.reduce((accumulator, part) => accumulator+part.exercises,0)
    return(
      <>
      <h1>{course.name}</h1>
      {course.parts.map(parts => <li key={parts.id}>{parts.name}: {parts.exercises}</li>
    )}
      <h4>total of {total} excercises</h4>
      </>
     )
  
  }

  export default Course