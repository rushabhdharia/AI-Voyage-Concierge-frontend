import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <nav>
      {/* <Link href="/">Protected Page</Link> */}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;