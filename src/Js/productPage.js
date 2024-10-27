const $ = document;
const backToMainPage = $.querySelector(".view-cart-btn");
const productTitle = $.querySelector("#title");
const productDec = $.querySelector(".product-description");
const productPrice = $.querySelector(".price");
const addToCartBtn= $.querySelector(".add-to-cart-btn")
//   پایان گرفتن المنت ها از دام

//     آرایه تمام محصولات
let allItems = [
  {
    id: 1,
    title: "پیراهن",
    price: 200000,
    image: "https:via.placeholder.com/150",
    count: 1,
  },
  {
    id: 2,
    title: "موبایل",
    price: 20000000,
    image: "https:via.placeholder.com/150",
    count: 1,
  },
  {
    id: 3,
    title: "تلوزیون",
    price: 30000000,
    image: "https:via.placeholder.com/150",
    count: 1,
  },
  {
    id: 4,
    title: "لپتاپ",
    price: 70000000,
    image: "https:via.placeholder.com/150",
    count: 1,
  },
  {
    id: 5,
    title: "کیف",
    price: 400000,
    image: "https:via.placeholder.com/150",
    count: 1,
  },
  {
    id: 6,
    title: "کیس گیمینگ",
    price: 100000000,
    image: "https:via.placeholder.com/150",
    count: 1,
  },
];

//   دکمه برگشت به صفحه قبل
backToMainPage.addEventListener("click", function () {
  history.back();
});

//    پیدا کردن آیدی صفحه
let url = new URLSearchParams(location.search);
let pageId = url.get("id");

//    پیدا کردن آبجکت محصول صفحه
let pageObject = allItems.find(function (item) {
  return item.id === Number(pageId);
});
console.log(pageObject);

//   قرار دادن اطلاعات محصول در دام
productTitle.innerHTML = pageObject.title;
productDec;
productPrice.innerHTML = pageObject.price + " تومان";
