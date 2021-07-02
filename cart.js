/**
 * Cart.js
 * 
 * User bisa melakukan
 *  1. Tambah barang ke cart
 *  2. Hapus barang (satu persatu/sekaligus semua) yang sudah ada di cart
 *  
 */

// ======================================================= Database ======================================================= 

// Key adalah ID produk
const databaseProduct = {
    500: {image: 'assets/produk1.jpg', namaProduk: 'Kemeja Wanita Biru Stripe', hargaProduk: 150000, stokProduk: 5},
    501: {image: 'assets/produk2.jpg', namaProduk: 'Blouse Wanita', hargaProduk: 250000, stokProduk: 11},
    502: {image: 'assets/produk3.jpg', namaProduk: 'Kemeja Wanita', hargaProduk: 100000, stokProduk: 0},
    503: {image: 'assets/produk4.jpg', namaProduk: 'Kemeja Pria Berkerah Navy', hargaProduk: 150000, stokProduk: 7},
    504: {image: 'assets/produk5.jpg', namaProduk: 'Kemeja Pria Hitam', hargaProduk: 175000, stokProduk: 6},
    505: {image: 'assets/produk6.jpg', namaProduk: 'Baju Pria Turtleneck', hargaProduk: 135000, stokProduk: 0},
    506: {image: 'assets/produk7.jpg', namaProduk: 'Celana Bahan Pria', hargaProduk: 210000, stokProduk: 0},
    507: {image: 'assets/produk8.jpg', namaProduk: 'Chinos Pria', hargaProduk: 175000, stokProduk: 12},
    508: {image: 'assets/produk9.jpg', namaProduk: 'Celana Olahraga Pria', hargaProduk: 95000, stokProduk: 3},
    509: {image: 'assets/produk10.jpg', namaProduk: 'Celana Cargo Pria', hargaProduk: 115000, stokProduk: 15},
    510: {image: 'assets/produk11.jpg', namaProduk: 'Boxer Pria', hargaProduk: 55000, stokProduk: 24},
    511: {image: 'assets/produk12.jpg', namaProduk: 'Celana Dalam Pria', hargaProduk: 40000, stokProduk: 8}
}

// Key: ID
// Value: Stok yang ada di cart
// productInCart = { '500': 5, '501': 2, '507': 5 }
let productInCart = {}


// ===============================================================================================================================



// ======================================================= Function =======================================================

// Input: productID & quantity nya yang mau ditambahkan ke cart
// Output: array productInCart yang udah terupdate
function addToCart(productID, qty) {
    // Cek 
    if(!databaseProduct[productID]) return `Tidak ada barang dengan ID tersebut`
    if(qty <= 0) return 'Invalid quantity' 
    if(qty > databaseProduct[productID].stokProduk) return alert('Stok habis!')

    // Kalau aman
    databaseProduct[productID].stokProduk -= qty // database di update

    if(!productInCart[productID]) { // productInCart di update
        productInCart[productID] = qty
    } else {
        productInCart[productID] += qty
    }

    renderCart() // update tampilan cart
    renderProductList() // update product list => stok berubah atau produk hilang
    updateTotal() // update tampilan total

    return productInCart
}


// Delete selected product in cart
function deleteProductInCart(productID, qty) {
    // Cek
    if(!databaseProduct[productID]) return 'Tidak ada barang tersebut di database'
    if(!productInCart[productID]) return 'Tidak ada barang tersebut di cart'
    if(qty <= 0) return 'Invalid quantity' 
    if(productInCart[productID] - qty < 0) return 'Stok tidak bisa lebih kecil dari nol'

    // Kalau aman
    databaseProduct[productID].stokProduk += qty // database di update
    productInCart[productID] -= qty // productInCart di update
    if(productInCart[productID] === 0) delete productInCart[productID] // delete aja kalau quantity di cart itu nol

    renderCart() // update tampilan cart
    renderProductList() // update product list => stok berubah atau produk hilang
    updateTotal() // update tampilan total

    return productInCart
}

// Delete all product in cart
function deleteAllCart() {
    if(Object.keys(productInCart).length === 0) return alert('Tidak ada produk di dalam cart!')

    // Update database (stok ditambahin ke database lagi)
    for(let id in productInCart) {
        databaseProduct[id].stokProduk += productInCart[id]
    }
    
    productInCart = {} // object kosong

    renderCart() // update tampilan cart
    renderProductList() // update product list => stok berubah atau produk hilang
    updateTotal() // update tampilan total

    return productInCart
}

// Display harga total
function updateTotal() {
    let total = 0
    for(let id in productInCart) {
        total += productInCart[id] * databaseProduct[id].hargaProduk
    }
    return total
}


// ======================================================= DOM ================================================

/**
 * 
 * List Function:
 *  (1) renderCart => render barang-barang yang ada di cart. return value nya productInCart
 *  (2) renderProductList => render list product di tampilan utama. return value nya databaseProduct
 *  (3) checkout => pindah halaman. return value nya array productInCart
 * 
 */


// Render cart list
function renderCart() {
    const cartTableElement = document.getElementById('cart-data')
    cartTableElement.innerHTML = '' //reset

    let tableHTML = '' 
    if(Object.keys(productInCart).length === 0) { // kalau gaada produk di cart
        tableHTML = '<br><div class="alert alert-warning" role="alert">Cart masih kosong, ayo belanja sekarang =)</div><br>'
        cartTableElement.insertAdjacentHTML('beforeend', tableHTML );
    } else {
        let count = 1
        for(let id in productInCart) {
            const price = productInCart[id] * databaseProduct[id].hargaProduk
    
            tableHTML += `<tr class="cart-${count}"><th scope="row">${count}</th><td>${databaseProduct[id].namaProduk}</td><td>${productInCart[id]}</td><td>Rp ${price}</td><td><a class="btn btn-danger d-grid mt-2 buttonID${count}" onclick="deleteProductInCart(${id},1)">Delete</a></td></tr>`
            
            count++
        }
        cartTableElement.insertAdjacentHTML('beforeend', tableHTML );
    }

    // Render Total
    const totalElement = document.getElementById('total-price-cart')
    totalElement.innerHTML = `Total: Rp ${updateTotal()}`
    return productInCart
}


// Render semua product di homepage (termasuk dipanggil kalau ada perubahan stok (ditambah ke cart, cart ada yg di delete))
function renderProductList() {
    const productList = document.getElementsByClassName('productList')

    let count = 1
    for(let key in databaseProduct) { 
        // Looping semua database product 

        // Create image
        const productBox = document.getElementById(key)
        productBox.innerHTML = '' // Reset

        const image = document.createElement('img')
        image.setAttribute('src', databaseProduct[key].image)
        image.setAttribute('class','card-img-top')
        image.setAttribute('alt','Product image not found')
        productBox.appendChild(image)
        
        //Create divs
        const cardBody = document.createElement('div')
        cardBody.setAttribute('id',`card-body ${count}`)
        productBox.appendChild(cardBody)
        
        //Add name
        const cardBodyElement = document.getElementById(`card-body ${count}`)
        const productName = document.createElement('h5')
        productName.setAttribute('class','card-title prodName')
        productName.innerHTML = databaseProduct[key].namaProduk
        cardBodyElement.appendChild(productName)
        
        //Add price
        const productPrice = document.createElement('p')
        productPrice.setAttribute('id',`card-text prodPrice ${count}`)
        productPrice.innerHTML = `Rp ${databaseProduct[key].hargaProduk}`
        cardBodyElement.appendChild(productPrice)
        
        //Add stock
        const productStock = document.createElement('button')
        productStock.setAttribute('id',`card-stock ${count}`)
        productStock.setAttribute('type','button')
        if(databaseProduct[key].stokProduk === 0) { 
            productStock.setAttribute('class','btn btn-danger')
            productStock.innerHTML = 'Out of Stock'
        } else {
            productStock.setAttribute('class','btn btn-success')
            productStock.innerHTML = `Stock: ${databaseProduct[key].stokProduk}`
        }
        cardBodyElement.appendChild(productStock)
        
        //Add star
        const productRating = document.createElement('div')
        productRating.setAttribute('id',`icon-bintang ${count}`)
        productRating.setAttribute('style','color: orange;')
        cardBodyElement.appendChild(productRating)
        
        const productRatingElement = document.getElementById(`icon-bintang ${count}`)
        for(let j = 0; j < 5; j++) {
            const star = document.createElement('i')
            star.setAttribute('class','fas fa-star')
            productRatingElement.appendChild(star)
        }
        
        // Add button
        const productButton = document.createElement('a')
        productButton.setAttribute('class',`btn btn-success d-grid mt-2 ${count}`)
        productButton.setAttribute('onclick',`addToCart(${key}, 1)`)
        productButton.innerHTML = 'Add to Cart'
        cardBodyElement.appendChild(productButton)   
        
        count++
    }
    return databaseProduct
}


// Tombol checkout
function checkout() {
    const checkoutButton = document.getElementById('checkout-button')
    window.location.replace('checkout.html')
    return productInCart
}


renderProductList()
renderCart()