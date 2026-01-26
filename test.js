import fs from 'node:fs/promises';
import path from 'node:path';

// CHANGE THESE
const imagePath = './plant.jpg';
const API_KEY = '2b10rIDVRbJLkA8oTkhMl4D2Au';

async function identifyPlant() {
  // Read image into a buffer
  const imageBuffer = await fs.readFile(imagePath);

  // Create a Blob from the image
  const imageBlob = new Blob([imageBuffer]);

  // Native FormData (IMPORTANT)
  const form = new FormData();
  form.append('organs', 'leaf');
  form.append('images', imageBlob, path.basename(imagePath));

  const project = 'all';

  try {
    const response = await fetch(
      `https://my-api.plantnet.org/v2/identify/${project}?api-key=${API_KEY}`,
      {
        method: 'POST',
        body: form,
      }
    );

    console.log('Status:', response.status);

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

identifyPlant();

