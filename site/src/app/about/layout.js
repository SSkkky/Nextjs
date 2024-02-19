import Link from 'next/link';
import '@/style/about.css';

function about({children}) {
    return (
        <div className='about-ly'>
            <nav>
                <Link href="/about/profile">profile</Link>
                <Link href="/about/skill">skill</Link>
            </nav>
            <div className='container'>
                {children}
            </div>
        </div>
    );
}

export default about;