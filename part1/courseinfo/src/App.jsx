const Header = (props) => {
  //console.log(props);
  return (
    <div>
      <h1>{props.heading.name}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.parts.name} {props.parts.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part parts={props.allParts[0]} />
      <Part parts={props.allParts[1]} />
      <Part parts={props.allParts[2]} />
    </div>
  );
};

const Total = (props) => {
  let sum = 0;

  props.total.forEach((element) => {
    sum = sum + element.exercises;
  });
  return (
    <div>
      <p>Number of Exercices: {sum}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <>
      <Header heading={course} />
      <Content allParts={course.parts} />
      <Total total={course.parts} />
    </>
  );
};

export default App;
