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

export async function getAllPlantDecorations(req,res){
    try{
        const plantDecorations = await PlantService.getAllPlantDecorations();
        res.json(plantDecorations);
    } catch(error){
        res.status(500).json({message: "Error fetching decorations", error: error.message});
    }
        
}

export async function getPlantDecorationById(req,res){
    try{
        const id = req.params.plantDecorationId;
        const plantDecoration = await PlantService.getPlantDecorationById(id)
        if (!plantDecoration){
            return res.status(404).json({message: "Plant not found"})
        }
        res.json(plantDecoration);    
        } catch(error){
        res.status(500).json({message: "Error Fetching Decoration", error: error.message});
    
    }
}

export async function getDecorationByPlantId(req,res){
    try{
        const id = req.params.plantId;
        const plantDecoration = await PlantService.getPlantDecorationById(id)
        if (!plantDecoration){
            return res.status(404).json({message: "Plant not found"})
        }
        res.json(plantDecoration);    
        } catch(error){
        res.status(500).json({message: "Error Fetching Decoration", error: error.message});
    
    }
}

export async function addDecorationByPlantId(req,res){
    try{
        const {plantId, decorationId} = req.body;
        const decoration = await PlantService.addDecorationByPlantId(plantId, decorationId);
        res.status(200).json(decoration);
    }
    catch(error){
        res.status(401).json({message: "Decoration could not be added", error: error.message});
    }
}


export default {getAllPlants, getPlantById};