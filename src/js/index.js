const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "pbrtzsa2xuet",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "yt0uClCliDLwak9_UU8QNA_4Ft2rQrQSXFCMHh2H42g"
});

//variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

//cart
let cart = [];
// buttons 
let buttnsDOM = []; 

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();
  //setup app
  ui.setupApp();
  // get all products
  products.getProducts().then(products => {
    ui.displayProducts(products)
    Storage.saveProducts(products)
  }).then(()=>{
    ui.getBagButtons();
    ui.cartLogic();
  });
});