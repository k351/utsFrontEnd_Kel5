import productsData from './productsData.js';
import { addToWishlist, loadIconStates } from './addToWishlist.js';

document.addEventListener('DOMContentLoaded', function() {
  const compareButton = document.querySelector('.compare-button');
  const compareProduct = document.querySelector('.compare-product');
  const compareLine = document.querySelector('.compare-line')
  const mainProduct = document.querySelector('.main-product');
  const mainDetails = document.querySelector('.main-product-details');
  const productContainer = document.querySelector('.product-container');
  const mainSummary1 = document.querySelector('.main-product-summary1');
  const compareListContainer = document.querySelector('.compare-list-container');
  const compareListClose = document.getElementById('compare-list-close');

  compareButton.addEventListener('click', () => {
    if (compareListContainer.classList.contains('compare-list-container-show') || compareProduct.classList.contains('show')) {
      compareProduct.classList.remove('show');
      compareLine.classList.remove('show');
      mainProduct.classList.remove('main-product-show');
      mainSummary1.classList.remove('show')
      compareListContainer.classList.remove('compare-list-container-show');
    } else {
        compareListContainer.classList.add('compare-list-container-show');
    }
  })

  compareListClose.addEventListener('click', () => {
    compareListContainer.classList.remove('compare-list-container-show');
  })

  function updatecompare(e) {
    if(e.matches){
      let comparableDiv = document.createElement('div');
      comparableDiv.classList.add('comparable');
      productContainer.insertBefore(comparableDiv, compareProduct);
      comparableDiv.appendChild(compareProduct);
      comparableDiv.appendChild(compareLine);
      comparableDiv.appendChild(mainProduct);
    }
    else {
      productContainer.insertBefore(mainProduct, mainDetails);
      productContainer.insertBefore(compareLine, mainProduct);
      productContainer.insertBefore(compareProduct, compareLine);

      const comparableDiv = document.querySelector('.comparable');
      if(comparableDiv) {
        comparableDiv.remove();
      }
    }
  }

  const mediaQuery = window.matchMedia('(max-width: 1150px)')
      mediaQuery.addListener(updatecompare)
      updatecompare(mediaQuery)
});

function updateCompareProduct(item) {
  const compareProductContainer = document.querySelector('.compare-product-image');
  const compareProductImage = document.querySelector('.compare-product-image img');
  const compareProductTitle = document.querySelector('.compare-summary h3');
  const compareProductPrice = document.querySelector('.compare-summary h2');
  const iconStates = loadIconStates();
  const isInWishlist = iconStates[item.name] || false;
  const wishlistButton = document.createElement('button');
  wishlistButton.classList.add('wishlist-btn');
  wishlistButton.setAttribute('aria-label', isInWishlist ? 'Remove from wishlist' : 'Add to wishlist');
  wishlistButton.innerHTML = `<i class="${isInWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"
                              style="color: ${isInWishlist ? 'var(--secondary-color)' : 'gray'};"></i>`;
  compareProductContainer.appendChild(wishlistButton);
  compareProductImage.src = item.image; 
  compareProductImage.alt = item.name; 
  compareProductTitle.textContent = item.name; 
  compareProductPrice.textContent = item.price;
  wishlistButton.addEventListener('click', function() {
    addToWishlist(item.name, item.image, item.price, item.sold, item.stars, wishlistButton);
    addingComparable();
});
}

function addingComparable() {
  const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
  const compareList = document.querySelector('.compare-list');
  const compareProduct = document.querySelector('.compare-product');
  const compareLine = document.querySelector('.compare-line')
  const mainProduct = document.querySelector('.main-product');
  const mainSummary1 = document.querySelector('.main-product-summary1');
  const productDataElement = document.getElementById('productData');
  const productData = JSON.parse(productDataElement.textContent);

  compareList.innerHTML = '';
  if(wishlistItems.length  === 0 || (wishlistItems.length === 1 && wishlistItems[0].name === productData.name)){
    const listItem = document.createElement('li');
    listItem.textContent = "your wishlist is empty";
    compareList.appendChild(listItem);
  }
  else {
    wishlistItems.forEach(item => {
      if(item.name !== productData.name){
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = item.name;
        link.addEventListener('click', (event) => {
            updateCompareProduct(item);
            compareProduct.classList.add('show');
            compareLine.classList.add('show');
            mainProduct.classList.add('main-product-show');
            mainSummary1.classList.add('show')
        });
        listItem.appendChild(link);
        compareList.appendChild(listItem);
    }
    });
  }
}
document.addEventListener('DOMContentLoaded', addingComparable);