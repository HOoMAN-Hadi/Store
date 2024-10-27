//    گرفتن المنت های مورد نیاز از دام
let $ = document;
const listContainer = $.querySelector(".product-list");
const bascketListContainer = $.querySelector(".cart-items");
const viewBasketBtn = $.querySelector(".view-cart-btn");
const basketModal = $.querySelector(".cart-modal");
const basketCloseBtn = $.querySelector(".close-cart-btn");
const basketCount = $.querySelector(".cart-count");
const basketTotalPrice = $.querySelector("#total-price");
const modal = $.querySelector("#itemAddedModal");

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

//    آرایه محصولات سبد خرید
let userBasketItems = [];

//      فانکشن نمایش آیتم های در دام
function displayItems(allItems) {
  allItems.forEach(function (item) {
    listContainer.insertAdjacentHTML(
      "beforeend",
      '<div class="product"> <img src="' +
        item.image +
        '" alt="محصول" /><a href="productPage.html?id=' +
        item.id +
        '"> <h2>' +
        item.title +
        "</h2> </a> <p>توضیحات " +
        item.title +
        '</p> <span class="price">' +
        item.price +
        ' تومان</span> <button class="add-to-cart-btn" onclick="addToUserBasket(' +
        item.id +
        ')">افزودن به سبد</button> </div>'
    );
  });
}

//     فانکشن اضافه کردن آیتم ها به آرایه سبد خرید
function addToUserBasket(itemId) {
  const itemExists = userBasketItems.some((item) => item.id === itemId); // چک کردن وجود آیتم

  if (!itemExists) {
    // اگر آیتم وجود نداشته باشد
    allItems.forEach(function (item) {
      if (item.id === itemId) {
        userBasketItems.push(item);
      }
    });

    createUserBasketInDom(userBasketItems);
    basketCount.innerHTML = "سبد خرید: " + userBasketItems.length;
    displayTotalPrice(userBasketItems);
    setLocalStorage(userBasketItems);

    modal.innerHTML = "<p>محصول با موفقیت به سبد خرید اضافه شد !</p>";
    showModal();
  } else {
    modal.innerHTML = "<p>این محصول قبلاً به سبد خرید اضافه شده است !</p>";
    showModal();
  }
}

function showModal() {
  // اضافه کردن کلاس show برای نمایش modal
  modal.classList.add("show");

  // حذف کلاس show بعد از پایان انیمیشن
  modal.addEventListener("animationend", function () {
    modal.classList.remove("show");
  });
}

//     فانکشن نمایش آیتم های سبد خرید در دام
function createUserBasketInDom(userBasketItems) {
  bascketListContainer.innerHTML = "";
  userBasketItems.forEach(function (item) {
    bascketListContainer.insertAdjacentHTML(
      "beforeend",
      "<li> <span>" +
        item.title +
        " - " +
        item.price +
        ' تومان</span> <input type="number" class="item-quantity" value="' +
        item.count +
        '" min="1" onchange="updateItemCount(' +
        item.id +
        ', this.value)"/> <button class="remove-item-btn" onclick="removeUserBasket(' +
        item.id +
        ')">حذف</button> </li>'
    );
  });
}

//     فانکشن حذف آیتم ها از سبد خرید
function removeUserBasket(itemId) {
  userBasketItems = userBasketItems.filter(function (item) {
    return item.id !== itemId;
  });

  createUserBasketInDom(userBasketItems);
  displayTotalPrice(userBasketItems);
  basketCount.innerHTML = "سبد خرید: " + userBasketItems.length;
  setLocalStorage(userBasketItems);
}

//    فانکشن نمایش جمع کل قیمت
function displayTotalPrice(userBasketItems) {
  let totalPrice = 0;
  userBasketItems.forEach(function (item) {
    totalPrice += item.count * item.price;
  });

  basketTotalPrice.innerHTML = totalPrice + " تومان";
}

//   فانکشن تغییر قیمت کل با تغییر تعداد آیتم
function updateItemCount(itemId, value) {
  userBasketItems.forEach(function (item) {
    if (item.id === itemId) {
      item.count = value;
    }
  });
  displayTotalPrice(userBasketItems);
  setLocalStorage(userBasketItems);
}

//    باز و بسته شدن مدال سبد خرید
viewBasketBtn.addEventListener("click", function () {
  basketModal.classList.toggle("active");
});

basketCloseBtn.addEventListener("click", function () {
  basketModal.classList.remove("active");
});

//   فانکشن ست کردن سبد خرید در لوکال استوریج
function setLocalStorage(list) {
  localStorage.setItem("buyBasketItems", JSON.stringify(list));
}

//   فانکشن گرفتن سبد خرید از لوکال استوریج
function getLocalStorage() {
  let savedBasket = JSON.parse(localStorage.getItem("buyBasketItems"));
  if (savedBasket) {
    userBasketItems = savedBasket;
    createUserBasketInDom(userBasketItems); // نمایش آیتم‌های سبد خرید در DOM
    displayTotalPrice(userBasketItems); // نمایش قیمت کل
    basketCount.innerHTML = "سبد خرید: " + userBasketItems.length; // به‌روز رسانی تعداد آیتم‌های سبد خرید
  }
}

window.addEventListener("load", getLocalStorage());

//    نمایش آیتم ها در صفحه اصلی
displayItems(allItems);
