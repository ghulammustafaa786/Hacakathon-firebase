// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOh_hoZticB9fL8EkrIhYqrynaobSYJGQ",
    authDomain: "new-work1122.firebaseapp.com",
    projectId: "new-work1122",
    storageBucket: "new-work1122.appspot.com",
    messagingSenderId: "550003345574",
    appId: "1:550003345574:web:b0e347791625ab99cb8c67",
    measurementId: "G-3R7LHKRX6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


// Add Product
document.getElementById("add-product-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const productName = document.getElementById("product-name").value;
    const productPrice = document.getElementById("product-price").value;
    const productImage = document.getElementById("product-image").value;

    try {
        const productsRef = collection(db, "products");
        await addDoc(productsRef, {
            name: productName,
            price: parseFloat(productPrice),
            imageUrl: productImage
        });

        alert("Product added!");
        loadProducts();
        window.location.replace("../../index.html");

    } catch (e) {
        console.error("Error adding product: ", e);
    }
});

// Load Products
async function loadProducts() {
    const productsRef = collection(db, "products");
    const productsSnapshot = await getDocs(productsRef);
    const productsList = document.getElementById("product-list");

    productsList.innerHTML = "";

    productsSnapshot.docs.forEach((doc) => {
        const product = doc.data();
        const productItem = document.createElement("div");

        productItem.className = "bg-white shadow rounded-lg p-6";
        productItem.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="h-60 w-60 object-cover rounded-full ">
            <h3 class="text-lg font-semibold mt-4">${product.name}</h3>
              <p class="text-gray-500 mt-2">$${product.price.toFixed(2)}</p>
            <button class="mt-4 w-full bg-red-600 text-white py-2 rounded-lg" onclick="deleteProduct('${doc.id}')">Delete</button>
        `;


        productsList.appendChild(productItem);

       
    });
}

// Delete Product
async function deleteProduct(productId)  {
    try {
        await deleteDoc(doc(db, "products", productId));

        alert("Product deleted!");
        loadProducts();

} catch (e) {
    console.error("Error deleting product: ", e);
    }
    }
    


window.onload = loadProducts;



