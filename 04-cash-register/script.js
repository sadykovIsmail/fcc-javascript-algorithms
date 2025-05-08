let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const cashInput  = document.getElementById('cash');
const changeDiv  = document.getElementById('change-due');
const btn        = document.getElementById('purchase-btn');
const priceDisp  = document.getElementById('price-display');

priceDisp.textContent = price.toFixed(2);

const DENOMS = [
  { name: 'ONE HUNDRED', val: 100 },
  { name: 'TWENTY',       val: 20  },
  { name: 'TEN',          val: 10  },
  { name: 'FIVE',         val: 5   },
  { name: 'ONE',          val: 1   },
  { name: 'QUARTER',      val: 0.25},
  { name: 'DIME',         val: 0.1 },
  { name: 'NICKEL',       val: 0.05},
  { name: 'PENNY',        val: 0.01}
];
btn.addEventListener('click', () => {
  changeDiv.textContent = '';
  const paid = parseFloat(cashInput.value);

  if (isNaN(paid) || paid < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }
  if (paid === price) {
    changeDiv.textContent = 'No change due - customer paid with exact cash';
    return;
  }

  let change = parseFloat((paid - price).toFixed(2));

  const totalCID = parseFloat(
    cid.reduce((sum, [, amt]) => sum + amt, 0).toFixed(2)
  );

  if (change > totalCID) {
    changeDiv.textContent = 'Status: INSUFFICIENT_FUNDS';
    return;
  }

  const breakdown = [];
  let remaining = change;

  for (let {name, val} of DENOMS) {
    const drawerAmt = cid.find(c => c[0] === name)[1];
    let count = 0;

    while (remaining >= val && drawerAmt >= (count+1)*val - 0.0001) {
      remaining = parseFloat((remaining - val).toFixed(2));
      count++;
    }
    if (count > 0) {
      breakdown.push({ name, amt: (count * val).toFixed(2) });
    }
  }

  if (remaining > 0) {
    changeDiv.textContent = 'Status: INSUFFICIENT_FUNDS';
    return;
  }

  const usedTotal = breakdown
    .reduce((sum, {amt}) => sum + parseFloat(amt), 0)
    .toFixed(2);
  if (parseFloat(usedTotal) === totalCID) {
    const parts = breakdown.map(c => `${c.name}: $${c.amt}`);
    changeDiv.textContent = `Status: CLOSED ${parts.join(' ')}`;
    return;
  }

  const parts = breakdown.map(c => `${c.name}: $${c.amt}`);
  changeDiv.textContent = `Status: OPEN ${parts.join(' ')}`;
});


