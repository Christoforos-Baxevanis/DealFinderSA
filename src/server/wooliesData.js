const puppeteer = require('puppeteer');

async function scrapeProduct(url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const getProducts = await page.evaluate(() => {

    const productContainers= document.querySelectorAll('.product-list__item');

    let productsArr = [];
    productContainers.forEach(element => {
      var productName = element.querySelector('.range--title.product-card__name a'); //Find name

      var productPrice = element.querySelector('.product-card__actions span strong'); //Find current price
      if (productPrice == null){
        productPrice = 'oprice'
      }

      var promoPrice = element.querySelector('.product__special');//Find Promo Price
      var rewardPrice = element.querySelector('.plp-promotion-font');
      if (rewardPrice == null){
        rewardPrice = "";
      }
      
      var productSrc = element.querySelector('.product--image img'); //Find src
      if (productSrc == null) {
        
        if (productSrc == null) {
          productSrc = 'src';
        }
        else{
          productSrc = productSrc.getAttribute('data-src');
  
        }
      }
      else{
        productSrc = productSrc.getAttribute('data-src');

      }
      productsArr.push({
        name: productName.innerText,
        orginalPrice: productPrice.innerHTML,
        WREprice: rewardPrice.innerHTML,
        promoPrice: promoPrice.innerText,
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
