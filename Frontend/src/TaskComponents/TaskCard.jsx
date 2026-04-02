import React from 'react';
import DecoratedPlant from '../PlantComponents/DecoratedPlant';

function TaskCard({ task, onPostpone, onComplete }){
    if (!task) return null;

    const { id, plantName, type, description } = task;

    const icon = type === 'water' ? '💧' : type === 'fertilize' ? '🌱' : '🔔';

    return(
        <div className="task-card" data-task-id={id}>
            <DecoratedPlant plant={task.plant} plantId={task.plantId} imagePointer={task.imagePointer} size={64} />
            <div className="task-body">
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <h2 style={{margin:0}}>{plantName}</h2>
                    <h3 style={{margin:0}}>{icon}</h3>
                </div>
                <p>{description}</p>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                    <button className="task-action-button" onClick={() => onPostpone && onPostpone(task)} aria-label="Postpone">
                        <img src="/Icons/pause.png" alt="Postpone" className="action-icon" />
                    </button>
                    {type === 'water' ? (
                        <button className="task-action-button" onClick={() => onComplete && onComplete(task)} aria-label="Complete watering">
                            <img src="/Icons/water_drop.png" alt="Water" className="action-icon" />
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