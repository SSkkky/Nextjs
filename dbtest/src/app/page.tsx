//src/app/page.tsx
"use client";

import axios, { AxiosResponse } from "axios";
import { useState, useRef, useEffect } from "react";
import { myProjectPostType } from '@/types/datatype';

export default function Home() {
  const [result, setResult] = useState([]);
  const [postData, setPostData] = useState<myProjectPostType | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [itemIdx, setItemIdx] = useState<number>(0);

  const elRef = useRef<HTMLInputElement>(null);

  async function dataCrl(type: string, idx?: number) {
    let res: AxiosResponse | null = null;


    switch (type) {
      case 'all':
        res = await axios.get('/api');
        break;
      case 'insert':
        res = await axios.post('/api', postData);
        break;
      case 'delete':
        res = await axios.delete(`/api/${idx}`);
        break;
      case 'put':
        res = await axios.put(`/api/${idx}`, { id: idx, title: inputValue });
        break;
    }

    if (res !== null) {
      console.log(res.data);
      setResult(res.data);
    }
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    let writeData: any = Object.fromEntries(formdata.entries());

    // 값이 File 타입인 경우를 대비하여 string으로 변환
    for (let key in writeData) {
      if (typeof writeData[key] === 'object' && writeData[key] instanceof File) {
        writeData[key] = writeData[key].name;
      }
    }

    const newData: myProjectPostType = {
      postId: Date.now(),
      title: writeData.title,
      content: writeData.content,
      authorId: writeData.authorId,
      token: 'token',
      date: new Date().getTime(),
      comments: []
    };

    setPostData(newData);
    dataCrl('insert');
  }

  useEffect(() => {
    dataCrl('all')
  }, [])

  return (
    <>
      <article>
        <h2>게시판</h2>
      </article>

      <br></br>
      <form onSubmit={(e) => { onSubmitHandler(e) }} style={{ marginBottom: '30' }}>
        <p>작성자 : <input name="authorId" placeholder="작성자를 입력해주세용" /></p>
        <p>제목 : <input name="title" placeholder="제목을 입력해주세용" /></p>
        <p>내용 : <textarea name="content" placeholder="내용을 입력해주세요!!!" /></p>
        <button>작성</button>
      </form>

      {
        result.map((item: myProjectPostType, i: number) => {
          return <div key={i}>
            <p>글번호 : {item.postId}</p>
            <p>작성자 : {item.authorId}</p>
            <p>제목 : {item.title}</p>
            <p>내용: {item.content}</p>
            <p>작성일 : {item.date}</p>
            <button onClick={() => { dataCrl('delete', item.postId) }}>데이터 삭제</button>
            <br></br>
            <br></br>
          </div>
        })
      }

    </>
  );
}
