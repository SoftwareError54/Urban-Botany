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
        console.log(plantDecorations);
        res.json(plantDecorations);
        console.log(plantDecorations);
    } catch(error){
        res.status(500).json({message: "Error fetching decorations", error: error.message});
    }
        
}

export async function getPlantDecorationById(req,res){
    try{
        const decorationId = req.params.decorationId;
        console.log(decorationId);
        const plantDecoration = await PlantService.getPlantDecorationById(decorationId)
        if (!plantDecoration){
            return res.status(404).json({message: "Plant not found weewoo"})
        }
        res.json(plantDecoration);    
        } catch(error){
        res.status(500).json({message: "Error Fetching Decoration", error: error.message});
    
    }
}

export async function getDecorationByPlantId(req,res){
    try{
        const plantId = req.params.plantId;
        const plantDecoration = await PlantService.getPlantDecorationById(plantId)
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

export async function getMyPlants(req,res){
    try{
        const userId = req.userId;
        console.log("User ID: ", userId);
        const myPlants = await PlantService.getMyPlants(userId);
        if (!myPlants){
            return res.status(404).json({message: "No Plants Found"})
        }
        res.json(myPlants)
    }
    catch(error){
        res.status(401).json({message: "Error Fetching Plants", error: error});
    }
    
}


export default {getAllPlants, getPlantById, getAllPlantDecorations, getPlantDecorationById, getDecorationByPlantId, addDecorationByPlantId, getMyPlants};