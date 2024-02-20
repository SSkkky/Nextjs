// api route 정의, googleSearch 함수 호출/반환
import type { NextApiRequest, NextApiResponse } from 'next';
import { googleSearch } from '@/lib/googleSearch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    //보낼 검색어
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ message: '400!! Missing query parameter' });
  }

  const results = await googleSearch(query as string);
  res.status(200).json(results);
}
