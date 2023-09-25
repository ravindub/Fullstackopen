const Header = ({ heading }) => {
  return <h1>{heading.name}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

const Total = ({ total }) => {
  const sum = total.reduce((total, item) => total + item.exercises, 0);

  return <b>Total of {sum} exercises</b>;
};

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <Header heading={course} />
          <Content parts={course.parts} />
          <Total total={course.parts} />
        </div>
      ))}
    </>
  );
};

export default Course;
