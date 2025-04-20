document.addEventListener('DOMContentLoaded', function () {

    const searchForm = document.querySelector('.searchBox');

    const searchInput = searchForm.querySelector('input');

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`);
        } else {
            alert('Please enter a search term.');
        }
    });

    const loginButton = document.querySelector('.headerBtn button:nth-child(1)');
    const loginModal = document.createElement('div');
    loginModal.classList.add('loginModal');
    loginModal.innerHTML = `
        <div class="modalContent">
            <h2>Login</h2>
            <input type="text" id="username" placeholder="Username" />
            <input type="password" id="password" placeholder="Password" />
            <button id="loginSubmit">Login</button>
            <button class="closeModal">Close</button>
        </div>
    `;
    
    loginModal.style.display = 'none';
    document.body.appendChild(loginModal);

    loginButton.addEventListener('click', function () {
        loginModal.style.display = 'block';
    });

    loginModal.querySelector('.closeModal').addEventListener('click', function () {
        loginModal.style.display = 'none';
    });

    loginModal.querySelector('#loginSubmit').addEventListener('click', function () {
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        if (user.length < 3 || pass.length < 3) {
            alert("Username and password must be at least 3 characters long.");
        } else {
            alert(`Welcome, ${user}!`);
            loginModal.style.display = 'none';
        }
    });

    const cartButton = document.querySelector('.headerBtn button:nth-child(2)');
    const cartPopup = document.createElement('div');
    cartPopup.classList.add('cartPopup');
    cartPopup.innerHTML = `
        <div class="modalContent">
            <h2>Your Cart</h2>
            <ul id="cartItems"></ul>
            <p>Total: $<span id="cartTotal">0.00</span></p>
            <button class="closeModal">Close</button>
        </div>
    `;
    cartPopup.style.display = 'none';
    document.body.appendChild(cartPopup);

    cartButton.addEventListener('click', function () {
        cartPopup.style.display = 'block';
    });

    cartPopup.querySelector('.closeModal').addEventListener('click', function () {
        cartPopup.style.display = 'none';
    });

    let cartItems = [];
    const cartItemsList = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.title} - ${item.price} <button class="removeItem">Remove</button>`;
            cartItemsList.appendChild(li);
            total += parseFloat(item.price.replace('$', ''));
        });
        cartTotalElement.textContent = total.toFixed(2);
    }

    const addButtons = document.querySelectorAll('.productItems button');
    addButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const product = this.closest('.productItems');
            const title = product.querySelector('h3').innerText;
            const price = product.querySelector('b').innerText;

            cartItems.push({ title, price });
            updateCart();
        });
    });

    cartItemsList.addEventListener('click', function (e) {
        if (e.target.classList.contains('removeItem')) {
            const index = Array.from(cartItemsList.children).indexOf(e.target.closest('li'));
            cartItems.splice(index, 1);
            updateCart();
        }
    });

    const categoryItems = document.querySelectorAll('.categoryItems img');
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', () => item.style.opacity = 0.8);
        item.addEventListener('mouseleave', () => item.style.opacity = 1);
    });

    window.addEventListener('load', () => {
        document.body.style.transition = 'all 0.5s ease-out';
        document.body.style.opacity = 1;
    });

    const seeAllLink = document.querySelector('.headingRow a');
    if (seeAllLink) {
        seeAllLink.addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector('.FooterLinks__List').scrollIntoView({ behavior: "smooth" });
        });
    }

    const socialLinks = document.querySelectorAll(".sLinks i");
    const socialUrls = {
        "fa-facebook": "https://facebook.com",
        "fa-twitter": "https://twitter.com",
        "fa-instagram": "https://instagram.com",
        "fa-linkedin-in": "https://linkedin.com",
        "fa-at": "mailto:support@example.com"
    };

    socialLinks.forEach(icon => {
        icon.style.cursor = "pointer";
        icon.title = icon.classList[1].replace("fa-", "").toUpperCase();
        icon.addEventListener("click", () => {
            const classes = [...icon.classList];
            const cls = classes.find(c => socialUrls[c]);
            if (cls) {
                window.open(socialUrls[cls], '_blank');
            }
        });
    });

    const appImages = document.querySelectorAll(".appIcons img");
    appImages[0].addEventListener("click", () => window.open("https://apps.apple.com", "_blank"));
    appImages[1].addEventListener("click", () => window.open("https://play.google.com/store", "_blank"));

    const footerYear = document.querySelector('.footer-mid-row2 p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `© Blink Commerce Private Limited, 2016-${currentYear}`;
    }

    const lazyImages = document.querySelectorAll('img[data-src]');
    const loadLazyImages = () => {
        lazyImages.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    };
    window.addEventListener('scroll', loadLazyImages);
    loadLazyImages(); 

    const recommendedSection = document.querySelector('.recommendedProducts');
    const products = [
        { title: 'Product 1', price: '$19.99', image: 'product1.jpg' },
        { title: 'Product 2', price: '$29.99', image: 'product2.jpg' },
        { title: 'Product 3', price: '$39.99', image: 'product3.jpg' },
        { title: 'Product 4', price: '$49.99', image: 'product4.jpg' },
    ];

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('productCard');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p>${product.price}</p>
            <button>Add to Cart</button>
        `;
        recommendedSection.appendChild(productCard);
    });

    const themeBtn = document.createElement('button');
    themeBtn.innerText = 'Toggle Theme';
    themeBtn.style.position = 'fixed';
    themeBtn.style.bottom = '60px';
    themeBtn.style.right = '20px';
    themeBtn.style.padding = '10px';
    themeBtn.style.zIndex = '9999';
    document.body.appendChild(themeBtn);

    let darkMode = false;
    themeBtn.addEventListener('click', function () {
        darkMode = !darkMode;
        document.body.style.backgroundColor = darkMode ? "#1c1c1c" : "white";
        document.body.style.color = darkMode ? "#f0f0f0" : "black";
    });

    const scrollBtn = document.createElement('button');
    scrollBtn.innerText = '↑ Top';
    scrollBtn.style.position = 'fixed';
    scrollBtn.style.bottom = '20px';
    scrollBtn.style.right = '20px';
    scrollBtn.style.padding = '10px';
    scrollBtn.style.zIndex = '9999';
    scrollBtn.style.display = 'none';
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => {
        scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
});
