import React, { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './1.scss'
export default function Test () {
  const [showMessage, setShowMessage] = useState(true);
  const [flag, setFlag] = useState([]);
  const [count, setCount, getCount] = useState(0);
  const [val, setValue] = useState('123456');
  const [prev, setPrev] = useState(0);

  useEffect(() => {
    // 这里可以改成,获取Input的最大值,然后循环添加,这里就先这样
    // 必须要有初始值
    let flags = [true, true, true, true, true, true];
    setFlag([...flags]);
  }, [])


  let handleChange = (e) => {
    let valu = e.target.value;
    let prevVal = val.length;
    setPrev(prevVal)
    setValue(() => { return valu; });
  }

  useEffect(() => {

  }, [val]);

  //利用中间值做存储，获取旧值，并且可以在其他地方获取最新的值，
  //但是现在还是没用办法，直接在useState  的setState之后获取最新的值，
  // 少了一个点就是this.setState的第二个参数
  // let changeAni = () => {
  //   console.log('prev :', prev);
  //   console.log('after', val.length);
  //   let copyFlag = flag;
  //   let len;
  //   if (prev > val.length) {
  //     len = val.length;
  //     copyFlag.splice(len - 1, 1, false)
  //   } else {
  //     len = val.length - 1;
  //     copyFlag.splice(len, 1, true)
  //   }
  //   // copyFlag[len] = !flag[len];
  //   console.log('copyFlag :', copyFlag);
  //   setFlag([...copyFlag]);
  // }


  return (
    <div>
      {/* <TransitionGroup> */}
      {
        val.split('').map((item, index) => {
          return (
            <CSSTransition
              in={flag[index]}
              timeout={250}
              classNames="fade"
              appear={true}
              key={index}
            >
              <div className="hellow">{item}</div>
            </CSSTransition>
          )
        })
      }
      {/* </TransitionGroup> */}
      <div className="posi" style={{
        position: 'absolute',
        left: '500px',
        top: '500px'
      }}>
        <button onClick={() => { setShowMessage(true) }}>点击</button>
        <button onClick={() => { setShowMessage(false) }}>点击</button>
        <input type="tel" name="name" id="wq"
          maxLength='6'
          value={val}
          onChange={handleChange}
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

  // in={showMessage}