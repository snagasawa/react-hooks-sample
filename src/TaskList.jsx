import React, { useState } from "react";

export default function TaskList() {
  const defaultTasks = [
    { id: 1, name: "buy a milk", status: false },
    { id: 2, name: "cook a dinner", status: true },
    { id: 3, name: "full body workout", status: true },
    { id: 4, name: "meet a friend", status: false },
    { id: 5, name: "make tea", status: true },
  ];
  const [searchText, setSearchText] = useState("");
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState(defaultTasks);

  const handleChangeSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const handleChangeTaskName = (event) => {
    setTaskName(event.target.value);
  };

  const handleAddingTask = (taskName) => {
    setTasks([...tasks, { id: tasks.length + 1, name: taskName }]);
  };

  const handleToggleTask = (task) => {
    const index = tasks.indexOf(task);
    const newTasks = [...tasks];
    newTasks.splice(index, 1, { ...task, status: !task.status });
    setTasks(newTasks);
  };

  const createTaskList = (tasks) => {
    return tasks.map((task) => {
      return (
        <li key={tasks.id}>
          <input type="checkbox" checked={task.status} disabled />
          <label>{task.name}</label>
          <button type="checkbox" onClick={() => handleToggleTask(task)}>
            toggle
          </button>
        </li>
      );
    });
  };

  const searchTasks = (tasks, searchText) => {
    return tasks.filter((task) => task.name.includes(searchText));
  };

  const doingTasks = (tasks) => tasks.filter((task) => !task.status);

  const completedTasks = (tasks) => tasks.filter((task) => task.status);

  const doingTaskList = (tasks) => {
    return createTaskList(searchTasks(doingTasks(tasks), searchText));
  };
  const completedTaskList = (tasks) => {
    return createTaskList(searchTasks(completedTasks(tasks), searchText));
  };

  return (
    <div>
      <div>
        <label>
          Search
          <input type="text" onChange={handleChangeSearchText} />
        </label>
      </div>
      <div>
        <label>
          TaskName:
          <input type="text" name="taskName" onChange={handleChangeTaskName} />
          <button onClick={() => handleAddingTask(taskName)}>Add task</button>
        </label>
      </div>
      <div>
        <div>
          <h4>DOING</h4>
          <ul>{doingTaskList(tasks)}</ul>
        </div>
        <div>
          <h4>COMPLETED</h4>
          <ul>{completedTaskList(tasks)}</ul>
        </div>
      </div>
    </div>
  );
}
