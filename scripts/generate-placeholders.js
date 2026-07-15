const fs = require('fs');
const path = require('path');

const placeholdersDir = path.join(__dirname, '..', 'public', 'placeholders');
if (!fs.existsSync(placeholdersDir)) {
  fs.mkdirSync(placeholdersDir, { recursive: true });
}

// A valid 1x1 transparent PNG base64 string
const base64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const buffer = Buffer.from(base64Png, 'base64');

const files = [
  'emoji_detective.png',
  'emoji_laughing.png',
  'emoji_panic.png',
  'emoji_robot.png',
  'emoji_thinking.png',
  'emoji_heart.png',
  'emoji_happy.png',
  'emoji_party.png',
  'emoji_confetti.png',
  'emoji_judge.png',
  'emoji_love.png'
];

files.forEach(file => {
  fs.writeFileSync(path.join(placeholdersDir, file), buffer);
});
console.log('Placeholders created successfully!');
