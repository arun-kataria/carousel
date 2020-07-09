import React from 'react';
import './App.css';
import Close from './cross.png'
import ForwordArrow from './arrow-forword.svg'
import BackArrow from './arrow-back.svg'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.images = [{ id: 1, image: 'https://picsum.photos/id/237/200/300', name: 'Dog' },
    { id: 2, image: 'https://i.picsum.photos/id/1012/3973/2639.jpg?hmac=s2eybz51lnKy2ZHkE2wsgc6S81fVD1W2NKYOSh8bzDc', name: 'Friends' },
    { id: 3, image: 'https://i.picsum.photos/id/1003/1181/1772.jpg?hmac=oN9fHMXiqe9Zq2RM6XT-RVZkojgPnECWwyEF1RvvTZk', name: 'Cute' },
    { id: 4, image: 'https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ', name: 'Work' },
    { id: 5, image: 'https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68', name: 'Nature' },
    { id: 6, image: 'https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk', name: 'Boating' }]

    this.state.currentImage = 0;
    this.state.showCrousal = true;
    this.state.showSingleImage = false;
    this.state.showPrev = false;
    this.state.showNext = true;
    this.previous = this.previous.bind(this)
    this.next = this.next.bind(this)
    this.imageClick = this.imageClick.bind(this);
    this.gridImagesClick = this.gridImagesClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", (events) => {
      if (events.keyCode === 27)
        this.setState({ showSingleImage: false, showCrousal: true, currentImage: 0, showPrev:false, showNext:true })
    }, false);
  }



  previous() {
    let currentImage = this.state.currentImage;
    if (currentImage !== 0) {
      let dec = currentImage - 1;
      let set_state = { currentImage: dec, showNext: true }
      if (dec === 0)
        set_state.showPrev = false
      this.setState(set_state)
    }
  }

  next() {
    let currentImage = this.state.currentImage;
    if (currentImage !== this.state.images.length - 1) {
      let increment = currentImage + 1;
      let set_state = { currentImage: increment, showPrev: true };
      if (increment === this.state.images.length - 1)
        set_state.showNext = false
      this.setState(set_state)
    }
  }
  imageClick() {
    this.setState({ showCrousal: false })

  }

  gridImagesClick(item) {
    this.setState({ currentImage: item.id - 1, showSingleImage: true })
  }

  render() {
    return (<div>

      {!this.state.showSingleImage && <> {this.state.showCrousal ? <div className='mainDiv'>
        {this.state.showPrev && <img className='arrow' src={BackArrow} onClick={this.previous} alt="default" width="25" height="40" />}
        <img onClick={this.imageClick} src={this.state.images[this.state.currentImage].image} alt="default" width="500" height="600" />
        <span className='imageName'>{this.state.images[this.state.currentImage].name}</span>
        {this.state.showNext && <img className='arrow' onClick={this.next} src={ForwordArrow} alt="default" width="30" height="40" />}
      </div> : <div>
          <img className='gridClose' onClick={() => this.setState({ showCrousal: true })} src={Close} width="25" alt="default" />
          <div className='gridMain'>
            {this.state.images.map((i, index) =><img onClick={() => this.gridImagesClick(i)} key={index} className='gridImage' src={i.image}
              alt="default" width="100" height="150" />)}
          </div>
        </div>}</>}

      {this.state.showSingleImage ? <div>
        <img className='singleClose' onClick={() => this.setState({ showSingleImage: false })} src={Close} width="25" alt="default" />
        <img className='singleImage' src={this.state.images[this.state.currentImage].image} alt="default" />
      </div> : null}

    </div>)
  }

}
