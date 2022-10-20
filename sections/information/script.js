const naviHamb = document.querySelector('#naviHamb')
const close = document.querySelector('#close')
const scrollTopBtn = document.querySelector('.scrollToTop-btn')
const naviFixed = document.querySelector('.navi-fixed')
const arrowRight = document.querySelectorAll('.arrowRight')
const showItems = document.querySelectorAll('.nav-items > ul > div > ul')
const showIf = document.querySelector('.if i')
const inputs = document.querySelectorAll('.info-left > input')




let basket = JSON.parse(localStorage.getItem('data')) || []

let cartCount = _ => {
    let cartIcon = document.querySelectorAll('.cartAmount')
    cartIcon.forEach(cartItem => {
        cartItem.innerHTML = basket.map(basketItem => basketItem.item).reduce((x,y) => x + y,0)
    })
    
}

cartCount()

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


// Info bolmesinde input taglarina klikleyende border renglerinin deyismesi

inputs.forEach(inputElem => {
    inputElem.addEventListener('click', e => {
        if (e.target.className !== 'city') {
            let inputItems = Array.from(inputs).filter(item => item !== e.target)
            inputItems.forEach(offItem => {
                offItem.style.border = '1px solid #ced4da'
                e.target.style.border = '1px solid #de8936'
            });
        }
    })
});



// Info bolmesinde toplam sifaris deyerinin hesablanmasi

let sumPrice = _ => {
    if (basket.length !== 0) {
        let amount = basket.map(x => {
            let search = shopItemsData.find(item => item.id === x.id) || []
            return x.amount * search.price
        }).reduce((x,y) => x + y,0)
        document.querySelector('#sumPrice').innerHTML = `${amount.toFixed(2)} Azn`
        document.querySelector('#sum').innerHTML = `${(Number(amount) + 5.00).toFixed(2)} Azn`
    } 
}

sumPrice()












