import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-header">
      <nav>
      <Link href="/">Home</Link>
      <Link href="/Surveys">Surveys</Link>
    
      </nav>
    </header>
  )}
// }
// <a href="/" className="logo">NHS Survey App</a>
//         <ul className="nav-links">
//           <li><a href="/Surveys">Surveys</a></li>
          
//         </ul>