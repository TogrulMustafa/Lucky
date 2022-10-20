const officeTool = document.querySelector('.officeTool')
const naviHamb = document.querySelector('#naviHamb')
const close = document.querySelector('#close')
const scrollTopBtn = document.querySelector('.scrollToTop-btn')
const naviFixed = document.querySelector('.navi-fixed')
const arrowRight = document.querySelectorAll('.arrowRight')
const showItems = document.querySelectorAll('.nav-items > ul > div > ul')
const showIf = document.querySelector('.if i')
const carts = document.querySelectorAll('.col-content > a:last-child')


let basket = JSON.parse(localStorage.getItem('data')) || []


let showTools = _ => {
    let product = JSON.parse(localStorage.getItem('newProduct'))
    let search = basket.find(item => item.id === product.id) || []
    return officeTool.innerHTML = `
    <div class="container">
        <span>Ana səhifə/Ofis ləvazimatları/${product.name}/${product.name} ${product.mark} ${product.code}</span>
        <div class="officeTool-content">
            <div class="contentLeft">
                <div class="content-img">
                    <img src=${product.img} id='limg'>
                </div>
                <img src=${product.img} id='left-img'>
                <img src=${product.addImg} id='right-img'>
            </div>
            <div class="contentRight">
                <p>${product.name} ${product.mark} ${product.code}</p>
                <p>Qiymət: <span>${product.price} Azn</span></p>
                <p>Marka: ${product.mark}</p>
                <p>Kod: ${product.code}</p>
                <div class="contentRight-price">
                    <i onclick = 'decrement(${product.id})' class="fa-solid fa-minus"></i>
                    <span id = ${product.id} class='office-quantity'>${search.item === undefined ? 0 : search.item}</span>
                    <i onclick = 'increment(${product.id})' class="fa-solid fa-plus"></i>
                    <div onclick = 'increment(${product.id})' >Səbətə at <i class="fa-solid fa-cart-shopping"></i></div>
                </div>
            </div>
        </div>            
    </div>
    `
}

showTools()



let increment = id => {
    let selectedItem = id
    let search = basket.find(item => item.id === selectedItem)

    if (search === undefined) {
        basket.push({
            id: selectedItem,
            item: 1
        })
    } 
    else {
        search.item += 1
    }

    update(selectedItem)
    localStorage.setItem('data', JSON.stringify(basket))
}

let decrement = id => {
    let selectedItem = id
    let search = basket.find(item => item.id === selectedItem)
    if(search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1
    }

    update(selectedItem)
    basket = basket.filter(x => x.item !== 0)
    localStorage.setItem('data', JSON.stringify(basket))
}

let update = id => {
    let search = basket.find(item => item.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation()
}

let calculation = _ => {
    let cartIcon = document.querySelectorAll('.cartAmount')
    cartIcon.forEach(cartItem => {
        cartItem.innerHTML = basket.map(basketItem => basketItem.item).reduce((x,y) => x + y,0)
    })
    
}

calculation()



let favorCount = _ => {
    let products = JSON.parse(localStorage.getItem('products')) || []
    document.querySelectorAll('.favorAmount').forEach(favor => {
        favor.innerHTML = products.map(item => item.count).reduce((x,y) => x + y,0)
    })
}

favorCount()
// Butun favor errorlari cixan yere bu kodu yaz - let products = JSON.parse(localStorage.getItem('products')) || []


const limg = document.querySelector('#limg')
const leftImg = document.querySelector('#left-img')
const rightImg = document.querySelector('#right-img')



leftImg.addEventListener('click', _ => {
    limg.src = leftImg.src
    leftImg.classList.add('active')
    rightImg.classList.remove('active')
})
rightImg.addEventListener('click', _ => {
    limg.src = rightImg.src
    rightImg.classList.add('active')
    leftImg.classList.remove('active')
})


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











