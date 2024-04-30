console.log('====================================');
console.log("Connected");
console.log('====================================');


// const colorPicker = document.querySelector('.color-picker');
// const colorItems = document.querySelectorAll('.color-item');

// colorPicker.addEventListener('click', (event) => {
//   const clickedItem = event.target;
//   if (clickedItem.classList.contains('color-item')) {
//     colorItems.forEach(item => item.classList.remove('selected'));
//     clickedItem.classList.add('selected');
//     console.log(`Selected color: ${clickedItem.dataset.color}`); // Optional: Log selected color
//   }
// });

const colorPicker = document.querySelector('.color-picker');
const colorItems = document.querySelectorAll('.color-item');

colorPicker.addEventListener('click', (event) => {
  const clickedItem = event.target;
  if (clickedItem.classList.contains('color-item')) {
    colorItems.forEach(item => item.classList.remove('selected'));
    clickedItem.classList.add('selected');
    console.log(`Selected color: ${clickedItem.dataset.color}`);
  }
});

const cartNumber = document.querySelector('.adder');
const cart = document.querySelector('.cart');

cart.addEventListener('click', ()=>{
  // cartNumber.textContent = parseInt(cartNumber.textContent) + 1;
  cartNumber.querySelector('h3').textContent = parseInt(cartNumber.querySelector('h3').textContent) + 1;
})

