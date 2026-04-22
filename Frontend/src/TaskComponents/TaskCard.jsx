import React from 'react';
import DecoratedPlant from '../PlantComponents/DecoratedPlant';
import '../css/tasks.css';

function TaskCard({ task, onPostpone, onComplete }){
    if (!task) return null;

    const { id, plantName, type, description } = task;

    // removed emoji icons — display only plant name and description

    return(
        <div className="task-card" data-task-id={id}>
            <DecoratedPlant plant={task.plant} plantId={task.plantId} imagePointer={task.imagePointer} size={64} />
            <div className="task-body">
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <h2 style={{margin:0}}>{plantName}</h2>
                </div>
                <p>{description}</p>
                <div className="task-actions">
                    <button className="task-action-button" onClick={() => onPostpone && onPostpone(task)} aria-label="Postpone">
                        <img src="/Icons/pause.png" alt="Postpone" className="action-icon" />
                    </button>
                    {type === 'water' ? (
                        <button className="task-action-button" onClick={() => onComplete && onComplete(task)} aria-label="Complete watering">
                            <img src="/Icons/water_drop.png" alt="Water" className="action-icon" />
                        </button>
                    ) : (type === 'fertilize' || type === 'repot') ? (
                        <button className="task-action-button" onClick={() => onComplete && onComplete(task)} aria-label={`Complete ${type}`}>
                            <img src="/Icons/tick.png" alt="Complete" className="action-icon" />
                        </button>
                    ) : (
                        <button onClick={() => onComplete && onComplete(task)}>Complete</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskCard;