import { formatNumber } from './utils.js'

const inputs = document.querySelectorAll('.input')

inputs.forEach(input => {
    const type = input.dataset.type

    input.value = '00'

    input.addEventListener('blur', () => {
        input.value = formatNumber(input.value, type)
    })
})