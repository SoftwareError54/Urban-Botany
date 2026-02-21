import * as PlantService from '../Services/PlantService.js';

export async function getAllPlants(req, res){
    try{
        const plants = await PlantService.getAllPlants();
        res.json(plants);
    } catch(error){
        res.status(500).json({message: "Error fetching plants", error: error.message});
    }
}

export async function getPlantById(req, res){
    try{
        const plantId = req.params.plantId;
        const plant = await PlantService.getPlantById(plantId);
        if(!plant){
            return res.status(404).json({message: "Plant not found"});
        }
        res.json(plant);
    } catch(error){
        res.status(500).json({message: "Error fetching plant", error: error.message});
    }
}

export default {getAllPlants, getPlantById};