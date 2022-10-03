const e = require('express');
const puppeteer = require('puppeteer');

async function scrapeProduct(url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const getProducts = await page.evaluate(() => {

    const productContainers= document.querySelectorAll('.mak-product-tiles-container__product-tile.bv-product-tile.mak-product-card-inner-wrapper');

    let productsArr = [];
    productContainers.forEach(element => {
      var productName = element.querySelector('.product-tile-inner__productTitle.js-gtmProductLinkClickEvent.text-overflow-ellipsis.line-clamp-2 span');
      
      var productPrices = element.querySelector('.col-xs-12.price.ONPROMOTION');
      if (productPrices == null) {
        productPrices = element.querySelector('.col-xs-12.price.ONLINEEXCLUSIVE');
        if (productPrices == null) {
          productPrices = element.querySelector('.col-xs-12.price.MORE4LESS_BUNDLE');
          if (productPrices == null) {
            var productPrices = 'PRICE';
          }
          else{
            productPrices = productPrices.innerText;
          }
        }
        else{
          productPrices = productPrices.innerText;
        }
      }
      else{
        productPrices = productPrices.innerText;
      }

      var productSaving = element.querySelector('.col-xs-12.saving');
      if (productSaving == null) {
        productSaving = 'PRICE'
      }
      else{
        productSaving = productSaving.innerText;
      }

      var productSrc = element.querySelector('.product-tile-inner__img.js-gtmProductLinkClickEvent img');
      if (productSrc == null) {
        productSrc = 'https'
      }
      else{
        productSrc = productSrc.getAttribute('data-src');

      }
      productsArr.push({
        name: productName.innerHTML,
        price: productPrices,
        priceSave: productSaving,
        src: productSrc
        
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
