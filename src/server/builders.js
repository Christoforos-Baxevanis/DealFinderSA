const e = require('express');
const puppeteer = require('puppeteer');

async function scrapeProduct(url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const getProducts = await page.evaluate(() => {

    const productContainers= document.querySelectorAll('.card-container');

    let productsArr = [];
    productContainers.forEach(element => {
      var productName = element.querySelector('.description.producturl.track-product-click');
      if (productName == null) {
        productName = 'NAME'
      }

      var productSaving = element.querySelector('.price-was.typo-lightgrey-alt.typo-h4');
      if (productSaving == null) {
        productSaving = 'PRICE'
      }
      else{
        productSaving = productSaving.innerText;
      }

      productPrices = element.querySelector('.price.typo-red');
        if (productPrices == null) {
            var productPrices = 'PRICE';
        }
        else{
            productPrices = productPrices.innerText;
        }

      productsArr.push({
        name: productName.innerText,
        price: productPrices,
        priceSave: productSaving,
        
      })

    });

    return productsArr;
  })

  await browser.close();
  return getProducts;
}
  
module.exports = {
  scrapeProduct
}