const oldObj = {
  Georgia: {
    notes: "lorem ipsum",
    lat: "32.1656",
    long: "82.9001",
  },
  Alabama: {
    notes: "lorem ipsum",
    lat: "32.3182",
    long: "86.9023",
  },
}

const res = Object.entries(oldObj).map(([name, obj]) => ({ name, ...obj }))

console.log(res)
