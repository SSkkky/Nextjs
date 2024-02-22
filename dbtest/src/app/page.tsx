//src/app/page.tsx
"use client";

import axios, { AxiosResponse } from "axios";
import { useState, useRef, useEffect } from "react";
import { myProjectPostType } from '@/types/datatype';

export default function Home() {
  const [result, setResult] = useState([]);
  const [postData, setPostData] = useState<myProjectPostType | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
        res = await axios.put(`/api/${idx}`, postData);
        break;
    }

    if (res !== null) {
      console.log(res.data);
      setResult(res.data);
    }
  }

  useEffect(() => {
    dataCrl('all')
  }, [])

  // useEffect(() => {
  //   if (submitting && postData !== null) {
  //     dataCrl('insert');
  //     setSubmitting(false);
  //   }
  // }, [postData, submitting]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    let writeData: any = Object.fromEntries(formdata.entries());

    const newData: myProjectPostType = {
      postId: Date.now(),
      title: writeData.title,
      content: writeData.content,
      authorId: writeData.authorId,
      token: 'token',
      date: new Date().getTime(),
      comments: []
    };

    await setPostData(newData);
    setSubmitting(true);
    dataCrl('insert');
  }

  return (
    <>
      <article>
        <h2>게시판</h2>
      </article>

      <br></br>
      <form onSubmit={(e) => { onSubmitHandler(e) }} style={{ marginBottom: '30' }}>
        <p>작성자 : <input type="text" name="authorId" placeholder="작성자를 입력해주세용" /></p>
        <p>제목 : <input type="text" name="title" placeholder="제목을 입력해주세용" /></p>
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
