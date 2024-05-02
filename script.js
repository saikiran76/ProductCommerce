console.log('====================================');
console.log("Connected");
console.log('====================================');

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
      const fetchedTitle = jsonData.product.title;
      const price = document.querySelector("#price")
      const fetchedPrice = jsonData.product.price;
      const actualPrice = document.querySelector(".off");
      const fetchedActualPrice = jsonData.product.compare_at_price;
      const vendor = document.querySelector('#vendor');
      const description = document.querySelector('.product');
      const cartNumber = document.querySelector('.adder');
      const cart = document.querySelector('.cart');
      const sizeOptions = document.querySelectorAll('.var');
      const cartSection = document.querySelector(".add-to-cart");
      const message = document.querySelector('#message')
      const colorPicker = document.querySelector('.picker')
      // product.options[1].values
      const fetchedOptions = jsonData.product.options[1].values;

      console.log('size options are' + sizeOptions);

      title.innerHTML = jsonData.product.title;
      vendor.innerHTML = jsonData.product.vendor;
      description.innerHTML = jsonData.product.description;
      price.innerHTML = fetchedPrice;
      actualPrice.innerHTML = fetchedActualPrice;

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
      const colorItems = document.querySelectorAll('.color-item');
      console.log('Color-items are' + colorItems);

      colorItems.forEach((item, index) => {
        const color = colors[index];
        const colorName = Object.keys(color)[0];
        const colorValue = color[colorName];
        item.style.backgroundColor = colorValue;

        item.dataset.colorName = colorName;
    });
    // helper functions for color conversions
      function rgbToHex(rgb) {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        
        return hex.toUpperCase(); 
    }

    function hexToColorName(hex) {
      const colorMap = {
          '#000000': 'Black',
          '#FFFFFF': 'White',
          '#FF0000': 'Red',
          '#00FF00': 'Green',
          '#0000FF': 'Blue',
          "#ECDECC": "Yellow",
          "#BBD278":"Green",
          "#BBC1F8":"Blue",
          "#FFD3F8":"Pink"
            };

      hex = hex.toUpperCase();
      if (colorMap.hasOwnProperty(hex)) {
          return colorMap[hex];
      } else {
          return 'Unknown';
      }
  }

    const selectedVariants = {}; 

    colorPicker.addEventListener('click', (event) => {
      const clickedItem = event.target;
      if (clickedItem.classList.contains('color-item')) {
        colorItems.forEach(item => item.classList.remove('selected'));
        clickedItem.classList.add('selected');
        console.log(`Selected color: ${clickedItem.style.backgroundColor}`);
        selectedVariants['color'] = rgbToHex(clickedItem.style.backgroundColor) 
        selectedVariants['color'] = hexToColorName(selectedVariants['color']);

      }
    });

    sizeOptions.forEach((sizeOptionElement, index) => {
      const pElement = sizeOptionElement.querySelector('p');
    
      if (pElement) {
        pElement.innerHTML = fetchedOptions[index]
      } else {
        console.error("Could not find the p");
      }
    });

  // Variant selection and storage logic 
   
  const Picker = document.querySelector('.picker');
    // Size Selection
    sizeOptions.forEach(sizeOption => {
      const radioButton = sizeOption.querySelector('input[type="radio"]'); 
      radioButton.addEventListener('change', () => {
        if (radioButton.checked) {
          selectedVariants.size = radioButton.nextElementSibling.textContent.trim(); 
        }

        console.log("Selected Variants:", selectedVariants); 
      });
    });

    function displayConfirmation() {
      if (selectedVariants.color && selectedVariants.size) {
        console.log("You have selected " + selectedVariants.color + " and " + selectedVariants.size + ".");
        // add a new element into the html document indicating the message

        // let confirmMessage = document.createElement("h3");
        message.style.backgroundColor = selectedVariants.color;
        // confirmMessage.setAttribute("id","confirm-message")
        // confirmMessage.innerText= "You have selected "+ selectedVariants.color+ " and " + selectedVariants.size;
        message.querySelector('p').innerHTML = `Embrace Sideboard with color ${selectedVariants.color} and size ${selectedVariants.size} added to cart`
        // message.style.backgroundColor = selectedVariants.color;
      
      } else {
        alert("Please select both color and size.");
      }
    }

    cart.addEventListener('click', () => {
      // Checking the variant selection (both of the variants)
      if (!selectedVariants.color || !selectedVariants.size) {
        alert("Please select both color and size before adding to cart.");
        return;
      }
      const message = `Embrace Sideboard with Color ${selectedVariants.color} and Size ${selectedVariants.size} added to cart`;

      displayConfirmation()
    
      alert(message);
    
      console.log("Selected item to add to cart:", selectedVariants); 
    });

    // event listener to update the cart number

    cart.addEventListener('click', ()=>{
      // cartNumber.textContent = parseInt(cartNumber.textContent) + 1;
      cartNumber.querySelector('h3').textContent = parseInt(cartNumber.querySelector('h3').textContent) + 1;
      console.log(`Item ${fetchedTitle} is added to the cart`);
    })



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









