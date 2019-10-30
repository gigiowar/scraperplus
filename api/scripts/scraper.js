// const interval = require('interval-promise');
const cheerio = require('cheerio');
const request = require('request-promise');

const { Product } = require('../models');

function scrapVkModa(url) {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      transform(body) {
        return cheerio.load(body);
      },
    };

    request.get(options)
      .then(($) => {
        // Go through product list
        $('.ProductItem.t-store').each(function () {
          const name = $(this).find('h2 a').text();
          const description = '';
          let price = $(this).find('.ValorProduto').text();
          price = parseFloat(price.replace(',', '.')).toFixed(2);
          const urlProduct = $(this).find('.ProductImageContent.imageContent1 a').attr('href');
          const image = $(this).find('.ProductImageContent.imageContent1 img').attr('data-original');
          const sizes = [];
          $(this).find('.productVariations .optionValue').each(function () {
            if ($(this).text() !== '') {
              sizes.push($(this).text());
            }
          });

          // Verify if product exists
          Product.findOne({ where: { url: urlProduct } })
            .then((product) => {
              if (product == null) {
                const newProduct = {
                  name,
                  description,
                  price,
                  url: urlProduct,
                  image,
                  sizes: sizes.toString(),
                  category_id: 1,
                };

                Product.create(newProduct);
              }
            });
        });

        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function scrapDistritoModa(url) {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      transform(body) {
        return cheerio.load(body);
      },
    };

    request.get(options)
      .then(($) => {
        // Go through product list
        $('.listagem-item').each(function () {
          const name = $(this).find('.produto-sobrepor').attr('title');
          const description = '';
          let price = $(this).find('.preco-venda').text();
          price = price.replace('R$', '');
          price = parseFloat(price.replace(',', '.')).toFixed(2);
          const urlProduct = $(this).find('.produto-sobrepor').attr('href');
          const image = $(this).find('.imagem-principal').attr('data-imagem-caminho');

          // Verify if product exists
          Product.findOne({ where: { url: urlProduct } })
            .then((product) => {
              if (product == null) {
                const newProduct = {
                  name,
                  description,
                  price,
                  url: urlProduct,
                  image,
                  sizes: '',
                  category_id: 1,
                };

                Product.create(newProduct);
              }
            });
        });

        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function scrapDaluz(url) {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      transform(body) {
        return cheerio.load(body);
      },
    };

    request.get(options)
      .then(($) => {
        // Go through product list
        $('.listagem-item').each(function () {
          const name = $(this).find('.produto-sobrepor').attr('title');
          const description = '';
          let price = $(this).find('.preco-promocional').text();
          price = price.replace('R$', '');
          price = parseFloat(price.replace(',', '.')).toFixed(2);
          const urlProduct = $(this).find('.produto-sobrepor').attr('href');
          const image = $(this).find('.imagem-principal').attr('data-imagem-caminho');

          // Verify if product exists
          Product.findOne({ where: { url: urlProduct } })
            .then((product) => {
              if (product == null) {
                const newProduct = {
                  name,
                  description,
                  price,
                  url: urlProduct,
                  image,
                  sizes: '',
                  category_id: 1,
                };

                Product.create(newProduct);
              }
            });
        });

        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function main() {
  try {
    const pagesToScrape = [
      {
        url: 'https://www.vkmodaplussize.com.br/plus-size/vestidos/',
      },
      {
        url: 'https://www.distritomoda.com.br/vestidos-plus',
      },
      {
        url: 'https://www.daluzplussize.com.br/vestidos',
      },
    ];

    if (pagesToScrape.length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < pagesToScrape.length; i++) {
        const page = pagesToScrape[i];

        if (page.url.indexOf('vkmoda') !== -1) {
          // eslint-disable-next-line no-await-in-loop
          await scrapVkModa(page.url);
        }
        if (page.url.indexOf('distritomoda') !== -1) {
          // eslint-disable-next-line no-await-in-loop
          await scrapDistritoModa(page.url);
        }
        if (page.url.indexOf('daluzplussize') !== -1) {
          // eslint-disable-next-line no-await-in-loop
          await scrapDaluz(page.url);
        }
      }
    } else {
      console.log('Não existem novas urls disponíveis.\n');
    }
  } catch (error) {
    console.log(error);
  }
}

// interval(async () => {
main();
// }, 10000);
