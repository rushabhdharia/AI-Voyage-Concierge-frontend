
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <Link href="/travelItinerary">
        <button className='btn btn-primary'>Create Travel Itinerary</button>
      </Link>
      <Link href="/locationInfo">
        <button className='btn btn-primary'>Get Information/Fun Facts About a Location</button>
      </Link>
      <Link href="/conversationHistory">
        <button className='btn btn-primary'>Conversation History</button>
      </Link>
    </div>
  );
};

export default HomePage;