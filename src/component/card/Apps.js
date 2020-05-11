import React, { Component } from 'react'
import CardForm from './CardForm'
import '../../style/style.scss';
export default class Apps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * 顶层表单数据:用户名/卡号/月/年/cvv
       */
      formData: {
        cardName: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: ''
      },
      changeTransition: false
    }
  }
  toggleChange = () => {
    this.setState((prev) => {
      return {
        changeTransition: !prev.changeTransition
      }
    })
  }
  updateCardNumber = (val) => {
    let newForm = this.state.formData;
    newForm["cardNumber"] = val;
    this.setState({
      formData: newForm
    })
  }
  updateCardName = (val) => {
    let newForm = this.state.formData;
    newForm["cardName"] = val;
    this.setState({
      formData: newForm
    })
  }
  updateCardMonth = (val) => {
    let newForm = this.state.formData;
    newForm["cardMonth"] = val;
    this.setState({
      formData: newForm
    })
  }
  updateCardYear = (val) => {
    let newForm = this.state.formData;
    newForm["cardYear"] = val;
    this.setState({
      formData: newForm
    })
  }
  updateCardCvv = (val) => {
    let newForm = this.state.formData;
    newForm["cardCvv"] = val;
    this.setState({
      formData: newForm
    })
  }
  render () {
    return (
      <div className="wrapper">
        <CardForm formData={this.state.formData}
          inputCardNumber={this.updateCardNumber}
          inputCardName={this.updateCardName}
          inputCardMonth={this.updateCardMonth}
          inputCardYear={this.updateCardYear}
          inputCardCvv={this.updateCardCvv}
          changeTransition={this.state.changeTransition}
          toggleChange={this.toggleChange}
        />
      </div>
    )
  }
}
