import * as PlantService from '../Services/PlantService.js';
import fetch from 'node-fetch';
import FormData from 'form-data';

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
        const plantDecoration = await PlantService.getDecorationByPlantId(plantId)
        if (!plantDecoration){
            return res.status(404).json({message: "No active decoration found"})
        }
        res.json(plantDecoration);    
        } catch(error){
        res.status(500).json({message: "Error Fetching Decoration", error: error.message});
    
    }
}

export async function getAllDecorationsByUserPlantId(req, res){
    try{
        const plantId = req.params.plantId;
        const decorations = await PlantService.getAllDecorationsByUserPlantId(plantId);
        res.json(decorations);
    } catch(error){
        res.status(500).json({message: "Error fetching decorations", error: error.message});
    }
}

export async function updatePlantDecoration(req, res){
    try{
        const { plantId, decorationId } = req.params;
        await PlantService.updatePlantDecorationToggle(plantId, decorationId);
        res.json({ updated: true });
    } catch(error){
        res.status(500).json({message: "Error updating decoration", error: error.message});
    }
}

export async function resetPlantDecoration(req, res){
    try{
        const { plantId, layer } = req.params;
        await PlantService.resetPlantDecorationsByLayer(plantId, layer);
        res.json({ reset: true });
    } catch(error){
        res.status(500).json({message: "Error resetting decoration", error: error.message});
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

export async function getPlantsByRoomId(req,res){
    try{
        const roomId = req.params.roomId;
        const roomPlants = await PlantService.getPlantsByRoomId(roomId);
        if(!roomPlants){
            return res.status(404).json({message: "No PLants Found"})
        }
        res.json(roomPlants)
    }
    catch(error){
        res.status(500).json({message: "Error Fetching Plants", error: error.message});
    }
}

export async function identifyPlant(req, res){
    try{
        const { imageBase64, organs = 'leaf' } = req.body;
        console.log('identifyPlant called - payload keys:', Object.keys(req.body));
        if(!imageBase64) {
            console.warn('identifyPlant: missing imageBase64');
            return res.status(400).json({ message: 'Missing imageBase64 in request body' });
        }

        const API_KEY = process.env.PLANTNET_API_KEY;
        if(!API_KEY) {
            console.error('identifyPlant: missing PLANTNET_API_KEY in process.env');
            return res.status(500).json({ message: 'Server missing PlantNet API key' });
        }

        // Convert base64 to buffer and log sizes for debugging
        const buffer = Buffer.from(imageBase64, 'base64');
        console.log(`identifyPlant: received imageBase64 length=${imageBase64.length}, buffer length=${buffer.length}`);

        // Build multipart form using node-form-data
        const form = new FormData();
        form.append('images', buffer, { filename: 'capture.jpg', contentType: 'image/jpeg' });
        form.append('organs', organs);

        const url = `https://my-api.plantnet.org/v2/identify/all?api-key=${API_KEY}`;
        console.log('identifyPlant: forwarding to PlantNet URL=', url);

        const response = await fetch(url, { method: 'POST', body: form, headers: form.getHeaders() });
        const status = response.status;
        let bodyText;
        try{
            bodyText = await response.text();
        } catch(e){
            bodyText = '<unreadable response body>';
        }

        console.log(`identifyPlant: PlantNet response status=${status}`);
        // If non-2xx, log full response body to help debugging
        if (!response.ok) {
            console.error('identifyPlant: PlantNet returned error:', bodyText);
            // attempt to parse JSON body for client too
            try{
                const jsonErr = JSON.parse(bodyText);
                return res.status(status).json({ message: 'PlantNet error', details: jsonErr });
            } catch(parseErr){
                return res.status(status).json({ message: 'PlantNet error', details: bodyText });
            }
        }

        // parse successful JSON
        let json;
        try{
            json = JSON.parse(bodyText);
        } catch(e){
            console.warn('identifyPlant: PlantNet returned non-JSON body');
            return res.status(502).json({ message: 'PlantNet returned non-JSON response', body: bodyText });
        }

        console.log('identifyPlant: success, returning JSON to client');
        return res.status(200).json(json);
    } catch(error){
        console.error('identifyPlant error (exception)', error);
        return res.status(500).json({ message: 'Error identifying plant', error: error.message });
    }
}

export async function getPlantByLatinName(req, res){
    try{
        // Express decodes query params, but be explicit and defensively decode once
        const raw = req.query.name || req.params.name || '';
        console.log(raw);
        let name;
        try { name = decodeURIComponent(raw); } catch(e) { name = raw; }
        console.log('getPlantByLatinName called with:', { raw, decoded: name });
        if(!name) return res.status(400).json({ message: 'Missing "name" query parameter' });
        const plant = await PlantService.getPlantByLatinName(name);
        console.log('getPlantByLatinName result:', plant);
        if(!plant) return res.status(404).json({ message: 'Plant not found for given scientific name' });
        return res.json(plant);
    } catch(error){
        console.error('getPlantByLatinName error', error);
        return res.status(500).json({ message: 'Error fetching plant by latin name', error: error.message });
    }
}

export default {
    getAllPlants,
    getPlantById,
    getAllPlantDecorations,
    getPlantDecorationById,
    getDecorationByPlantId,
    addDecorationByPlantId,
    getMyPlants,
    getPlantsByRoomId,
    identifyPlant,
    getPlantByLatinName
};