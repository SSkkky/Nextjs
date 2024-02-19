/*
uploadBytes(ref(storage, '파일명'), file)
getDownloadURL(ref(storage, '파일명'), file)
deleteObject(ref(storage, '파일명'), file)
listAll(ref(storage, '폴더이름'))
*/
"use client";

import { storage } from '@/firebase/firebase-sdk';
import {ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage'
import { useEffect, useState } from 'react';

export default function Home() {
  const [imgList, setImgList] = useState([]);

  function upload(e){
    e.preventDefault();
    const formdata = new FormData(e.target);
    const file = formdata.get('photo');
    const storageRef = ref(storage, 'test-gom/' + file.name);

    uploadBytes(storageRef, file)
    .then(async snapshot => {
      const url = await getDownloadURL(ref(storage, snapshot.metadata.fullPath));
      setImgList([...imgList, {url, fullPath: snapshot.metadata.fullPath}])
    })
  }

  async function getImages(){
    const storageRef = ref(storage, 'test-gom/');
    listAll(storageRef)
    .then(async (res)=>{
      let imgArr = [];
      for(let value of res.items){
        const url = await getDownloadURL(value);
        imgArr.push({url, fullPath: value.fullPath})
      }
      setImgList(imgArr);
    }) 
  }

  function delImage(path){
    deleteObject(ref(storage, path));
    setImgList((item)=>{
      return item.filter(obj => obj.fullPath != path)
    })
  }

  useEffect(()=>{
    getImages();
  }, [])

  return (
    <div>
      <article>
        <h2>파일 등록</h2>
        <form onSubmit={upload}>
          <p>
            <input type="file" name="photo" />
            <button>등록</button>
          </p>
        </form>
      </article>

      <article>
        {
          imgList.map((obj, k)=>{
            return <div key={k} style={{border:"1px solid black", width:220, margin:20}}>
              <img src={obj.url} style={{width:200}} />
              <button onClick={()=>{delImage(obj.fullPath)}}>삭제</button>
              </div>
          })
        }
      </article>
    </div>
  );
}
