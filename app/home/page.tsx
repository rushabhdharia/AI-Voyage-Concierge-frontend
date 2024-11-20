
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/travelItinerary">
        <button>Create Travel Itinerary</button>
      </Link>
      <Link href="/locationInfo">
        <button>Get Information/Fun Facts About a Location</button>
      </Link>
      <Link href="/conversationHistory">
        <button>Conversation History</button>
      </Link>
    </div>
  );
};

export default HomePage;