import React, { Component } from 'react'
// 校验地区
import { cardType } from './vali';
import './anmit.scss'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 表单数据,每次修改父组件当中的值,子组件当中的表单数据跟着变化
      labels: this.props.labels,
      // 当前值,现在默认使用的default样式
      currentPlaceholder: '',
      // 默认数据源样式
      amexCardPlaceholder: '#### ###### #####',
      dinersCardPlaceholder: '#### ###### ####',
      defaultCardPlaceholder: '#### #### #### ####',
      //是否随机图片
      randomBackgrounds: true,
      focusElementStyle: null,
      currentFocus: null,
      isFocused: false,
      isCardFlipped: false,
      changeTransition: this.props.changeTrans
    }
    this.itemBg = React.createRef()
  }
  /**
   * 动画
   */
  changeFocus = () => {
    // let target = this.$refs[this.currentFocus]
    // this.focusElementStyle = target ? {
    //   width: `${target.offsetWidth}px`,
    //   height: `${target.offsetHeight}px`,
    //   transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
    // } : null
  }
  componentDidMount () {
    this.changePlaceholder();
    // src={this.currentCardBackground()}
    this.itemBg.current.src = this.currentCardBackground();
  }
  /**
   * 修改Placeholder
   */
  changePlaceholder = () => {
    // let type = cardType(this.state.labels.cardNumber);
    this.setState((prev) => {
      return {
        currentPlaceholder: prev.defaultCardPlaceholder
      }
    })
  }
  /**
   * 获取是否遮罩 Props
   */
  getIsNumberMasked = (index, n) => {
    return index > 4 && index < 14 && this.state.labels.cardNumber.length > index && n.trim() !== '' && this.props.isCardNumberMasked
  }
  /**
   * 动态背景图片
   */
  currentCardBackground () {
    // 自定义图片
    if (this.state.randomBackgrounds) { // TODO will be optimized
      let random = Math.floor(Math.random() * 25 + 1)
      return require(`../../assets/images/${random}.jpeg`);
    } else {
      return null
    }
    /* 
    if (this.randomBackgrounds && !this.backgroundImage) { // TODO will be optimized
        let random = Math.floor(Math.random() * 25 + 1)
        return require(`@/assets/images/${random}.jpeg`)
      } else if (this.backgroundImage) {
        return this.backgroundImage
      } else {
        return null
      }
     */
  }

  render () {
    const { currentPlaceholder, labels, changeTransition } = this.state;
    return (
      <div className="card-item">
        <div className="card-item__side -front">
          <div className="card-item__focus"></div>
          <div className="card-item__cover">
            {/* 背景图片 */}
            <img alt="card-item__bg" className="card-item__bg" ref={this.itemBg} />
          </div>
          <div className="card-item__wrapper">
            {/* 左侧背景图 */}
            <div className="card-item__top">

              <img alt="card-item__chip" className="card-item__chip" src={require("../../assets/images/chip.png")} />

              <div className="card-item__type">
                {/* <transition name="slide-fade-up"> */}
                {/* 银行图片 */}
                <img alt="card-item__typeImg" className="card-item__typeImg" src={require('../../assets/images/visa.png')} />
                {/* </transition> */}
              </div>
            </div>
            {/* 卡号 */}
            <label className="card-item__number">
              {
                currentPlaceholder.split('').map((item, index) => {
                  if (this.getIsNumberMasked(index, item)) {
                    // slide-fade-up
                    return (<CSSTransition key={index} in={changeTransition} timeout={500} className="slide" >
                      <span>
                        <div className="card-item__numberItem">*</div>
                      </span>
                    </CSSTransition>)
                  } else if (labels.cardNumber.length > index) {
                    return (
                      <CSSTransition key={index} in={changeTransition} timeout={500} className="slide" >
                        <span>
                          <div className="card-item__numberItem">{labels.cardNumber[index]}</div>
                        </span>
                      </CSSTransition>)
                  } else {
                    return (<CSSTransition key={index} in={changeTransition} timeout={500} className="slide" >
                      <span>
                        <div className="card-item__numberItem">{item}</div>
                      </span>
                    </CSSTransition>)
                  }
                })
              }
            </label>
            {/* 姓名 */}
            <div className="card-item__content">
              <label className="card-item__info">
                <div className="card-item__holder">Card Holder</div>
                {
                  labels.cardName.length > 0 ?
                    <div className="card-item__name">
                      {labels.cardName.replace(/\s\s+/g, ' ').split('').map((item, index) => {
                        return (
                          <span key={index} className="card-item__nameItem">{item}</span>
                        )
                      })}
                      {/* <transition-group name="slide-fade-right"> */}
                    </div> : <div className="card-item__name">Full Name</div>
                }
                {/* <transition name="slide-fade-up"></transition> */}
              </label>
              {/* 日期 */}
              <div className="card-item__date">
                <label
                  className="card-item__dateTitle">Expires</label>
                <label className="card-item__dateItem">
                  {/* <transition name="slide-fade-up"> */}
                  {
                    labels.cardMonth.length > 0 ? <span >{labels.cardMonth}</span> : <span>MM</span>
                  }
                  {/* </transition> */}
                </label>
                /
                <label className="card-item__dateItem">
                  {/* <transition name="slide-fade-up"> */}
                  {
                    labels.cardYear.length > 0 ? <span>{String(labels.cardYear).slice(2, 4)}</span> : <span >YY</span>
                  }


                  {/* </transition> */}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="card-item__side -back">
          <div className="card-item__cover">
            <img alt="card-item__bg" className="card-item__bg" />
          </div>
          <div className="card-item__band"></div>
          <div className="card-item__cvv">
            <div className="card-item__cvvTitle">CVV</div>
            <div className="card-item__cvvBand">
              <span >*</span>
            </div>
            <div className="card-item__type">
              {'{cardType}'}
              <img alt="card-item__typeImg" className="card-item__typeImg" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
