import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

// import Tab from "./Tab";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Task from "./Task";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
function App() {
  interface TaskApp {
    id: string;
    title: string;
    isUrgent: boolean;
    isCompleted: boolean;
    deadline: string;
  }
  const storedTasksRaw = localStorage.getItem("tasks");
  const storedTasks = storedTasksRaw !== null ? JSON.parse(storedTasksRaw) : "";

  const [inputState, setInputState] = useState("");
  const [isUrgent, setIsUrgent] = useState(true);

  const updateTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });

    setTasks(updatedTasks);
  };
  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task, _) => task.id !== taskId));
  };
  const [tasks, setTasks] = useState<TaskApp[]>(storedTasks);
  const today = new Date().toISOString().split("T")[0];

  const [deadline, setDeadline] = useState(today);
  useEffect(() => {
    console.log("tasks", tasks);
    console.log(localStorage);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // console.log("stored tasks", storedTasks);
  }, [tasks]);
  //title, urgency, deadline, completed/pending,
  return (
    <div>
      <h1>Welcome to Todo App</h1>
      <div className="add">
        <label htmlFor="title">Title of your task:</label>
        <input
          id="title"
          type="text"
          required
          value={inputState}
          onChange={(e) => {
            setInputState(e.target.value);
          }}
          placeholder="Add your task"
        />{" "}
        <label htmlFor="isUrgent">Is this task urgent?</label>
        <input
          checked={isUrgent}
          onChange={(e) => {
            setIsUrgent(e.target.checked);
          }}
          id="isUrgent"
          type="checkbox"
        />
        <label htmlFor="deadline">
          When should it be completed?
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => {
              setDeadline(e.target.value);
            }}
          />
        </label>
        <button
          type="submit"
          onClick={() => {
            setTasks((prev) => [
              ...prev,
              {
                id: uuidv4(),
                title: inputState,
                deadline: deadline,
                isUrgent: isUrgent,
                isCompleted: false,
              },
            ]);
            setInputState("");
          }}
        >
          Add new
        </button>
        <button onClick={() => setTasks([])}>Remove all</button>
      </div>
      <div>
        <Tabs>
          <TabList>
            <Tab>Uncompleted</Tab>
            <Tab>Completed</Tab>
          </TabList>
          <TabPanel>
            {tasks.length != 0 && (
              <>
                {tasks.map((task) => (
                  <div className="tasks" key={task.id}>
                    {!task.isCompleted && (
                      <>
                        {" "}
                        <FaRegTrashAlt
                          onClick={() => removeTask(task.id)}
                          style={{
                            backgroundColor: "white",
                            paddingTop: "10px",
                          }}
                          size="30"
                          color="black"
                        />{" "}
                        <MdEdit
                          style={{ backgroundColor: "white" }}
                          size="30"
                          color="black"
                        />
                        <Task
                          title={task.title}
                          deadline={task.deadline}
                          isUrgent={task.isUrgent}
                        />{" "}
                        <label className="white-l" htmlFor="completed">
                          Is this completed?
                        </label>
                        <input
                          id="completed"
                          type="checkbox"
                          checked={task.isCompleted}
                          onChange={() => updateTask(task.id)}
                        />
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
          </TabPanel>
          <TabPanel>
            {tasks.length != 0 && (
              <>
                {tasks.map((task) => (
                  <div className="tasks" key={task.title}>
                    {task.isCompleted && (
                      <>
                        {" "}
                        <FaRegTrashAlt
                          onClick={() => removeTask(task.id)}
                          style={{
                            backgroundColor: "white",
                            paddingTop: "10px",
                          }}
                          size="30"
                          color="black"
                        />{" "}
                        <MdEdit
                          style={{ backgroundColor: "white" }}
                          size="30"
                          color="black"
                        />
                        <Task
                          title={task.title}
                          deadline={task.deadline}
                          isUrgent={task.isUrgent}
                        />{" "}
                        <label className="white-l" htmlFor="completed">
                          Is this completed?
                        </label>
                        <input
                          id="completed"
                          type="checkbox"
                          checked={task.isCompleted}
                          onChange={() => updateTask(task.id)}
                        />
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
{
  /* <button
              onClick={() => {
                task.title = "";
                console.log("clicked2");
              }}
              style={{ backgroundColor: "red" }}
            >
              Remove
            </button> */
}
