const carts = document.getElementById('carts')
const naviHamb = document.querySelector('#naviHamb')
const close = document.querySelector('#close')
const scrollTopBtn = document.querySelector('.scrollToTop-btn')
const naviFixed = document.querySelector('.navi-fixed')
const arrowRight = document.querySelectorAll('.arrowRight')
const showItems = document.querySelectorAll('.nav-items > ul > div > ul')
const showIf = document.querySelector('.if i')
const message = document.querySelector('.orderType > a')




let basket = JSON.parse(localStorage.getItem('data')) || []

let cartCount = _ => {
    let cartIcon = document.querySelectorAll('.cartAmount')
    cartIcon.forEach(cartItem => {
        cartItem.innerHTML = basket.map(basketItem => basketItem.item).reduce((x,y) => x + y,0)
    })
    
}

cartCount()


let generateItemCarts = _ => {
    if (basket.length !== 0) {
        document.querySelector('.cartLeft > div').classList.add('active')
        document.querySelector('.cartLeft > div > div').classList.add('active')
        return carts.innerHTML = basket.map(x => {
            let search = shopItemsData.find(item => item.id === x.id) || []
            let {img, name, price, color} = search
            return `
            <div style='width:100%'>
                <div style="width:15%">
                    <img src=${img}>
                </div>
                <div style="width:20%">${name}</div>
                <div style="width:15%">${price} Azn</div>
                <div style="width:25%">
                    <i onclick = 'decrement(${x.id})' class="fa-solid fa-minus"></i>
                    <span id = ${x.id} class='office-quantity'>${x.amount}</span>
                    <i onclick = 'increment(${x.id})' class="fa-solid fa-plus"></i>
                </div>
                <div style="width:10%">${color}</div>
                <div style="width:10%">${(x.amount * price).toFixed(1)} Azn</div>
                <div style="width:5%"><i onclick = 'removeItem(${x.id})' class="fa-solid fa-xmark"></i></div>
            </div>
            `
        }).join('')
    }
    else {
        carts.innerHTML = ``
        document.querySelector('.cartLeft > div').classList.remove('active')
        document.querySelector('.cartLeft > div > div').classList.remove('active')
    }
}

generateItemCarts()



let increment = id => {
    let selectedItem = id
    let search = basket.find(item => item.id === selectedItem)
    search.amount += 1

    generateItemCarts()
    update(selectedItem)
    localStorage.setItem('data', JSON.stringify(basket))
}

let decrement = id => {
    let selectedItem = id
    let search = basket.find(item => item.id === selectedItem)
    search.amount -= 1

    update(selectedItem)
    console.log(basket)
    basket = basket.filter(x => x.amount !== 0)
    cartCount()
    generateItemCarts()
    localStorage.setItem('data', JSON.stringify(basket))
}

let update = id => {
    let search = basket.find(item => item.id === id)
    document.getElementById(id).innerHTML = search.amount
    totalAmount()
}

let removeItem = id => {
    let selectedItem = id
    basket = basket.filter(x => x.id !== selectedItem)
    generateItemCarts()
    totalAmount()
    cartCount()
    localStorage.setItem('data', JSON.stringify(basket))
}

let totalAmount = _ => {
    if (basket.length !== 0) {
        let amount = basket.map(x => {
            let search = shopItemsData.find(item => item.id === x.id) || []
            return x.amount * search.price
        }).reduce((x,y) => x + y,0)
        document.querySelector('#total').innerHTML = `${amount.toFixed(2)} Azn`
    } 
    else {
        document.querySelector('#total').innerHTML = `0.00 Azn`
    };
}

totalAmount()



let favorCount = _ => {
    let products = JSON.parse(localStorage.getItem('products')) || []
    document.querySelectorAll('.favorAmount').forEach(favor => {
        favor.innerHTML = products.map(item => item.count).reduce((x,y) => x + y,0)
    })
}

favorCount()



window.addEventListener('scroll', _ => {
    scrollTopBtn.classList.toggle('active', window.scrollY > 200)
    naviFixed.classList.toggle('active', window.scrollY > 160)
})

scrollTopBtn.addEventListener('click', _ => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    document.querySelector('.navi-small').classList.remove('show')
})


for (let i = 0; i < arrowRight.length; i++) {
    arrowRight[i].addEventListener('click', _ => {
        showItems[i].classList.toggle('active')
        arrowRight[i].classList.toggle('active')
    })
    
}


showIf.addEventListener('click', _ => {
    showIf.classList.toggle('active')
    document.querySelector('.showIf').classList.toggle('active')
})
naviHamb.addEventListener('click', _ => {
    document.querySelector('.navi-small').classList.toggle('show')
})
close.addEventListener('click', _ => {
    document.querySelector('.navi-small').classList.remove('show')
})

window.addEventListener('resize', _ => {
    if (window.outerWidth > 992) {
        document.querySelector('.navi-small').classList.add('active')
        document.querySelector('.navi-small').classList.remove('show')
    }
})



// Sifariş təsdiqi zamanı gələn mesajlar

message.addEventListener('click',  _ => {

    let amount = basket.map(x => {
        let search = shopItemsData.find(item => item.id === x.id) || []
        return x.amount * search.price
    }).reduce((x,y) => x + y,0)

    if (carts.innerHTML == '') {
        let divEl = document.createElement('div')
        divEl.className = 'message'
        divEl.textContent = 'Sifarişi təsdiqləmək üçün səbətinizdə ən az 1 məhsul olmalıdır.'
        document.querySelector('.cart-content').prepend(divEl)
        setTimeout(_ => {
            divEl.remove()
        },3000)
    }
    else if (carts.innerHTML !== '' && amount < 20) {
        let divEl = document.createElement('div')
        divEl.className = 'message'
        divEl.textContent = 'Minimum məbləğ 20 Azn olmalıdır.'
        document.querySelector('.cart-content').prepend(divEl)
        setTimeout(_ => {
            divEl.remove()
        },3000)
    }
    else {
        message.setAttribute('href', '../information/info.html')
    }
})

