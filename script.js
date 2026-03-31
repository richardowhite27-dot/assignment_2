/* IA2 Project: JA Threads | Richardo White - 2103123 */

const products = [
    { id: 1, name: "Independence '62 Heritage", price: 3500, img: "jamaian_1962_tee.jpg", desc: "Classic fit celebrating Jamaica's birth with premium gold-stitch detailing." },
    { id: 2, name: "Jamaica Bold Graphic", price: 3000, img: "jamaica_bold_tee.jpg", desc: "High-contrast typography on breathable cotton for a standout island look." },
    { id: 3, name: "Endless Summer Tank", price: 2800, img: "jamaican_summer_tee.jpg", desc: "Lightweight, moisture-wicking fabric perfect for the Caribbean heat." },
    { id: 5, name: "Kingston City Edition", price: 3500, img: "kingston_jamaica_tee.jpg", desc: "Streetwear aesthetic inspired by the vibrant energy of the capital city." },
    { id: 6, name: "Land We Love Signature", price: 4000, img: "land_we_love_tee.jpg", desc: "Our premium heavy-weight tee featuring the national anthem's iconic lyrics." },
    { id: 7, name: "Proud Yaadie Graphic", price: 3000, img: "proud_jamaican_tee.jpg", desc: "Minimalist design for those who carry the spirit of the 876 everywhere." },
    { id: 8, name: "Slashed Flag Artistic", price: 3800, img: "slashed_jamaican_tee.jpg", desc: "Modern abstract interpretation of the Black, Green, and Gold." },
    { id: 9, name: "Athletic Gold Slim-Fit", price: 4500, img: "slimfit_yellow_tee.jpg", desc: "Tapered performance fit in our signature vibrant athletic gold." },
    { id: 10, name: "Vintage Reggae Roots", price: 4200, img: "vintage_black_reggae_tee.jpg", desc: "Washed-charcoal finish for that authentic old-school vinyl feel." }
];

let cart = JSON.parse(localStorage.getItem('ja_threads_cart')) || [];

// --- DISPLAY PRODUCTS ---
function displayProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = "";
    products.forEach(p => {
        // Ensure "Assets" matches your GitHub folder name exactly (Case-Sensitive)
        grid.innerHTML += `
            <div class="product-card">
                <img src="../Assets/${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p class="product-desc">${p.desc}</p>
                <p class="price">$${p.price.toLocaleString()} JMD</p>
                <button onclick="addToCart(${p.id})">Add to Cart</button>
            </div>`;
    });
}

// --- CART LOGIC ---
function addToCart(id) {
    const p = products.find(x => x.id === id);
    const item = cart.find(x => x.id === id);
    item ? item.quantity++ : cart.push({...p, quantity: 1});
    localStorage.setItem('ja_threads_cart', JSON.stringify(cart));
    alert(p.name + " added!");
    updateAllDisplays();
}

function removeFromCart(i) {
    cart.splice(i, 1);
    localStorage.setItem('ja_threads_cart', JSON.stringify(cart));
    updateAllDisplays();
}

function updateAllDisplays() {
    let sub = 0; let qty = 0;
    cart.forEach(item => { sub += item.price * item.quantity; qty += item.quantity; });
    const tax = sub * 0.15;
    const finalTotal = sub + tax;

    const table = document.getElementById('cart-items');
    if (table) {
        table.innerHTML = "";
        cart.forEach((item, i) => {
            table.innerHTML += `<tr><td>${item.name}</td><td>$${item.price}</td><td>${item.quantity}</td><td>$${(item.price * item.quantity).toLocaleString()}</td><td><button onclick="removeFromCart(${i})">X</button></td></tr>`;
        });
        document.getElementById('sub-total').innerText = `$${sub.toLocaleString()} JMD`;
        document.getElementById('tax-amount').innerText = `$${tax.toLocaleString()} JMD`;
        document.getElementById('final-total').innerText = `$${finalTotal.toLocaleString()} JMD`;
    }

    if (document.getElementById('summary-total')) {
        document.getElementById('summary-total').innerText = `$${finalTotal.toLocaleString()} JMD`;
        document.getElementById('summary-qty').innerText = qty;
    }
}

// --- NAVIGATION FUNCTIONS (Fixes your buttons) ---
function continueShopping() {
    window.location.href = "products.html";
}

function goToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        window.location.href = "checkout.html";
    }
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        window.location.href = "codes/products.html";
    });
}

function clearCart() { localStorage.removeItem('ja_threads_cart'); }

document.addEventListener('DOMContentLoaded', () => { 
    if (document.getElementById('product-grid')) displayProducts();
    updateAllDisplays(); 
});
