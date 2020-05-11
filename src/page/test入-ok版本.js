import React, { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './2.scss'
export default function Test () {
  const [showMessage, setShowMessage] = useState(false);
  const [flag, setFlag] = useState([]);
  const [count, setCount] = useState(0);
  const [val, setValue] = useState('');
  useEffect(() => {
    let flags = [false, false, false, false, false, false];
    setFlag([...flags]);
  }, [])

  let handleChange = (e) => {
    setValue(e.target.value)

    if (count < 6) {
      let copyFlag = flag;
      copyFlag[count] = true;
      setFlag(() => { return [...copyFlag] });
      setCount(count + 1);
      console.log('object :', flag);
      // 怎么做减法?
      // 新建一个state--->是input的value的长度,
      // 长度是1,前1个是true
      //长度是2,前2个是true,其余false
      //长度是6,全部true
      //长度是5,前5个设置成true,最后一个设置成false
      // 做法
      // 上来先全部设置成false,再一个一个设置成true?
      // 不行,这样所有的元素都会出现动画
      // 使用数组过滤
    }
  }
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
      <button onClick={() => { setShowMessage(true) }}>点击</button>
      <button onClick={() => { setShowMessage(false) }}>点击</button>
      <input type="text" name="name" id="wq"
        maxLength='6'
        value={val}
        onChange={handleChange}
        onKeyDown={() => {
        }}
        onKeyUp={() => {
        }}
      />
    </div>
  )
}

  // in={showMessage}