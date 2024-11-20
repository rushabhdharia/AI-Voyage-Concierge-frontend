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
      <div className="navbar bg-base-100">
  <div className="navbar-start">
    <Link href="/home" className="btn btn-ghost text-xl">AI Travel Concierge</Link>
    </div>
  <div className="navbar-center">
  <ul
        className="menu">
        <li><Link href="/travelItinerary">Create Travel Itinerary</Link></li>
        <li><Link href="/locationInfo">Get Location Information</Link></li>
        <li><Link href="/conversationHistory">Conversation History</Link></li>
      </ul>
    </div>

  <div className="navbar-end">
      {hasToken && (
        <button className='btn btn-ghost' onClick={handleLogout}>Logout</button>
      )}   
  </div>
</div>
  );
};

export default Navbar;