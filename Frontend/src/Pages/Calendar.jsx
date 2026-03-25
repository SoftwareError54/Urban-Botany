import { useEffect, useState } from "react";
import TaskCard from "../TaskComponents/TaskCard"
import { createTasks, completeTask } from "../services/taskService";

function Calendar(){
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const generated = await createTasks();
                setTasks(generated || []);
            } catch (err) {
                console.error('Failed to load tasks', err);
                setTasks([]);
            }
        };
        loadTasks();
    }, []);

    const handlePostpone = (task) => {
        console.log('postpone', task);
    }

    const handleComplete = async (task) => {
        console.log('complete', task);
        try {
            await completeTask(task);
            setTasks(prev => prev.filter(t => t.id !== task.id));
        } catch (err) {
            console.error('Failed to complete task', err);
            // optionally show error to user
        }
    }

    return(
        <>
            <h1>Calendar</h1>
            <main>
                <div className="tasks-column">
                    <h2>Tasks</h2>
                    <div className="tasks-scroll">
                        {(!tasks || tasks.length === 0) ? (
                            <p className="no-tasks">No Overdue or Upcoming Tasks</p>
                        ) : (
                            <ul>
                                {tasks.map(task => (
                                    <li key={task.id}>
                                        <TaskCard task={task} onPostpone={handlePostpone} onComplete={handleComplete} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div>
                    <h3>Calendar</h3>
                </div>
                <p>This is the calendar page.</p>
            </main>
        </>

    )
}

export default Calendar;