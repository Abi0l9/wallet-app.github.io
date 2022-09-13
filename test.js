const req = fetch('http://localhost:7700/index.html').then((response) => {
  console.log(response.json()) 
}).catch((response) => console.log(response))

console.log(req)
