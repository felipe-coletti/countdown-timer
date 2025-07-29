export const formatNumber = (value, type) => {
    let onlyNumbers = String(value).replace(/\D/g, '').slice(0, 2)

    if (onlyNumbers.length === 0) return '00'

    let num = parseInt(onlyNumbers, 10)

    if (isNaN(num)) return '00'
    if (type === 'hh') num = Math.min(num, 23)
    else num = Math.min(num, 59)

    return num.toString().padStart(2, '0')
}