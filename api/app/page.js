"use client";

import axios from "axios";
import { useState, useRef } from "react";

export default function Home() {
  const [result, setResult] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [itemIdx, setItemIdx] = useState('');
  const [isOnChange, setIsOnChange] = useState(false);
  
  const elRef = useRef();

  async function dataCrl(type, idx){
    let res;

    switch(type){
      case 'all' : res = await axios.get('/api');
      break;
      case 'one' : res = await axios.get('/api/0');
      break;
      case 'insert' : res = await axios.post('/api', {id:new Date().getTime(), title:inputValue});
      break;
      case 'delete' : res = await axios.delete(`/api/${idx}`);
      break;
      case 'put' : res = await axios.put(`/api/${idx}`, {id:idx, title:inputValue});
      break;
    }
    
    console.log(res.data);
    setResult(res.data);
  }

  const onInsertHandler = ()=>{
    if(isOnChange){
      setInputValue(elRef.current.value);
      dataCrl('put', itemIdx)
    }
    dataCrl('insert');
  }
  
  const onChangeHandler = (e)=>{
    setInputValue(e.target.value);
  }

  const onPutHandler = (item) =>{
    setIsOnChange(true);
    elRef.current.value = item.title;
    setItemIdx(item.id);
  }

  return (
    <>
      <article>
        <h2>
          데이터 제어
          <button onClick={()=>{dataCrl('all')}}>모두 출력</button>
          <button onClick={()=>{dataCrl('one')}}>데이터 1개만 출력</button>
        </h2>
      </article>
      
      <br></br>
      <form>
        <input placeholder="입력해주세용" ref={elRef} onChange={(e)=>{onChangeHandler(e)}}/>
        <button onClick={onInsertHandler}>{isOnChange ? `수정!` : `추가!`}</button>
      </form>

      {
        result.map((item)=>{
          return <div key={item.id}>
            <p>id : {item.id}</p>
            <p>title : {item.title}</p>
            <button onClick={()=>{dataCrl('delete', item.id)}}>데이터 삭제</button>
            <button onClick={()=>{onPutHandler(item)}}>데이터 수정</button>
            <br></br>
            <br></br>
          </div>
        })
      }

    </>
  );
}
