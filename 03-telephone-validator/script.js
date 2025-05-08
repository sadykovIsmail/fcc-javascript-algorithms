const clear = document.getElementById('clear-btn')
const check = document.getElementById('check-btn')
const input = document.getElementById('user-input')
const p = document.getElementById('results-div')

check.onclick = () => {
  const value = input.value
  const num1 = /^1?\s?\d{3}-\d{3}-\d{4}$/.test(value)
  const num2 = /^1?\s[(]\d{3}[)]\s?\d{3}-\d{4}$/.test(value)
  const num3 = /^1?[(]\d{3}[)]\d{3}-\d{4}$/.test(value)
  const num4 = /^1?\s\d{3}\s?\d{3}\s?\d{4}$/.test(value)
  const num5 = /^\d{10}$/.test(value)
  const num6 = /^\d{3}-\d{3}-\d{4}$/.test(value)
  const num7 = /^[(]\d{3}[)]\d{3}-\d{4}$/.test(value)
if(input.value == ""){
    alert("Please provide a phone number")
  } else if(num1 === true|| num2 === true|| num3 === true|| num4 === true||num5 === true|| num6 === true|| num7=== true){
    p.innerText = `Valid US number: ${value}`
  } else {
    p.innerText = `Invalid US number: ${value}`
  }
  
  
}

clear.onclick = () => 
p.innerText = ""






