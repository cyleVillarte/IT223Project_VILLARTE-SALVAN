document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.navLinks');
  if (menuIcon) {
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('show');
      navLinks.classList.toggle('show');
    });
  }
  
  const cartIcon = document.querySelector('.fa-solid.fa-bag-shopping');

  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  let cartCount = 0;
  let cartItems = [];

  const storedCartItems = localStorage.getItem('cartItems');
  if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
    cartCount = cartItems.length;

    if (cartIcon) {
      cartIcon.textContent = cartCount;
    }

    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = '';

      cartItems.forEach((cartItem) => {
        const cartItemElement = createCartItemElement(cartItem);
        cartItemsContainer.appendChild(cartItemElement);
      });
    }
  }
   
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      cartCount++;

      if (cartIcon) {
        cartIcon.textContent = cartCount;
      }

      const productId = button.dataset.productId;
      const product = getProductById(productId);

      if (product) {
        const cartItem = {
          id: cartCount,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1,
        };

        cartItems.push(cartItem);

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        const cartItemsContainer = document.querySelector('.cart-items');
        if (cartItemsContainer) {
          const cartItemElement = createCartItemElement(cartItem);
          cartItemsContainer.appendChild(cartItemElement);
        }
        updateCartTotal();
      }
    });
  });

  function getProductById(productId) {
    if (productId === '1') {
      return {
        id: productId,
        name: 'Oranda',
        image: 'images/image-oranda.png',
        price: 100,
      };
    } else if (productId === '2') {
      return {
        id: productId,
        name: 'Ranchu',
        image: 'images/image-ranchu.png',
        price: 150,
      };
    } else if (productId === '3') {
      return {
        id: productId,
        name: 'Ryukin',
        image: 'images/image-ryukin.png',
        price: 200,
      };
    } else if (productId === '4') {
      return {
        id: productId,
        name: 'High Back Red Arowana',
        image: 'images/image-arowana.png',
        price: 10000,
      };
    } else if (productId === '5') {
      return {
        id: productId,
        name: 'High Back Golden Arowana',
        image: 'images/image-gold-arowana.png',
        price: 10000,
      };
    } else if (productId === '6') {
      return {
        id: productId,
        name: 'High Back Black Arowana',
        image: 'images/image-black-arowana.png',
        price: 10000,
      };
    } else if (productId === '7') {
      return {
        id: productId,
        name: 'Glass Filter',
        image: 'images/glass-filter-removebg-preview.png',
        price: 1000,
      };
    } else if (productId === '8') {
      return {
        id: productId,
        name: 'Water Pump',
        image: 'images/water-pump1-removebg-preview.png',
        price: 500,
      };
    } else if (productId === '9') {
      return {
        id: productId,
        name: 'Aquarium LED Lights',
        image: 'images/image-lights.png',
        price: 1000,
      };
    } else if (productId === '10') {
      return {
        id: productId,
        name: 'Filter Media',
        image: 'images/filter-media1-removebg-preview.png',
        price: 100,
      };
    } else if (productId === '11') {
      return {
        id: productId,
        name: 'Glass Cleaner',
        image: 'images/image-glasscleaner.png',
        price: 200,
      };
    } else if (productId === '12') {
      return {
        id: productId,
        name: 'Air Pump',
        image: 'images/image-airpump.png',
        price: 250,
      };
    } else if (productId === '13') {
      return {
        id: productId,
        name: 'Hikari Purple',
        image: 'images/image-hikary.png',
        price: 600,
      };
    } else if (productId === '14') {
      return {
        id: productId,
        name: 'Hikari Green',
        image: 'images/image-hikarigreen.png',
        price: 500,
      };
    } else if (productId === '15') {
      return {
        id: productId,
        name: 'Hikari Green',
        image: 'images/image-hikarired.png',
        price: 600,
      };
    } else if (productId === '16') {
      return {
        id: productId,
        name: 'Hikari Lionhead',
        image: 'images/image-hikarilionhead.png',
        price: 700,
      };
    } else if (productId === '17') {
      return {
        id: productId,
        name: 'Extreme Advance',
        image: 'images/image-extreme.png',
        price: 800,
      };
    } else if (productId === '18') {
      return {
        id: productId,
        name: 'Mizuho',
        image: 'images/image-mizuho.png',
        price: 950,
      };
    }

    return null;
  }

  function createCartItemElement(cartItem) {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');

    const productImage = document.createElement('img');
    productImage.src = cartItem.image;
    productImage.alt = cartItem.name;
    cartItemElement.appendChild(productImage);

    const productName = document.createElement('p');
    productName.textContent = cartItem.name;
    productName.style.marginRight = '8px'; // Add space below the product name
    productName.style.fontWeight = 'bold'; 
    cartItemElement.appendChild(productName);

    const productPrice = document.createElement('p');
    productPrice.textContent = `Price: P${cartItem.price}`;
    
    cartItemElement.appendChild(productPrice);

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = '1';
    quantityInput.value = cartItem.quantity;
    quantityInput.style.marginLeft = '8px'; // Add space below the quantity input
    cartItemElement.appendChild(quantityInput);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-button';
    deleteButton.style.marginLeft = "10px";
    deleteButton.style.borderRadius = "20px";
    cartItemElement.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
      removeCartItem(cartItem.id);
      cartItemsContainer.removeChild(cartItemElement);
      updateCartUI();
    });

    // Update the cart total when the quantity changes
    quantityInput.addEventListener('change', () => {
      cartItem.quantity = parseInt(quantityInput.value);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartTotal();
    });

    return cartItemElement;
  }

  function removeCartItem(itemId) {
    cartItems = cartItems.filter((item) => item.id !== itemId);
    cartCount = cartItems.length;

    if (cartIcon) {
      cartIcon.textContent = cartCount;
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  // Retrieve cart items from localStorage
  if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
  }

  // Get the cart total element
  const totalElement = document.getElementById('total-price');

  // Calculate and update the cart total
  function updateCartTotal() {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    totalElement.textContent = totalPrice.toFixed(2);
  }

  // Call the updateCartTotal function initially
  updateCartTotal();
});
