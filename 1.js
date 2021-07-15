const databaseProduct = {
    500: {image: 'img1.png', namaProduk: 'produk1', hargaProduk: 50000, stokProduk: 5},
    501: {image: 'img2.png', namaProduk: 'produk2', hargaProduk: 70000, stokProduk: 3},
    502: {image: 'img3.png', namaProduk: 'produk3', hargaProduk: 20000, stokProduk: 4},
    503: {image: 'img4.png', namaProduk: 'produk4', hargaProduk: 60000, stokProduk: 7},
    504: {image: 'img5.png', namaProduk: 'produk5', hargaProduk: 30000, stokProduk: 6},
    505: {image: 'img6.png', namaProduk: 'produk6', hargaProduk: 30000, stokProduk: 1},
    506: {image: 'img7.png', namaProduk: 'produk7', hargaProduk: 35000, stokProduk: 0},
    507: {image: 'img8.png', namaProduk: 'produk8', hargaProduk: 21000, stokProduk: 12},
    508: {image: 'img9.png', namaProduk: 'produk9', hargaProduk: 37000, stokProduk: 3}
}



// for(let data in databaseProduct){
//     console.log(databaseProduct[data]);
// }


function checkout(databaseProduct, user){

    let totalBelanja = 0
    for ( let data in databaseProduct){
        if ( databaseProduct[data].stokProduk > 0  ){
            for ( let i = 0; i < user.beliProduk.length; i++){
                if ( databaseProduct[data].namaProduk === user.beliProduk[i]){
                    databaseProduct[data].hargaProduk
                    totalBelanja += databaseProduct[data].hargaProduk
                }      
            }
        }
    }
return totalBelanja
}


console.log(checkout(databaseProduct, {
    name : 'Jhon',
    age : 32,
    beliProduk : ['produk1', 'produk4', 'produk5','produk'],
    saldo : 5000000
    }
))