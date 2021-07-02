// ============================================ CHECKOUT PAGE ===========================================
var checkoutList = JSON.parse(localStorage.getItem("listCheckoutProduct"));

function renderCheckoutPage() {
    // console.log(checkoutList)

    let total = 0
    for(let id in checkoutList) {
        total += checkoutList[id] * databaseProduct[id].hargaProduk
    }

    const checkoutElement = document.getElementById('checkout-page')
    // console.log(checkoutElement)

    checkoutElement.innerHTML = '' //reset
    // console.log(checkoutElement)


    // // const totalCheckout = document.getElementById('total-checkout')
    // // totalCheckout.innerHTML(`Rp ${updateTotal()}`)

    
    
    for(let id in checkoutList) {
        
        const checkoutCard = document.createElement('div')

        checkoutCard.setAttribute('class', `col product-${id}`)
        checkoutCard.innerHTML = `<div class="card border border-dark" style="width: 18rem;">
        <img src="${databaseProduct[id].image}" class="card-img-top" alt="...">
        <div class="card-body prod-${id}" style="background-color: #05386B; color: #EDF5E1;">
            <h5 class="card-title fs-2">${databaseProduct[id].namaProduk}</h5>
            <p class="card-text fs-4">Rp ${databaseProduct[id].hargaProduk}</p>
            <p class="btn-success">Stok yang ingin dibeli: ${checkoutList[id]}</p>
            <a class="btn btn-danger fs-5" onclick="deleteProductInCheckoutPage(${id})">HAPUS</a>
        </div>
        </div>`

        checkoutElement.appendChild(checkoutCard)
    }

    const totalProductCheckout = document.getElementById('total-checkout')
    totalProductCheckout.innerHTML = `Rp ${total}`

}



function getProductPriceTotal(id) {
    return databaseProduct[id].hargaProduk * productInCart[id]
}

function deleteProductInCheckoutPage(id) {
    if(checkoutList[id] === 0) { // Hapus
        alert('Tidak bisa menghapus lagi')
    } else {
        checkoutList[id]--
        renderCheckoutPage()
    }

}


function goToHomepage() {
    window.location.replace('homepage.html')
    currentPage = 'homepage'
    // renderProductList()
    // renderCart()
}

function bayar() {
    alert('Terimakasih sudah berbelanja!')
}

if(page === 'checkout.html') {
    // alert('')
    renderCheckoutPage()
}

