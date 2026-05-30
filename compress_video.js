const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

const inputPath = path.join(__dirname, 'public', 'long video', 'Welcome to Jhansi Empire – Experience A Royal Lifestyle_1080p.mp4');
const outputPath = path.join(__dirname, 'public', 'long video', 'Welcome to Jhansi Empire – Experience A Royal Lifestyle_optimized.mp4');

console.log('Starting compression...');
console.log('Input:', inputPath);
console.log('Output:', outputPath);

if (!fs.existsSync(inputPath)) {
    console.error('Input file does not exist!');
    process.exit(1);
}

ffmpeg(inputPath)
    .outputOptions([
        '-vcodec libx264',
        '-crf 28',
        '-preset fast',
        '-vf scale=1280:-2',
        '-acodec aac',
        '-b:a 128k'
    ])
    .on('start', (cmd) => {
        console.log('Spawned FFmpeg with command:', cmd);
    })
    .on('progress', (progress) => {
        console.log(`Processing: ${progress.percent ? progress.percent.toFixed(2) : 0}% done`);
    })
    .on('end', () => {
        console.log('Compression successful!');
        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
        console.log(`Original size: ${(inputStats.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Compressed size: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
    })
    .on('error', (err) => {
        console.error('Error occurred during compression:', err);
    })
    .save(outputPath);
