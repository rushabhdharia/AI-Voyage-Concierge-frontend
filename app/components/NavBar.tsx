"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const hasToken = localStorage.getItem('token') !== null;

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link href="/" className="btn btn-ghost text-xl">AI Travel Concierge</Link>
  </div>

  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      {hasToken && (
        <li><button onClick={handleLogout}>Logout</button></li>    
      )}
      
    </ul>
  </div>
</div>
    </nav>
  );
};

export default Navbar;