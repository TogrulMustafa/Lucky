const naviHamb = document.querySelector('#naviHamb')
const close = document.querySelector('#close')
const scrollTopBtn = document.querySelector('.scrollToTop-btn')
const naviFixed = document.querySelector('.navi-fixed')
const arrowRight = document.querySelectorAll('.arrowRight')
const showItems = document.querySelectorAll('.nav-items > ul > div > ul')
const showIf = document.querySelector('.if i')
const retail = document.getElementById('retail-order')
const wholesale = document.getElementById('wholesale-order')


let basket = JSON.parse(localStorage.getItem('data')) || []
let bas = JSON.parse(localStorage.getItem('bas')) || []
let sebet = JSON.parse(localStorage.getItem('sebet')) || []

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




// Double arrow'u klikleyende arrow'nun animasiyasinin deyismesi ve alt sifaris menyusunun acilmasi/baglanmasi 

document.querySelectorAll('.fa-angles-down').forEach((item,i) => {
    item.addEventListener('click', _ => {
        document.querySelectorAll('.wholesaleRetail')[i].classList.toggle('active')
        item.classList.toggle('arrow-up')
    })
})


if (basket.length >= 1) {

    document.querySelector('.retail-content').style.display = 'block'
    document.querySelector('.wholesale-content').style.display = 'none'
    document.querySelectorAll('.header-col')[0].style.background = '#3e6854'
    document.querySelectorAll('.header-col')[0].style.color = '#fff'
    document.querySelectorAll('.header-col')[1].style.background = '#f8f8f8'
    document.querySelectorAll('.header-col')[1].style.color = '#303030'

    let ab = basket.map(x => {
        let search1 = shopItemsData.find(item => item.id === x.id) || []
        let {img, name, price, color,} = search1
        return search1
    })
    console.log(ab)

}