import {getPlantsByUserId, getPlantById} from './api';

const BASE_URL = "http://localhost:3000";

class Task {
    constructor(id, plantName, type, description , urgency) {
        this.id = id;
        this.plantName = plantName;
        this.type = type;
        this.description = description;
        this.urgency = urgency;
    }
};

export async function createTasks(){
    const userId = localStorage.getItem('userId');
    const plants = await getPlantsByUserId(userId);
    const tasks = [];
    if (!plants || !Array.isArray(plants)) return tasks;

    const now = new Date();
    let nextId = 1;

    const makeUrgency = (dueDate) => (now >= dueDate ? 'overdue' : 'upcoming');

    for (const p of plants) {
        try {
            const plantName = p.plantName || p.plantName || `Plant ${p.userPlantID || ''}`;

            // Watering
            if (p.nextWatering) {
                const nextWatering = new Date(p.nextWatering);
                if (!isNaN(nextWatering) && now >= nextWatering) {
                    const t = new Task(nextId++, plantName, 'water', `Time to water ${plantName}`, makeUrgency(nextWatering));
                    t.plant = p;
                    t.plantId = p.userPlantID ?? p.plantID;
                    t.imagePointer = p.imagePointer ?? p.imgPointer;
                    // try to fetch global plant imagePointer if missing
                    if (!t.imagePointer && (p.plantID || p.plantId)) {
                        try {
                            const basePlant = await getPlantById(p.plantID ?? p.plantId);
                            if (basePlant && basePlant.imagePointer) t.imagePointer = basePlant.imagePointer;
                        } catch (e) { /* ignore */ }
                    }
                    tasks.push(t);
                }
            }

            // Feeding
            if (p.nextFeeding) {
                const nextFeeding = new Date(p.nextFeeding);
                if (!isNaN(nextFeeding) && now >= nextFeeding) {
                    const t = new Task(nextId++, plantName, 'fertilize', `Time to feed ${plantName}`, makeUrgency(nextFeeding));
                    t.plant = p;
                    t.plantId = p.userPlantID ?? p.plantID;
                    t.imagePointer = p.imagePointer ?? p.imgPointer;
                    if (!t.imagePointer && (p.plantID || p.plantId)) {
                        try {
                            const basePlant = await getPlantById(p.plantID ?? p.plantId);
                            if (basePlant && basePlant.imagePointer) t.imagePointer = basePlant.imagePointer;
                        } catch (e) { /* ignore */ }
                    }
                    tasks.push(t);
                }
            }

            // Potting
            if (p.nextPotting) {
                const nextPotting = new Date(p.nextPotting);
                if (!isNaN(nextPotting) && now >= nextPotting) {
                    const t = new Task(nextId++, plantName, 'repot', `Time to repot ${plantName}`, makeUrgency(nextPotting));
                    t.plant = p;
                    t.plantId = p.userPlantID ?? p.plantID;
                    t.imagePointer = p.imagePointer ?? p.imgPointer;
                    if (!t.imagePointer && (p.plantID || p.plantId)) {
                        try {
                            const basePlant = await getPlantById(p.plantID ?? p.plantId);
                            if (basePlant && basePlant.imagePointer) t.imagePointer = basePlant.imagePointer;
                        } catch (e) { /* ignore */ }
                    }
                    tasks.push(t);
                }
            }
        } catch (err) {
            // continue on malformed plant data
            console.warn('createTasks: skipping plant due to error', err, p);
            continue;
        }
    }

    return tasks;
}

export async function completeTask(taskData){
    if (!taskData) throw new Error('No task provided');

    const userPlantId = taskData.plantId ?? taskData.plant?.userPlantID ?? taskData.plant?.userPlantId;
    if (!userPlantId) throw new Error('No userPlantId found on task');

    const now = new Date();
    const updates = {};

    const addDays = (date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
        const pad = (n) => n.toString().padStart(2, '0');
        const formatSqlDate = (d) => {
            return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
        };

        if (taskData.type === 'water') {
            updates.lastWatered = formatSqlDate(now);
        const plantId = taskData.plant?.plantID ?? taskData.plant?.plantId ?? taskData.plant?.plantID;
        let days = 7;
        if (plantId) {
            const basePlant = await getPlantById(plantId);
            if (basePlant && basePlant.wateringFreq) days = Number(basePlant.wateringFreq) || days;
        }
            updates.nextWatering = formatSqlDate(addDays(now, days));
    } else if (taskData.type === 'fertilize') {
            updates.lastFed = formatSqlDate(now);
        const plantId = taskData.plant?.plantID ?? taskData.plant?.plantId ?? taskData.plant?.plantID;
        let days = 30;
        if (plantId) {
            const basePlant = await getPlantById(plantId);
            if (basePlant && basePlant.feedingFreq) days = Number(basePlant.feedingFreq) || days;
        }
            updates.nextFeeding = formatSqlDate(addDays(now, days));
    } else if (taskData.type === 'repot') {
            updates.lastPotted = formatSqlDate(now);
        const plantId = taskData.plant?.plantID ?? taskData.plant?.plantId ?? taskData.plant?.plantID;
        let days = 365;
        if (plantId) {
            const basePlant = await getPlantById(plantId);
            if (basePlant && basePlant.pottingFreq) days = Number(basePlant.pottingFreq) || days;
        }
            updates.nextPotting = formatSqlDate(addDays(now, days));
    } else {
        return null;
    }

    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/userplants/${userPlantId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(updates)
    });

    if (!res.ok) {
        const err = await res.json().catch(()=>({ message: 'Failed to update user plant' }));
        throw new Error(err.message || 'Failed to update user plant');
    }

    return await res.json();
}

export async function postponeTask(taskData){

}