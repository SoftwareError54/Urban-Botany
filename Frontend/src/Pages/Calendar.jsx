import { useEffect, useState } from "react";
import TaskCard from "../TaskComponents/TaskCard";
import '../css/tasks.css';
import { createTasks, completeTask, postponeTask } from "../services/taskService";

function Calendar(){
    const [tasks, setTasks] = useState([]);
    const [showPostponeToast, setShowPostponeToast] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const generated = await createTasks();
                setTasks(generated || []);
            } catch (err) {
                console.error('Failed to load tasks', err);
                setTasks([]);
            } finally {
                setLoading(false);
            }
        };
        loadTasks();
    }, []);

    const handlePostpone = async (task) => {
        try {
            await postponeTask(task);
            setTasks(prev => prev.filter(t => t.id !== task.id));
            setShowPostponeToast(true);
            setTimeout(() => setShowPostponeToast(false), 2000);
        } catch (err) {
            console.error('Failed to postpone task', err);
        }
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
            {showPostponeToast && (
                <div className="postpone-toast">Task Postponed</div>
            )}
            <main style={{width: '100%', boxSizing: 'border-box'}}>
                <div className="tasks-column">
                    {loading ? (
                        <div className="tasks-loading">
                            <div className="tasks-spinner" />
                            <p>Loading tasks...</p>
                        </div>
                    ) : (!tasks || tasks.length === 0) ? (
                        <p className="no-tasks">No Overdue or Upcoming Tasks</p>
                    ) : (
                        <ul className="tasks-list">
                            {tasks.map(task => (
                                <li key={task.id}>
                                    <TaskCard task={task} onPostpone={handlePostpone} onComplete={handleComplete} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </>

    )
}

export default Calendar;