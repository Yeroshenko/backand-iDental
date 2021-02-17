// ex: 12.04.2020 -> 2020.04.12
const dateReverse = (date) => date.split('.').reverse().join('.')

module.exports = dateReverse