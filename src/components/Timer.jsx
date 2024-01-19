import { useState, useEffect, useMemo } from 'react';
import PropType from 'prop-types';

//時間毫秒計算
const sec = 1000; // 1秒
const min = sec * 60; //1分鐘
const hr = min * 60; // 1小時
const day = hr * 24; // 1天

const Timer = ({ deadline }) => {
  //防止畫面刷新重複賦予
  const parseDeadlineMillSec = useMemo(() => Date.parse(deadline));
  //計算初始時於時間
  const [time, setTime] = useState(parseDeadlineMillSec - Date.now());

  useEffect(() => {
    //建立每秒執行
    const counter = setInterval(() => {
      setTime(parseDeadlineMillSec - Date.now());
    }, 1000);

    //清除Interval事件
    return () => clearInterval(counter);
  }, [parseDeadlineMillSec]);

  return (
    <div className="flex gap-2">
      <p>競標剩餘時間</p>
      <p>{`${Math.floor(time / day)}`.padStart(2, '0')}天</p>
      <p>{`${Math.floor((time / hr) % 24)}`.padStart(2, '0')}時</p>
      <p>{`${Math.floor((time / min) % 60)}`.padStart(2, '0')}分</p>
      <p>{`${Math.floor((time / sec) % 60)}`.padStart(2, '0')}秒</p>
    </div>
  );
};

Timer.propTypes = {
  deadline: PropType.string,
};

export default Timer;
