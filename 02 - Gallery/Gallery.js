// class to create a gallery, where you can pass in gallery divs, add functions and event listeners
const modalDiv = document.querySelector('.modal')
const modalImg = modalDiv.querySelector('.modal-image')
const modalPrev = modalDiv.querySelector('.prev')
const modalNext = modalDiv.querySelector('.next')

class Gallery {
  constructor(gallerySelector) {
    this.galleryDiv = document.querySelector(gallerySelector)
    this.galleryDiv.addEventListener('click', (e) => {
      this._onclickImg(e)
    })
  }

  _onclickImg(e) {
    if (e.target.tagName == 'IMG') {
      this.openModal()
      this.showImage(e.target)
    }
  }
  showImage(el) {
    if (!el) {
      console.info('No Image To Show')
      return
    }
    modalDiv.querySelector('img').src = el.src
    modalDiv.querySelector('h2').textContent = el.title
    modalDiv.querySelector('figure p').textContent = el.dataset.description
    this.currentImage = el
  }
  openModal() {
    modalDiv.classList.add('open')
    //add event listeners
    modalPrev.addEventListener('click', (e) => {
      this.handlePrevImg(e)
    })
    modalNext.addEventListener('click', (e) => {
      this.handleNextImg(e)
    })
    window.addEventListener('keyup', (e) => {
      this.handleKeyUp(e)
    })

    window.addEventListener('click', (e) => {
      this.closeModalClick(e)
    })
  }
  handleKeyUp(e) {
    if (e.key === 'Escape') this.closeModal()
    if (e.key === 'ArrowRight')
      this.showImage(this.currentImage.nextElementSibling)
    if (e.key === 'ArrowLeft')
      this.showImage(this.currentImage.previousElementSibling)
  }

  closeModal() {
    modalDiv.classList.remove('open')
    modalPrev.removeEventListener('click', (e) => {
      this.handlePrevImg(e)
    })
    modalNext.removeEventListener('click', (e) => {
      this.handleNextImg(e)
    })
    window.removeEventListener('click', (e) => {
      this.closeModalClick(e)
    })
  }

  closeModalClick(e) {
    if (e.target.classList.contains('modal')) {
      this.closeModal()
    }
  }

  handlePrevImg(e) {
    console.log(this.currentImage.alt)
    this.showImage(this.currentImage.previousElementSibling)
    console.log(this.currentImage.alt)
  }
  handleNextImg(e) {
    console.log(this.currentImage.alt)
    this.showImage(this.currentImage.nextElementSibling)
    console.log(this.currentImage.alt)
  }
}
const gallery1 = new Gallery('.gallery1')
const gallery2 = new Gallery('.gallery2')
