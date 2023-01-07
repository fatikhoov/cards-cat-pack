const cardsInner = document.getElementById('wrapper__cards_body-items')

let preTitleCat,
  titleCat,
  footerCat,
  cardsCat,
  itemCard,
  newPreTitleCat,
  newFooterText,
  finishBottom

preTitleCat = 'Сказочное заморское яство'
newPreTitleCat = 'Котэ не одобряет?'
titleCat = 'Нямушка'
footerCat = `Чего сидишь? Порадуй котэ,&nbsp;<a class="payCard" href="№" onclick="return false">купи.</a>`
newFooterText = [
  'Печень утки разварная с артишоками.',
  'Головы щучьи с чесноком да свежайшая сёмгушка.',
  'Филе из цыплят с трюфелями в бульоне.',
]
cardsCat = [
  {
    preTitleCat: preTitleCat,
    titleCat: titleCat,
    footerCat: footerCat,
    name: 'с фуа-гра',
    count: 10,
    present: 'мышь в подарок',
    weight: '0,5',
    class: 'wrapper__cards_body-item',
    disabled: false,
  },
  {
    preTitleCat: newPreTitleCat,
    titleCat: titleCat,
    footerCat: newFooterText[1],
    name: 'с рыбой',
    count: 40,
    present: '2 мыши в подарок',
    weight: '2',
    class: 'wrapper__cards_body-item active-cards',
    disabled: false,
  },
  {
    preTitleCat: preTitleCat,
    titleCat: titleCat,
    footerCat: newFooterText[2],
    name: 'с курой',
    count: 100,
    present: '5 мышей в подарок<br>заказчик доволен',
    weight: '5',
    class: 'wrapper__cards_body-item disabled',
    disabled: true,
  },
]

const mouseEvent = () => {
  try {
    cardsInner.addEventListener('click', (e) => {
      if (
        e.target.parentElement.classList.contains(
          'wrapper__cards_body-item',
          'active-cards'
        )
      ) {
        const item = e.target.parentElement.className
        const id = e.target.attributes[2].value
        if (item == 'wrapper__cards_body-item active-cards') {
          cardsInner.onmouseout = () => {}
          e.target.parentElement.classList.toggle('active-cards')
          document.getElementById(`pre-title-${id}`).innerHTML = preTitleCat
          document.getElementById(
            `item__bottom-${id}`
          ).innerHTML = `${footerCat}`
        } else if (item == 'wrapper__cards_body-item') {
          e.target.parentElement.classList.toggle('active-cards')
          cardsInner.onmouseout = () => {
            document.getElementById(`pre-title-${id}`).innerHTML =
              newPreTitleCat
            document.getElementById(`item__bottom-${id}`).innerHTML =
              newFooterText[id]
          }
        }
      }

      if (e.target.parentElement.classList.contains('disabled')) {
        const id = e.target.attributes[2].value
        e.target.parentElement.classList.toggle('disabled')
        document.getElementById(`item__bottom-${id}`).innerHTML = `${footerCat}`
      }

      if (e.target.className == 'payCard') {
        const id = e.target.parentElement.attributes[2].value
        e.target.parentElement.parentElement.classList.toggle('disabled')
        cardsCat[id].disabled = true
        document.getElementById(
          `item__bottom-${id}`
        ).innerHTML = ` Печалька, ${cardsCat[id].name} закончился.`
      }
    })
  } catch (error) {
    alert('Что-то пошло не так', error)
  }
}

const cardsInnerFunc = () => {
  try {
    if (cardsInner.childNodes.length <= 0) {
      cardsCat.forEach((e, index) => {
        cardsInner.innerHTML += `<div id="wrapper__cards_body-item" class="${
          e.class
        }">
      <div  class="indexCard" id="${index}" data="${index}"></div>
      <div class="item__top_header">
        <div class="corner"></div>
        <div  id="pre-title-${index}" class="item__top_texts-pretitle">
          ${e.preTitleCat}
        </div>
          </div>
      <div class="item__top">
        <div class="item__top_texts">
          <div class="item__top_texts-title">
            <span class="title-card">${e.titleCat}</span>${e.name}
          </div>
          <div class="item__top_texts-count" id="texts-count-${index}">
            ${e.count} порций<span>${e.present}</span>
          </div>
        </div>
        <div class="item__top_description">
          <div class="item__top_description-weight">
            ${e.weight}<span>кг</span>
          </div>
        </div>
      </div>
      <div class="item__bottom" id="item__bottom-${index}" data="${index}">
        ${e.disabled ? ` Печалька, ${e.name} закончился.` : e.footerCat}
      </div>
    </div>`
      })
    }
  } catch (error) {
    alert('Что-то пошло не так', error)
  }
}

cardsInnerFunc()

mouseEvent()
