// State management
let lockedColors = new Set();
let currentPalette = [];

// DOM Elements
const generateBtn = document.getElementById('generateBtn');
const saveBtn = document.getElementById('saveBtn');
const presetSelect = document.getElementById('presetPalettes');
const colorBoxes = document.querySelectorAll('.color-box');

// Preset palettes
const presetPalettes = {
    ocean: ['#1B4B82', '#2D7DA0', '#468FAF', '#89C2D9', '#A9D6E5'],
    forest: ['#2D5A27', '#3E7A34', '#4A9B42', '#7BC950', '#9EDB9E'],
    sunset: ['#FF6B6B', '#FF8E72', '#FFA07A', '#FFB6C1', '#FFC0CB'],
    neon: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF00FF', '#00FF00'],
    pastel: ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFE4BA']
};

// Generate a random color
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Update color display
function updateColorDisplay(colorBox, color) {
    const colorElement = colorBox.querySelector('.color');
    const hexCode = colorBox.querySelector('.hex-code');
    colorElement.style.backgroundColor = color;
    hexCode.textContent = color;
}

// Generate new palette
function generatePalette() {
    for (let i = 0; i < colorBoxes.length; i++) {
        if (!lockedColors.has(i + 1)) {
            const color = generateRandomColor();
            currentPalette[i] = color;
            updateColorDisplay(colorBoxes[i], color);
        }
    }
}

// Toggle color lock
function toggleColorLock(colorBox, colorIndex) {
    const lockBtn = colorBox.querySelector('.lock-btn');
    if (lockedColors.has(colorIndex)) {
        lockedColors.delete(colorIndex);
        lockBtn.textContent = '🔓';
        lockBtn.classList.remove('locked');
    } else {
        lockedColors.add(colorIndex);
        lockBtn.textContent = '🔒';
        lockBtn.classList.add('locked');
    }
}

// Save palette
function savePalette() {
    const paletteData = {
        colors: currentPalette,
        timestamp: new Date().toISOString()
    };
    
    const savedPalettes = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
    savedPalettes.push(paletteData);
    localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
    
    alert('Palette saved successfully!');
}

// Apply preset palette
function applyPresetPalette(presetName) {
    if (presetPalettes[presetName]) {
        currentPalette = [...presetPalettes[presetName]];
        colorBoxes.forEach((box, index) => {
            updateColorDisplay(box, currentPalette[index]);
        });
    }
}

// Event Listeners
generateBtn.addEventListener('click', generatePalette);
saveBtn.addEventListener('click', savePalette);

presetSelect.addEventListener('change', (e) => {
    if (e.target.value) {
        applyPresetPalette(e.target.value);
    }
});

colorBoxes.forEach((box, index) => {
    const lockBtn = box.querySelector('.lock-btn');
    lockBtn.addEventListener('click', () => toggleColorLock(box, index + 1));
    
    // Set default lock icon to unlocked
    lockBtn.textContent = '🔓';
});

// Initialize
generatePalette(); 