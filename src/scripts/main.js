import { formatNumber } from './utils.js'

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

let isPlaying = false
let totalSeconds = 0
let intervalId = null

const setDisplayTime = (hours, minutes, seconds) => {
	hoursDisplay.textContent = formatNumber(hours, 'hh')
	minutesDisplay.textContent = formatNumber(minutes, 'mm')
	secondsDisplay.textContent = formatNumber(seconds, 'ss')
}

const setupDisplay = () => {
	const hours = parseInt(hoursInput.value) || 0
	const minutes = parseInt(minutesInput.value) || 0
	const seconds = parseInt(secondsInput.value) || 0

	totalSeconds = hours * 3600 + minutes * 60 + seconds

	updateDisplayFromTotalSeconds()
}

const updateDisplayFromTotalSeconds = () => {
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60

	setDisplayTime(hours, minutes, seconds)
}

const updatePlayButtonText = () => {
	playButton.textContent = isPlaying ? 'Pausar' : 'Retomar'
}

const startCountdown = () => {
	if (intervalId !== null) return

	intervalId = setInterval(() => {
		if (totalSeconds > 0 && isPlaying) {
			totalSeconds--

			updateDisplayFromTotalSeconds()
		} else {
			resetTimer()
			alert('Time is up!')
		}
	}, 1000)
}

const playPause = () => {
	if (totalSeconds <= 0) return

	isPlaying = !isPlaying

	updatePlayButtonText()

	if (isPlaying && intervalId === null) {
		startCountdown()
	} else if (!isPlaying && intervalId !== null) {
		clearInterval(intervalId)

		intervalId = null
	}
}

const resetTimer = () => {
	isPlaying = false
	totalSeconds = 0

	clearInterval(intervalId)
	intervalId = null

	setDisplayTime(0, 0, 0)
	updatePlayButtonText()

	menu.style.display = 'flex'
	display.style.display = 'none'
}

startButton.addEventListener('click', () => {
	setupDisplay()

	isPlaying = true

	updatePlayButtonText()
	startCountdown()

	menu.style.display = 'none'
	display.style.display = 'flex'
})

playButton.addEventListener('click', playPause)
stopButton.addEventListener('click', resetTimer)
