const naviHamb = document.querySelector('#naviHamb')
const close = document.querySelector('#close')
const officeCol = document.getElementsByClassName('office-col')
const heart = document.getElementsByClassName('heart')
const scrollTopBtn = document.querySelector('.scrollToTop-btn')
const naviFixed = document.querySelector('.navi-fixed')
const arrowRight = document.querySelectorAll('.arrowRight')
const showItems = document.querySelectorAll('.nav-items > ul > div > ul')
const showIf = document.querySelector('.if i')
const carts = document.querySelectorAll('.col-content > a:last-child')





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
    else {
        document.querySelector('.navi-small').classList.remove('active')
    }
})

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    },
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    },
});

for (let i = 0; i < officeCol.length; i++) {
    officeCol[i].addEventListener('click', e => {
        let newProduct2 = shopItemsData.find(product => product.name === e.target.className)
        if (e.target.src === `http://127.0.0.1:5500${newProduct2.outline}`) {
            e.target.src = newProduct2.filled
        } 
        else {
            e.target.src = `http://127.0.0.1:5500${newProduct2.outline}`
        }
    })
}  


let storageProducts = _ => {
    let products
    if (localStorage.getItem('products') === null) {
        products = []
    } 
    else {
        products = JSON.parse(localStorage.getItem('products'))
    }
    return products
}

let storageCarts = _ => {
    let carts
    if (localStorage.getItem('carts') === null) {
        carts = []
    } 
    else {
        carts = JSON.parse(localStorage.getItem('carts'))
    }
    return carts
}


for (let i = 0; i < officeCol.length; i++) {
    officeCol[i].addEventListener('click', e => {
        let newProduct1 = shopItemsData.find(product => product.name === e.target.id)
        let newProduct2 = shopItemsData.find(product => product.name === e.target.className)
        let newProduct3 = shopItemsData.find(product => product.cart === e.target.className)
        if (newProduct1) {
            localStorage.setItem('newProduct', JSON.stringify(newProduct1))
        }
        else if (newProduct2) {
            let products = storageProducts()

            if (products[0] === undefined) {
                products.push(newProduct2)
            } 
            else {
                let y = products.find(item => item.id === newProduct2.id)
                if (y === undefined) {
                    products.push(newProduct2)
                }
                else {
                    products = products.filter(x => x.name !== e.target.className)
                }
            }
            localStorage.setItem('products', JSON.stringify(products))
            let productsItem = JSON.parse(localStorage.getItem('products'))
            document.querySelectorAll('.favorAmount').forEach(a => {
            a.innerHTML = productsItem.map(item => item.count).reduce((x,y) => x + y,0)
        })
        }
        else if (newProduct3) {
            let basket = JSON.parse(localStorage.getItem('data')) || []
            
            let increm = id => {
                let selectedItem = id
                let search = basket.find(item => item.id === selectedItem)

                if (search === undefined) {
                    basket.push({
                        id: selectedItem,
                        item: 1,
                        amount: 1
                    })
                } 
                else {
                    search.amount += 1
                }
                localStorage.setItem('data', JSON.stringify(basket))
            }
            increm(newProduct3.id)

            let cartsItem = JSON.parse(localStorage.getItem('data'))
            document.querySelectorAll('.cartAmount').forEach(a => {
            a.innerHTML = cartsItem.map(item => item.item).reduce((x,y) => x + y,0)
        })
        }
    })
}    




carts.forEach(cart => {
    cart.addEventListener('click', _ => {
        document.querySelector('.message').textContent = 'Mehsul sebete elave edildi.'
        document.querySelector('.message').classList.add('active')
        setTimeout(_ => {
            document.querySelector('.message').classList.remove('active')
        },3000)
    })
})




let favorCount = _ => {
    let products = JSON.parse(localStorage.getItem('products')) || []
    document.querySelectorAll('.favorAmount').forEach(a => {
        a.innerHTML = products.map(item => item.count).reduce((x,y) => x + y,0)
    })
    for (let i = 0; i < officeCol.length; i++) {
        let products = JSON.parse(localStorage.getItem('products')) || []
        products = products.find(x => x.name === document.querySelectorAll('.heart')[i].children[0].className)
        if (products) {
            document.querySelectorAll('.heart')[i].children[0].src = 'http://127.0.0.1:5500/img/images/icons/heart-filled.png'
        }
    }
}

favorCount()

let cartCount = _ => {
    let carts = JSON.parse(localStorage.getItem('data')) || []
    document.querySelectorAll('.cartAmount').forEach(a => {
        a.innerHTML = carts.map(item => item.item).reduce((x,y) => x + y,0)
    })
}

cartCount()





















































