// "use client";

import '@/styles/header.scss'
import Link from 'next/link';

export default function Header() {
    return (
    <header>
        <h1 className='titleLogo'>
            <Link href='/'>초딩</Link>
        </h1>
        <nav className='subMenuBar'>
            <Link href='/community'>커뮤니티 홈</Link>
            <Link href='/community/QnA'>Q&A</Link>
            <Link href='/community/myProject'>내 프로젝트</Link>
        </nav>
    </header>
    );
}