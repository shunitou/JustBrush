const fs = require('fs');

// Retrieve image data from the database
const query = 'SELECT image_data FROM images WHERE id = $1;';
const imageId = 1; // Replace with the ID of the image you want to retrieve
const params = [imageId];

const result = await db.one(query, params);

// Save image data as a file
const imageData = result.image_data;
const imageFilePath = 'path/to/save/image.jpg'; // Replace with the desired file path and extension

fs.writeFileSync(imageFilePath, imageData);

console.log('Image file saved successfully');