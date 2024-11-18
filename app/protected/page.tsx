'use client'
 
import { useRouter } from 'next/navigation'


const ProtectedPage = () => {
  const router = useRouter();

  const token = localStorage.getItem('token');

  if (!token) {
    router.push('/');
    return null;
  }

  // You can now use the token to make authenticated requests to your API
  return (
    <div>
      <h1>Protected Page</h1>
      {/* ... */}
    </div>
  );
};

export default ProtectedPage;
