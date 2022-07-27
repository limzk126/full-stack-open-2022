const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const Header = (prop) => {
  return (
    <>
      <h1>{prop.course}</h1>
    </>
  );
};

const Content = (prop) => {
  const parts = prop.course.parts;
  return (
    <>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
    </>
  );
};

const Part = (prop) => (
  <>
    <p>
      {prop.part} {prop.exercises}
    </p>
  </>
);

const Total = (prop) => {
  const part = prop.course.parts;
  return (
    <>
      <p>
        Number of exercises{" "}
        {part[0].exercises + part[1].exercises + part[2].exercises}
      </p>
    </>
  );
};

export default App;
