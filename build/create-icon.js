const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a 512x512 canvas
const canvas = createCanvas(512, 512);
const ctx = canvas.getContext('2d');

// Create gradient background
const gradient = ctx.createLinearGradient(0, 0, 512, 512);
gradient.addColorStop(0, '#667eea');
gradient.addColorStop(1, '#764ba2');

// Fill background
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 512, 512);

// Draw white border
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 8;
ctx.strokeRect(8, 8, 496, 496);

// Draw left lens (black circle)
ctx.fillStyle = '#1a1a1a';
ctx.beginPath();
ctx.ellipse(200, 256, 60, 40, 0, 0, 2 * Math.PI);
ctx.fill();
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 3;
ctx.stroke();

// Draw right lens (black circle)
ctx.beginPath();
ctx.ellipse(312, 256, 60, 40, 0, 0, 2 * Math.PI);
ctx.fill();
ctx.stroke();

// Draw bridge
ctx.fillStyle = '#ffffff';
ctx.fillRect(260, 240, 52, 8);

// Draw left temple
ctx.fillRect(140, 240, 8, 32);

// Draw right temple
ctx.fillRect(364, 240, 8, 32);

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('build/icon.png', buffer);

console.log('Icon created successfully!'); 