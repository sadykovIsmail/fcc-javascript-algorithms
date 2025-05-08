// Mapping of values to Roman symbols
const romanMap = [
    { value: 1000, symbol: 'M' },
    { value: 900,  symbol: 'CM' },
    { value: 500,  symbol: 'D' },
    { value: 400,  symbol: 'CD' },
    { value: 100,  symbol: 'C' },
    { value: 90,   symbol: 'XC' },
    { value: 50,   symbol: 'L' },
    { value: 40,   symbol: 'XL' },
    { value: 10,   symbol: 'X' },
    { value: 9,    symbol: 'IX' },
    { value: 5,    symbol: 'V' },
    { value: 4,    symbol: 'IV' },
    { value: 1,    symbol: 'I' }
  ];
  
  const inputEl  = document.getElementById('number');
  const btn      = document.getElementById('convert-btn');
  const outputEl = document.getElementById('output');
  
  btn.addEventListener('click', () => {
    const raw = inputEl.value.trim();
    const num = parseInt(raw, 10);
  
    // 1) No input or invalid number
    if (!raw || isNaN(num)) {
      outputEl.textContent = 'Please enter a valid number';
      return;
    }
    // 2) Too small
    if (num < 1) {
      outputEl.textContent = 'Please enter a number greater than or equal to 1';
      return;
    }
    // 3) Too large
    if (num > 3999) {
      outputEl.textContent = 'Please enter a number less than or equal to 3999';
      return;
    }
  
    // 4) Conversion
    let n = num;
    let roman = '';
    for (const { value, symbol } of romanMap) {
      while (n >= value) {
        roman += symbol;
        n -= value;
      }
    }
  
    // 5) Display result
    outputEl.textContent = roman;
  });
  