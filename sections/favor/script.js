const favorContent = document.querySelector('.favor-content')
const naviHamb = document.querySelector('#naviHamb')
const close = document.querySelector('#close')
const scrollTopBtn = document.querySelector('.scrollToTop-btn')
const naviFixed = document.querySelector('.navi-fixed')
const arrowRight = document.querySelectorAll('.arrowRight')
const showItems = document.querySelectorAll('.nav-items > ul > div > ul')
const showIf = document.querySelector('.if i')
const officeCol = document.getElementsByClassName('office-col')


function showFavors() {
    let products = JSON.parse(localStorage.getItem('products'))
    return (favorContent.innerHTML = products.map(item => {
        return  `
        <div class="office-col">
            <div class="col-item">
                <div>${item.tag === undefined ? '' : item.tag}</div>
                <a href="#" id="heart">
                    <img src='../../img/images/icons/heart-filled.png' class=${item.name}>
                </a>
                <div class="col-content">
                    <a href="#"><img src=${item.img}></a>
                    <span>${item.name} ${item.mark} ${item.code}</span>
                    <div>
                        <span>${item.price} Azn</span>
                        <span>${item.discount} Azn</span>
                    </div>
                    <a href="#" id="cart">Səbətə at</a>
                </div>
            </div>                
        </div>
        `
    }).join('')
)
}


showFavors()



function setBackground() {
    document.querySelectorAll('.col-item div:first-child').forEach(item => {
        if (item.textContent == 'Tövsiyə edilir' ) {
            item.style.background = '#3e6854'
        } 
        else {
            item.style.background = '#de8936'
        }
        console.log(item.style)
    })
}

setBackground()




for (let i = 0; i < officeCol.length; i++) {
    officeCol[i].addEventListener('click', e => {
        let products = JSON.parse(localStorage.getItem('products'))
        products = products.filter(x => x.name !== e.target.className)
        document.querySelectorAll('.favorAmount').forEach(a => {
            a.innerHTML = products.map(item => item.count).reduce((x,y) => x + y,0)
            })
        e.target.parentElement.previousElementSibling.parentElement.parentElement.remove()
        localStorage.setItem('products', JSON.stringify(products))
    })
}   



let basket = JSON.parse(localStorage.getItem('data')) || []

let calculation = _ => {
    let cartIcon = document.querySelectorAll('.cartAmount')
    cartIcon.forEach(cartItem => {
        cartItem.innerHTML = basket.map(basketItem => basketItem.item).reduce((x,y) => x + y,0)
    })
    
}

calculation()



let favorCount = _ => {
    let products = JSON.parse(localStorage.getItem('products'))
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