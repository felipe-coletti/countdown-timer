import { formatNumber } from "./utils.js"

const startButton = document.getElementById('start-button')
const stopButton = document.getElementById('stop-button')
const menu = document.getElementById('menu')
const hoursInput = document.getElementById('hours-input')
const minutesInput = document.getElementById('minutes-input')
const secondsInput = document.getElementById('seconds-input')
const display = document.getElementById('display')
const hoursDisplay = document.getElementById('hours-display')
const minutesDisplay = document.getElementById('minutes-display')
const secondsDisplay = document.getElementById('seconds-display')
const playButton = document.getElementById('play-button')

let isRecording = false
let isPlaying = false

const setDisplayTime = (hours, minutes, seconds) => {
    hoursDisplay.textContent = formatNumber(hours, 'hh')
    minutesDisplay.textContent = formatNumber(minutes, 'mm')
    secondsDisplay.textContent = formatNumber(seconds, 'ss')
}

const setupDisplay = () => setDisplayTime(hoursInput.value, minutesInput.value, secondsInput.value)

const updatePlayButtonText = () => {
    playButton.textContent = isPlaying ? 'Pause' : 'Play'
}

const playPause = () => {
    isPlaying = !isPlaying

    updatePlayButtonText()
}

startButton.addEventListener('click', () => {
    if (!isRecording) {
        isRecording = true

        setupDisplay()
        
        isPlaying = true

        updatePlayButtonText()
    
        menu.style.display = 'none'
        display.style.display = 'flex'
    }
})

stopButton.addEventListener('click', () => {
    if (isRecording) {
        isRecording = false

        setDisplayTime(0, 0, 0)

        if (isPlaying) {
            isPlaying = false

            updatePlayButtonText()
        }
    
        menu.style.display = 'flex'
        display.style.display = 'none'
    }
})

playButton.addEventListener('click', playPause)
