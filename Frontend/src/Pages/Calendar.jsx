function Task({task}){
    return(
        <button>{task}</button>
    )
}

function Calendar(){
    return(
        <>
            <h1>Calendar</h1>
            <main>
                <div>
                    <h3>Tasks</h3>
                    <ul>
                        <li>
                            <Task task="Task 1" />
                        </li>
                        <li>
                            <Task task="Task 2" />
                        </li>
                        <li>
                            <Task task="Task 3" />
                        </li>            
                    </ul>
                    
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