import TaskCard from "../TaskComponents/TaskCard"

function Calendar(){
    return(
        <>
            <h1>Calendar</h1>
            <main>
                <div>
                    <h2>Tasks</h2>
                    <ul>
                        <li>
                            <TaskCard/>
                        </li>
                        <li>
                            <TaskCard/>
                        </li>
                        <li>
                            <TaskCard/>
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