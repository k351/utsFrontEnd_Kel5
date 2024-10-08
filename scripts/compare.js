document.addEventListener('DOMContentLoaded', function() {
  const compareButton = document.querySelector('.compare-button');
  const compareProduct = document.querySelector('.compare-product');
  const compareLine = document.querySelector('.compare-line')
  const mainProduct = document.querySelector('.main-product');
  const mainDetails = document.querySelector('.main-product-details');
  const productContainer = document.querySelector('.product-container');
  const mainSummary1 = document.querySelector('.main-product-summary1');
  // const mainSummary2 = document.querySelector('.main-product-summary2');

  compareButton.addEventListener('click', () => {
    compareProduct.classList.toggle('show');
    compareLine.classList.toggle('show');
    mainProduct.classList.toggle('main-product-show');
    mainSummary1.classList.toggle('show')
    // mainSummary2.classList.toggle('hide')
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