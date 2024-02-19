"use client"
import {useStore} from '@/app/state/store';

export default function Item() {
  const url = process.env.NEXT_PUBLIC_URL;
  const {count, increment} = useStore();

  console.log(url);
  return (
    <div>
        <h2>좋아요!</h2>
      <div>
        {count}<button onClick={increment}>증가</button>
      </div>
    </div>
  )
}