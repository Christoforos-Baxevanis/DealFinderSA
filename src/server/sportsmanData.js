const e = require('express');
const puppeteer = require('puppeteer');

async function scrapeProduct(url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const getProducts = await page.evaluate(() => {

    const productContainers= document.querySelectorAll('.grid-item');

    let productsArr = [];
    productContainers.forEach(element => {
      var productName = element.querySelector('.title strong a');
      if (productName == null) {
        var productName = 'NAME';
      }

      var productPrices = element.querySelector('.price.markeddown');
      if (productPrices == null) {
        var productPrices = 'PRICE';
      }
      else{
        productPrices = productPrices.innerText;
      }
      var pos = productPrices.indexOf(".");
      var pos2 = productPrices.indexOf("\n");
      var pos3 = productPrices.length
      var newPrice = productPrices.substring(0, pos+3);
      var oldPrice = productPrices.substring(pos+6, pos2);
      var savePrice = productPrices.substring(pos2+1, pos3);

      var productSrc = element.querySelector('.card-inner-wrapper a');
      if (productSrc == null) {
        productSrc = 'https'
      }
      else{
        productSrc = productSrc.innerHTML;
      }
      var start = productSrc.indexOf("src");
      var end = productSrc.indexOf("alt");
      var image = productSrc.substring(start+5, end-2);

      productsArr.push({
        name: productName.innerHTML,
        newprice: newPrice,
        oldprice: oldPrice,
        saveprice: savePrice,
        src: image
        
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