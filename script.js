// ========== PRODUCT DATA ==========
const products = [
    {
        id: 1,
        name: "Black Layered Tee",
        category: "tops",
        price: 899,
        image: "look-01.jpg",
        description: "Oversized black t-shirt layered over white long sleeves. Modern streetwear essential with relaxed fit.",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 2,
        name: "Faded Wide Jeans",
        category: "bottoms",
        price: 999,
        image: "look-02.jpg",
        description: "Heavyweight wide-leg jeans with beautiful fade. High-rise baggy silhouette for ultimate comfort.",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 3,
        name: "Checkered Flannel Shirt",
        category: "tops",
        price: 949,
        image: "look-03.jpg",
        description: "Classic oversized flannel shirt in muted tones. Perfect for layering in any season.",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 4,
        name: "Vintage Wash Denim",
        category: "bottoms",
        price: 979,
        image: "look-04.jpg",
        description: "Soft vintage wash baggy denim with progressive fading. Statement piece for everyday wear.",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 5,
        name: "Black Cargo Pants",
        category: "bottoms",
        price: 1019,
        image: "look-05.jpg",
        description: "Utility cargo pants in deep black. Multiple pockets with modern tapered-yet-baggy fit.",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 6,
        name: "Oversized Leather Jacket",
        category: "outerwear",
        price: 999,
        image: "look-06.jpg",
        description: "Premium black leather jacket with structured shoulders. Timeless outerwear piece.",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 7,
        name: "White Layered Look",
        category: "tops",
        price: 889,
        image: "look-07.jpg",
        description: "Clean white layered outfit with relaxed denim. Minimalist and elevated street style.",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 8,
        name: "Maroon Shirt Combo",
        category: "tops",
        price: 929,
        image: "look-08.jpg",
        description: "Deep maroon button-up shirt styled with wide jeans. Rich color for standout looks.",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 9,
        name: "Classic Baggy Denim",
        category: "bottoms",
        price: 969,
        image: "look-09.jpg",
        description: "Timeless baggy denim in medium wash. Comfortable high-rise fit for all-day wear.",
        sizes: ["S", "M", "L", "XL", "XXL"]
    }
];

const combos = [
    {
        id: 101,
        name: "Street Essential",
        items: ["Black Layered Tee", "Faded Wide Jeans"],
        productIds: [1, 2],
        price: 1699,
        original: 1898,
        save: 199,
        images: ["look-01.jpg", "look-02.jpg"]
    },
    {
        id: 102,
        name: "Flannel Vibes",
        items: ["Checkered Flannel Shirt", "Vintage Wash Denim"],
        productIds: [3, 4],
        price: 1799,
        original: 1928,
        save: 129,
        images: ["look-03.jpg", "look-04.jpg"]
    },
    {
        id: 103,
        name: "Dark Mode",
        items: ["Oversized Leather Jacket", "Black Cargo Pants"],
        productIds: [6, 5],
        price: 1899,
        original: 2018,
        save: 119,
        images: ["look-06.jpg", "look-05.jpg"]
    },
    {
        id: 104,
        name: "Clean Fit",
        items: ["White Layered Look", "Classic Baggy Denim"],
        productIds: [7, 9],
        price: 1699,
        original: 1858,
        save: 159,
        images: ["look-07.jpg", "look-09.jpg"]
    }
];

// ========== STATE ==========
let cart = JSON.parse(localStorage.getItem('aether_cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('aether_user')) || null;
let selectedSize = 'M';
let currentFilter = 'all';

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    renderFeatured();
    renderShop();
    renderCombos();
    updateCartUI();
    updateAuthUI();
    setupFilters();
});

// ========== NAVIGATION ==========
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('navLinks')?.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    document.getElementById('navLinks')?.classList.toggle('open');
}

// ========== RENDER PRODUCTS ==========
function renderFeatured() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    const featured = products.slice(0, 4);
    grid.innerHTML = featured.map(p => productCardHTML(p)).join('');
}

function renderShop() {
    const grid = document.getElementById('shopGrid');
    if (!grid) return;
    const filtered = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);
    grid.innerHTML = filtered.map(p => productCardHTML(p)).join('');
}

function productCardHTML(p) {
    return `
        <div class="product-card" onclick="openProduct(${p.id})">
            <img src="\( {p.image}" alt=" \){p.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <div class="product-category">${p.category}</div>
                <div class="product-name">${p.name}</div>
                <div class="product-price">₹${p.price}</div>
                <div class="product-desc">${p.description.substring(0, 80)}...</div>
                <div class="product-actions" onclick="event.stopPropagation()">
                    <button class="btn-primary" onclick="quickAdd(${p.id})">Add to Bag</button>
                </div>
            </div>
        </div>
    `;
}

function renderCombos() {
    const grid = document.getElementById('comboGrid');
    if (!grid) return;
    grid.innerHTML = combos.map(c => `
        <div class="combo-card">
            <div class="combo-images">
                <img src="\( {c.images[0]}" alt=" \){c.name}">
                <img src="\( {c.images[1]}" alt=" \){c.name}">
            </div>
            <div class="combo-info">
                <span class="combo-badge">COMBO SAVE ₹${c.save}</span>
                <div class="combo-name">${c.name}</div>
                <div class="combo-items">${c.items.join(' + ')}</div>
                <div class="combo-price">
                    <span class="current">₹${c.price}</span>
                    <span class="original">₹${c.original}</span>
                    <span class="save">Save ₹${c.save}</span>
                </div>
                <button class="btn-primary full" onclick="addComboToCart(${c.id})">Add Combo to Bag</button>
            </div>
        </div>
    `).join('');
}

// ========== FILTERS ==========
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderShop();
        });
    });
}

// ========== PRODUCT DETAIL ==========
function openProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    selectedSize = p.sizes.includes('M') ? 'M' : p.sizes[0];
    
    document.getElementById('productDetailContent').innerHTML = `
        <img src="\( {p.image}" alt=" \){p.name}">
        <div class="detail-info">
            <div class="product-category">${p.category}</div>
            <h2>${p.name}</h2>
            <div class="detail-price">₹${p.price}</div>
            <p class="detail-desc">${p.description}</p>
            <div class="size-select">
                <label>Select Size</label>
                <div class="size-options">
                    ${p.sizes.map(s => `
                        <button class="${s === selectedSize ? 'selected' : ''}" 
                                onclick="selectSize(this, '\( {s}')"> \){s}</button>
                    `).join('')}
                </div>
            </div>
            <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px;">
                <i class="fas fa-info-circle"></i> Relaxed oversized fit. Check size guide for measurements.
            </p>
            <button class="btn-primary full" onclick="addToCart(\( {p.id})">Add to Bag — ₹ \){p.price}</button>
        </div>
    `;
    document.getElementById('productModal').classList.add('show');
    document.getElementById('overlay').classList.add('show');
}

function selectSize(btn, size) {
    document.querySelectorAll('.size-options button').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedSize = size;
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
}

// ========== CART ==========
function quickAdd(id) {
    addToCart(id, 'M');
}

function addToCart(id, size = selectedSize) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    
    const existing = cart.find(item => item.id === id && item.size === size);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.image,
            size: size,
            qty: 1
        });
    }
    saveCart();
    updateCartUI();
    showToast('Added to bag');
}

function addComboToCart(comboId) {
    const combo = combos.find(c => c.id === comboId);
    if (!combo) return;
    
    combo.productIds.forEach(pid => {
        const p = products.find(x => x.id === pid);
        if (p) {
            const existing = cart.find(item => item.id === pid && item.size === 'M');
            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                    size: 'M',
                    qty: 1
                });
            }
        }
    });
    saveCart();
    updateCartUI();
    showToast(`${combo.name} added to bag`);
}

function updateQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('aether_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) cartCountEl.textContent = count;
    
    const container = document.getElementById('cartItems');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px 0;">Your bag is empty</p>';
        document.getElementById('checkoutBtn').disabled = true;
    } else {
        container.innerHTML = cart.map((item, i) => `
            <div class="cart-item">
                <img src="\( {item.image}" alt=" \){item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="price">₹${item.price} · Size ${item.size}</div>
                    <div class="cart-item-qty">
                        <button onclick="updateQty(${i}, -1)">−</button>
                        <span>${item.qty}</span>
                        <button onclick="updateQty(${i}, 1)">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${i})">Remove</button>
                </div>
            </div>
        `).join('');
        document.getElementById('checkoutBtn').disabled = false;
    }
    
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    document.getElementById('cartTotal').textContent = `₹${total}`;
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('show');
}

// ========== CHECKOUT & PAYMENT ==========
function proceedToCheckout() {
    if (!currentUser) {
        toggleCart();
        toggleAuthModal();
        showToast('Please login to continue');
        return;
    }
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const summary = document.getElementById('checkoutSummary');
    summary.innerHTML = cart.map(i => `
        <div class="item">
            <span>${i.name} × \( {i.qty} ( \){i.size})</span>
            <span>₹${i.price * i.qty}</span>
        </div>
    `).join('') + `
        <div class="item total-row">
            <span>Total Payable</span>
            <span>₹${total}</span>
        </div>
    `;
    
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('checkoutModal').classList.add('show');
    document.getElementById('overlay').classList.add('show');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
}

function copyUPI() {
    navigator.clipboard.writeText('9subhadeep@fam').then(() => {
        showToast('UPI ID copied!');
    });
}

function confirmOrder() {
    const txnId = document.getElementById('txnId').value.trim();
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    if (!txnId || !address || !phone) {
        showToast('Please fill all fields');
        return;
    }
    
    const orderId = 'AETH-' + Date.now().toString(36).toUpperCase();
    
    const order = {
        id: orderId,
        user: currentUser.email,
        items: cart,
        total: cart.reduce((s, i) => s + i.price * i.qty, 0),
        txnId,
        address,
        phone,
        upi: '9subhadeep@fam',
        status: 'pending_verification',
        created: new Date().toISOString()
    };
    
    const orders = JSON.parse(localStorage.getItem('aether_orders') || '[]');
    orders.push(order);
    localStorage.setItem('aether_orders', JSON.stringify(orders));
    
    cart = [];
    saveCart();
    updateCartUI();
    
    document.getElementById('checkoutModal').classList.remove('show');
    document.getElementById('orderIdDisplay').textContent = orderId;
    document.getElementById('successModal').classList.add('show');
}

function closeSuccess() {
    document.getElementById('successModal').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    showSection('shop');
}

// ========== AUTH ==========
function toggleAuthModal() {
    if (currentUser) {
        if (confirm('Logout from your account?')) {
            currentUser = null;
            localStorage.removeItem('aether_user');
            updateAuthUI();
            showToast('Logged out securely');
        }
        return;
    }
    document.getElementById('authModal').classList.add('show');
    document.getElementById('overlay').classList.add('show');
    switchToLogin();
}

function switchToRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function switchToLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'aether_salt_v1');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    
    if (password !== confirm) {
        showToast('Passwords do not match');
        return;
    }
    if (password.length < 8) {
        showToast('Password must be at least 8 characters');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('aether_users') || '[]');
    if (users.find(u => u.email === email)) {
        showToast('Email already registered');
        return;
    }
    
    const hashed = await hashPassword(password);
    users.push({ name, email, password: hashed, created: new Date().toISOString() });
    localStorage.setItem('aether_users', JSON.stringify(users));
    
    currentUser = { name, email };
    localStorage.setItem('aether_user', JSON.stringify(currentUser));
    
    updateAuthUI();
    document.getElementById('authModal').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    showToast('Account created securely!');
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('aether_users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
        showToast('Invalid email or password');
        return;
    }
    
    const hashed = await hashPassword(password);
    if (hashed !== user.password) {
        showToast('Invalid email or password');
        return;
    }
    
    currentUser = { name: user.name, email: user.email };
    localStorage.setItem('aether_user', JSON.stringify(currentUser));
    
    updateAuthUI();
    document.getElementById('authModal').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    showToast(`Welcome back, ${user.name.split(' ')[0]}!`);
}

function updateAuthUI() {
    const btn = document.getElementById('authText');
    if (btn) {
        btn.textContent = currentUser ? currentUser.name.split(' ')[0] : 'Login';
    }
}

// ========== LOCATION ==========
function toggleLocation() {
    const toast = document.getElementById('locationToast');
    const msg = document.getElementById('locationMessage');
    
    if (!navigator.geolocation) {
        msg.textContent = 'Geolocation not supported';
        toast.classList.add('show');
        return;
    }
    
    msg.textContent = 'Detecting your location...';
    toast.classList.add('show');
    
    avigator.geolocation.getCurrentPosition(
        async (pos) => {
            const { latitude, longitude } = pos.coords;
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=\( {latitude}&lon= \){longitude}&format=json`
                );
                const data = await res.json();
                const city = data.address?.city || data.address?.town || data.address?.village || data.address?.state || 'your area';
                msg.textContent = `Delivering to ${city}`;
                document.getElementById('locationText').textContent = city;
            } catch {
                msg.textContent = `Location detected`;
                document.getElementById('locationText').textContent = 'Located';
            }
        },
     
