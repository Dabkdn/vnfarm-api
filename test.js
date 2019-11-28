const d1 = new Date("Nov 06 2019");

console.log(d1)

// const current = new Date(Date.now())
// console.log(current.toString())

const isoDate = d1.toISOString()

console.log(isoDate);

console.log(Date.parse(isoDate))

console.log((new Date(Date.parse(isoDate))))

console.log((new Date('2019-11-05T17:00:00.000Z')).toLocaleString())