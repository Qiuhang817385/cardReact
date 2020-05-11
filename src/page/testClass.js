import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group';
import './testClass.scss'
export default class testClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      flag: [false, false, false, false, false, false]
    }
  }
  handleChange = (e) => {
    let valu = e.target.value;
    let prev;

    this.setState((prevState) => {
      prev = prevState.val;
      let copyFlag = this.state.flag;
      let len;
      if (valu.length === 0) {
        for (let i = 0; i < copyFlag.length; i++) {
          copyFlag[i] = false;
        }
      } else {
        if (prev.length > valu.length) {
          len = valu.length;
          copyFlag.splice(len, 1, false);
        } else {
          len = valu.length - 1;
          copyFlag.splice(len, 1, true)
        }
      }


      this.setState({
        flag: copyFlag
      }, () => {
        console.log('this.state.flag :', this.state.flag);
      })
      return {
        val: valu
      }
    })
  }
  render () {
    const { val, flag } = this.state;
    let newArr = '123456'
    return (
      <div>
        {/* <TransitionGroup> */}
        <div className="wrapper">
          {
            newArr.split('').map((item, index) => {
              return (
                <span key={index}>
                  {
                    val[index] ?
                      <CSSTransition
                        in={flag[index]}
                        timeout={250}
                        classNames="fade"
                        appear={true}
                        key={index}
                      >
                        <div className="hellow">{val[index]}</div>
                      </CSSTransition>
                      : <CSSTransition
                        in={flag[index]}
                        timeout={250}
                        classNames="fade"
                        appear={true}
                        key={index}
                      >
                        <div className="hellow">*</div>
                      </CSSTransition>
                  }
                </span>
              )
            })
          }
        </div>
        {/* </TransitionGroup> */}
        <div className="posi" style={{
          position: 'absolute',
          left: '0',
          right: '0',
          top: '500px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <input type="tel" name="name" id="wq"
            maxLength='6'
            value={val}
            onChange={this.handleChange}
            onKeyDown={() => {
              // changeAni()
            }}
            onKeyUp={() => {
            }}
          />
        </div>
      </div>
    )
  }
}
