import React, { Component } from 'react'
import Card from './Card';

export default class CardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 遮罩
      mainCardNumber: '',
      isCardNumberMasked: true,
      minCardYear: new Date().getFullYear(),
    }
  }
  /**
   * 卡号-调用父类方法修改卡号
   */
  changeNumber = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    // 4位间隔处理
    let outPutVal = val.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ')
    this.props.inputCardNumber(outPutVal);
  }
  /**
   * 卡号-聚焦
   */
  focusCardNumber = () => {
    // this.unMaskCardNumber();
    this.unMaskCardNumber();
  }
  /**
   * 卡号-移除焦点
   */
  blurCardNumber = () => {
    if (this.state.isCardNumberMasked) {
      this.maskCardNumber()
    }
  }
  /**
   * 卡号-遮罩
   */
  maskCardNumber = () => {
    this.setState({
      mainCardNumber: this.props.formData.cardNumber
    }, () => {
      let arr = this.state.mainCardNumber.split('');
      arr.forEach((item, index) => {
        if (index > 4 && index < 14 && item.trim() !== '') {
          arr[index] = '*'
        }
      })
      this.props.inputCardNumber(arr.join(''));
    })
  }
  /**
   * 卡号-去除遮罩
   */
  unMaskCardNumber = () => {
    this.props.inputCardNumber(this.state.mainCardNumber)
  }
  /**
   * 遮罩切换
   */
  toggleMask = () => {
    this.setState((prev) => {
      return {
        isCardNumberMasked: !prev.isCardNumberMasked
      }
    }, () => {
      if (this.state.isCardNumberMasked) {
        this.maskCardNumber()
      } else {
        this.unMaskCardNumber();
      }
    })
  }
  /**
   * 姓名-调用父类更新
   */
  changeName = (e) => {
    let val = e.target.value;
    this.props.inputCardName(val);
  }
  /**
   * 月份-调用父类更新
   */
  changeMonth = (e) => {
    let val = e.target.value;
    console.log('val :', val);
    this.props.inputCardMonth(val);
  }
  /**
   * 年份-调用父类更新
   */
  changeYear = (e) => {
    let val = e.target.value;
    console.log('val :', val);
    this.props.inputCardYear(val);
  }
  render () {
    const { formData: { cardNumber, cardName } } = this.props;
    const { minCardYear, isCardNumberMasked } = this.state;
    let toggleMaskActive = this.state.isCardNumberMasked ? '-active' : '';
    // 年份处理
    let year = [];
    for (let i = 0; i < 20; i++) {
      year.push(minCardYear + i + '');
    }
    // 月份处理
    let month = [];
    for (let i = 1; i <= 12; i++) {
      if (i < 10) {
        month.push('0' + i);
      } else {
        month.push(i);
      }

    }
    return (
      <div className="card-form">
        <div className="card-list">
          <Card
            // backgroundImage={}
            // 传递给子组件是否遮罩
            isCardNumberMasked={isCardNumberMasked}
            labels={this.props.formData}
            changeTrans={this.props.changeTransition}
          ></Card>
        </div>
        {/* 卡号 */}
        <div className="card-form__inner">
          <div className="card-input">
            <label htmlFor="cardNumber"
              className="card-input__label">Card Number(卡号)</label>
            {/* 卡号表单 */}
            <input type="tel" className="card-input__input"
              onChange={this.changeNumber}
              onFocus={this.focusCardNumber}
              onBlur={this.blurCardNumber}
              value={cardNumber}
              onKeyDown={() => {
                this.props.toggleChange()
              }}
              onKeyUp={() => {
                this.props.toggleChange()
              }}
            />
            <button title="Show/Hide card number"
              className={"card-input__eye " + toggleMaskActive}
              onClick={this.toggleMask}
              disabled={cardNumber === ''}
            >
              {/* Show/Hide card number */}
            </button>
          </div>
          {/* 姓名 */}
          <div className="card-input">
            <label htmlFor="cardName"
              className="card-input__label">Card Name(姓名)</label>
            <input type="text"
              value={cardName}
              onChange={this.changeName}
              className="card-input__input" />
          </div>
          {/* 过期时间 */}
          <div className="card-form__row">
            <div className="card-form__col">
              <div className="card-form__group">
                <label htmlFor="cardMonth"
                  className="card-input__label">Expiration Date(过期时间)</label>
                <select className="card-input__input -select"
                  onChange={this.changeMonth}
                >
                  {/* 月份处理 */}
                  <option>Month(月)</option>
                  {/* <option >{}</option> */}
                  {month.map((item, index) => {
                    return (
                      <option key={index}>{item}</option>
                    )
                  })}
                </select>
                <select className="card-input__input -select"
                  onChange={this.changeYear}
                >
                  {/* 年份处理 */}
                  <option >Year(年)</option>
                  {
                    year.map((item, index) => {
                      return (
                        <option key={index}>{item}</option>
                      )
                    })
                  }

                </select>
              </div>
            </div>
            {/* 安全码 */}
            <div className="card-form__col -cvv">
              <div className="card-input">
                <label htmlFor="cardCvv"
                  className="card-input__label">CVV(安全码)</label>
                <input type="tel"
                  className="card-input__input"
                />
              </div>
            </div>
          </div>
          <button className="card-form__button"
          >Submit</button>
        </div>
      </div>
    )
  }
}


/*
  ReactDOM.render() 会控制你传入容器节点里的内容。
  当首次调用时，容器节点里的所有 DOM 元素都会被替换，
  后续的调用则会使用 React 的 DOM 差分算法（DOM diffing algorithm）进行高效的更新。
 */