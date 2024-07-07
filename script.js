document.addEventListener("DOMContentLoaded", () => {
  const menuItems = [
    {
      name: "Espresso",
      price: 3.0,
      label: "Best",
      image: "images/espresso.jpg",
    },
    {
      name: "Latte",
      price: 4.0,
      label: "New",
      image: "images/latte.jpg",
    },
    {
      name: "Cappuccino",
      price: 4.5,
      label: "",
      image: "images/cappuccino.jpg",
    },
    {
      name: "Americano",
      price: 3.5,
      label: "Best",
      image: "images/americano.jpg",
    },

    {
      name: "Mocha",
      price: 4.5,
      label: "Best",
      image: "images/mocha.webp",
    },
  ];

  localStorage.setItem("menuItems", JSON.stringify(menuItems));

  loadMenu();
  loadOrder();
});

function loadMenu() {
  const menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];
  const menuContainer = document.getElementById("menuItems");
  menuContainer.innerHTML = "";
  menuItems.forEach((item) => {
    let menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");
    menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <div class="price">$${item.price.toFixed(2)}</div>
            ${item.label ? `<div class="label">${item.label}</div>` : ""}
            <button onclick="addToOrder('${item.name}', ${
      item.price
    })">Add to Order</button>
        `;
    menuContainer.appendChild(menuItem);
  });
}

function addToOrder(name, price) {
  let order = JSON.parse(localStorage.getItem("order")) || [];
  const existingItemIndex = order.findIndex((item) => item.name === name);
  if (existingItemIndex > -1) {
    order[existingItemIndex].quantity += 1;
  } else {
    order.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("order", JSON.stringify(order));
  loadOrder();
}

function loadOrder() {
  let order = JSON.parse(localStorage.getItem("order")) || [];
  let orderList = document.getElementById("orderList");
  let totalPriceElement = document.getElementById("totalPrice");
  orderList.innerHTML = "";
  let totalPrice = 0;
  order.forEach((item, index) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <button onclick="removeFromOrder(${index})">Remove</button>
        `;
    totalPrice += item.price * item.quantity;
    orderList.appendChild(listItem);
  });
  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

function removeFromOrder(index) {
  let order = JSON.parse(localStorage.getItem("order")) || [];
  if (order[index].quantity > 1) {
    order[index].quantity -= 1;
  } else {
    order.splice(index, 1);
  }
  localStorage.setItem("order", JSON.stringify(order));
  loadOrder();
}

function clearOrder() {
  localStorage.removeItem("order");
  loadOrder();
}

function checkout() {
  let modal = document.getElementById("checkoutModal");
  modal.style.display = "block";
}

function closeModal() {
  let modal = document.getElementById("checkoutModal");
  modal.style.display = "none";
}

function pay(method) {
  alert(`Paid with ${method}`);
  clearOrder();
  closeModal();
}
