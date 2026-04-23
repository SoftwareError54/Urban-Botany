import {getPlantsByUserId, getPlantById} from './api';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const parseSqlDateTime = (s) => {
    if (!s) return null;
    if (s instanceof Date) return s;
    // Expect formats like "YYYY-MM-DD HH:MM:SS" or ISO-like with T
    const m = String(s).match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/);
    if (m) {
        const [_, y, mo, d, hh, mm, ss] = m;
        return new Date(Number(y), Number(mo) - 1, Number(d), Number(hh), Number(mm), Number(ss));
    }
    // Fallback to JS Date parser
    const dt = new Date(s);
    return isNaN(dt) ? null : dt;
};

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

    const makeUrgency = (dueDate) => (dueDate && now.getTime() >= dueDate.getTime() ? 'overdue' : 'upcoming');

    for (const p of plants) {
        try {
            const plantName = p.plantName || p.plantName || `Plant ${p.userPlantID || ''}`;

            // Watering
            if (p.nextWatering) {
                const nextWatering = parseSqlDateTime(p.nextWatering);
                const waterDue = nextWatering && now.getTime() >= nextWatering.getTime();
                console.debug('taskService:createTasks water', { raw: p.nextWatering, parsed: nextWatering && nextWatering.toString(), now: now.toString(), dueCheck: waterDue });
                if (waterDue) {
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
                const nextFeeding = parseSqlDateTime(p.nextFeeding);
                const feedDue = nextFeeding && now.getTime() >= nextFeeding.getTime();
                console.debug('taskService:createTasks feed', { raw: p.nextFeeding, parsed: nextFeeding && nextFeeding.toString(), now: now.toString(), dueCheck: feedDue });
                if (feedDue) {
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
                const nextPotting = parseSqlDateTime(p.nextPotting);
                console.log("Next potting:", p.nextPotting, nextPotting);
                const potDue = nextPotting && now.getTime() >= nextPotting.getTime();
                console.debug('taskService:createTasks pot', { raw: p.nextPotting, parsed: nextPotting && nextPotting.toString(), now: now.toString(), dueCheck: potDue });
                if (potDue) {
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
            updates.taskType = 'water';
        const plantId = taskData.plant?.plantID ?? taskData.plant?.plantId ?? taskData.plant?.plantID;
        let days = 7;
        if (plantId) {
            const basePlant = await getPlantById(plantId);
            if (basePlant && basePlant.wateringFreq) days = Number(basePlant.wateringFreq) || days;
        }
            updates.nextWatering = formatSqlDate(addDays(now, days));
    } else if (taskData.type === 'fertilize') {
            updates.lastFed = formatSqlDate(now);
            updates.taskType = 'fertilize';
        const plantId = taskData.plant?.plantID ?? taskData.plant?.plantId ?? taskData.plant?.plantID;
        let days = 30;
        if (plantId) {
            const basePlant = await getPlantById(plantId);
            if (basePlant && basePlant.feedingFreq) days = Number(basePlant.feedingFreq) || days;
        }
            updates.nextFeeding = formatSqlDate(addDays(now, days));
    } else if (taskData.type === 'repot') {
            updates.lastPotted = formatSqlDate(now);
            updates.taskType = 'repot';
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