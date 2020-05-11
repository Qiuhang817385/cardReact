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
  }

  let changeAni = () => {
    console.log('val :', val);
    if (count < 6) {
      // 控制数组
      let copyFlag = flag;
      copyFlag[count] = true;

      setFlag([...copyFlag]);

      setCount(count + 1);

      console.log('object :', flag);
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
          changeAni()
        }}
      />
    </div>
  )
}

  // in={showMessage}