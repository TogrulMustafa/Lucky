const naviHamb = document.querySelector('#naviHamb')
const close = document.querySelector('#close')
const scrollTopBtn = document.querySelector('.scrollToTop-btn')
const naviFixed = document.querySelector('.navi-fixed')
const arrowRight = document.querySelectorAll('.arrowRight')
const showItems = document.querySelectorAll('.nav-items > ul > div > ul')
const showIf = document.querySelector('.if i')


let basket = JSON.parse(localStorage.getItem('data')) || []

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


// let allInfo = JSON.parse(localStorage.getItem('allInfo'))

// document.querySelector('.login-form').addEventListener('click', _ => {

//     let email = document.querySelector('#email').value
//     let password = document.querySelector('#password').value

//     allInfo.forEach(x => {
//         let search = allInfo.find(item => {
//             item.email === email
//         })
//         console.log(search)
//     })
    
// })