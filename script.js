console.log('====================================');
console.log("Connected");
console.log('====================================');


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


// fetching data
document.addEventListener('DOMContentLoaded', () => {
  async function displayData() {
    try {
      // Fetching the data from the API
      const data = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448");
      const jsonData = await data.json();

      // Loading the data on the website dynamically

      // title, vendor, description
      const title = document.querySelector('#title');
      const vendor = document.querySelector('#vendor');
      const description = document.querySelector('.product');

      title.innerHTML = jsonData.product.title;
      vendor.innerHTML = jsonData.product.vendor;
      description.innerHTML = jsonData.product.description;

      const images = jsonData.product.images;

      const mainImage = document.querySelector('.img');
      if (!mainImage) {
        console.error("Main image element not found!");
        return;
      }

      if (images.length === 0) {
        console.error("No images found in the data!");
        return;
      }

      // loading the colors in the color picker
      const colors = jsonData.product.options[0].values
      console.log(colors)
      const colorItems = document.querySelector('.color-item');

      colorItems.forEach((item, index) => {
        const color = colors[index];
        const colorName = Object.keys(color)[0];
        const colorValue = color[colorName];
        item.style.backgroundColor = colorValue;

        // Add color name as data attribute for future reference if needed
        item.dataset.colorName = colorName;
    });


      // loading the primary image (the display image)

      // const imageSrc = images[0].src;
      // console.log(imageSrc)
      // mainImage.src = imageSrc;

      const slideDiv = document.querySelector('.slide');
      if (!slideDiv) {
        console.error("Slide container element not found!");
        return;
      }

      const imageItems = slideDiv.querySelectorAll('.item img');

      // error handling for images availability
      if (imageItems.length !== images.length) {
        console.error("Number of image elements does not match the number of images in the data!");
        return;
      }
      // loading the images in the slide div
      // imageItems.forEach((imgElement, index) => {
      //   imgElement.src = images[index].src;
      //   imgElement.alt = `Image ${index + 1}`;
      // });
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  }

  displayData();
});


