const puppeteer = require('puppeteer');

async function scrapeProductCardDeals(url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const getProducts = await page.evaluate(() => {

    const productContainers= document.querySelectorAll('.productCarouselItemContainer'); //Find product box
    let productsArr = [];
    productContainers.forEach(element => {

      //Find promotional price
      var productPromoPrices = element.querySelector('.promotionContainer.promotionsLongText a span');
      if (productPromoPrices == null) {
        productPromoPrices = element.querySelector('.promotionContainer.promotionsShortText a span');
        if (productPromoPrices == null) {
          productPromoPrices = element.querySelector('.currentPrice.hasSavings');
          if (productPromoPrices == null) {
            productPromoPrices = 'price error';
          }
          else{
            productPromoPrices = productPromoPrices.innerHTML;
            var pos4 = productPromoPrices.indexOf("R");
            var pos5 = productPromoPrices.indexOf("<");
            var promoPriceText = productPromoPrices.substring(pos4, pos5);
            var pos6 = productPromoPrices.indexOf(">");
            var promoPriceCents = productPromoPrices.substring(pos6+1, pos6+3);
            productPromoPrices = promoPriceText + '.' + promoPriceCents;
          }
        }
        else{
          productPromoPrices = productPromoPrices.innerHTML;
        }
      }
      else{
        productPromoPrices = productPromoPrices.innerHTML;
      }

      var productName = element.querySelector('.item-name'); //Find product name
      if (productName == null) {
        productName = 'NAME'
      }
      
      var productPrice = element.querySelector('.currentPrice'); //Find current price
      var productPriceText = productPrice.innerHTML;
      console.log(productPriceText);
      var posR = productPriceText.indexOf("R");
      var pos = productPriceText.indexOf("<");
      var orginalPriceText = productPriceText.substring(posR, pos);
      var pos2 = productPriceText.indexOf(">");
      var productPriceCents = productPriceText.substring(pos2+1, pos2+3);

      if (productPromoPrices === (orginalPriceText + '.' + productPriceCents)){
        var oldPrice = element.querySelector('.oldPrice');
        oldPrice = oldPrice.innerHTML;
        var posR = oldPrice.indexOf("R");
        var pos = oldPrice.indexOf("<");
        var orginalPriceText = oldPrice.substring(posR, pos);
        var pos2 = oldPrice.indexOf(">");
        var productPriceCents = oldPrice.substring(pos2+1, pos2+3);
      }

      var productSrc = element.querySelector('.thumb img');
      if (productSrc == null) {
        productSrc = ''
      }
      else{
        productSrc = productSrc.getAttribute('src');
      }

      productsArr.push({
        name: productName.innerText,
        orginalPrice: orginalPriceText,
        priceCents: productPriceCents,
        promoPrice: productPromoPrices,
        src: productSrc
          
      })

    });

    return productsArr;
  })

  await browser.close();
  return getProducts;
}

module.exports = {
  scrapeProductCardDeals
}

