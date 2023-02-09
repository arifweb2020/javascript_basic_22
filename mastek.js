 const [todoTasks, setTodoTasks] = useState([
    {
      id: 1,
      description: "Task 1"
    },
    {
      id: 4,
      description: "Task 4"
    },
    {
      id: 5,
      description: "Task 5"
    }
  ]);
  const [inProgressTasks, setInProgressTasks] = useState([
    {
      id: 2,
      description: "Task 2"
    }
  ]);

  console.log(inProgressTasks)
  console.log("inProgressTasks" , inProgressTasks);
  const [completedTasks, setCompletedTasks] = useState([
    {
      id: 3,
      description: "Task 3"
    }
  ]);

  const moveToInProgress = (task) => {
    console.log(task)
    const x = todoTasks.filter((val)=> val !== task)
    setTodoTasks(x)
    setInProgressTasks([...inProgressTasks , task])
  };

  const moveToComplete = (task) => {
    console.log(task)
    const x = inProgressTasks.filter((val)=> val !== task)
    setInProgressTasks(x)
    setCompletedTasks([...completedTasks , task])
  };


  return (
    <div className="App">
      <p>Todo</p>
      {todoTasks.map((task) => (
        <button
          type="button"
          onClick={() => moveToInProgress(task)}
          style={{ display: "block" }}
        >
          {task.description}
        </button>
      ))}
      <p>In Progress</p>
      {inProgressTasks.map((task) => (
        <button
          type="button"
          onClick={() => moveToComplete(task)}
          style={{ display: "block" }}
        >
          {task.description}
        </button>
      ))}
      <p>Complete</p>
      {completedTasks.map((task) => (
        <button type="button" style={{ display: "block" }}>
          {task.description}
        </button>
      ))}
