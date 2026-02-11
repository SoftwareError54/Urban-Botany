import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.PLANTNET_API_KEY;

const image1 = './plant.jpg'
//const image2 = './plant2.jpg'


const identify = async () => {
  const form = new FormData()

  form.append('organs', 'flower');
  form.append('images', fs.createReadStream(image1));

  //form.append('organs', 'leaf');
  //form.append('images', fs.createReadStream(image2));

  const project = 'all'; // You can choose a more specific flora, see: /docs/newfloras

  try {
    const response = await fetch(`https://my-api.plantnet.org/v2/identify/${project}?api-key=${API_KEY}`,
      {
        method: 'post',
        body: form,
      }
    );

    console.log('status', response.status) // should be: 200

    const json = await response.json()
    console.log('json', json)
  } catch (error) {
    console.error('error', error);
  }
};

identify()
