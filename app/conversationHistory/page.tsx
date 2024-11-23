"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';

interface Conversation {
  id: string;
  userEmail: string;
  messages: { role: 'user' | 'assistant'; messageValue: string }[];
  conversationType: number;
}

const conversationTypeToPage = (type: number) => {
    switch (type) {
      case 0:
        return '/travelItinerary';
      case 1:
        return '/locationInfo';
      default:
        return '/'; // Or handle unexpected types
    }
  };

function ConversationList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch('https://localhost:7129/Ai/getconversationHistory',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        setConversations(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div>
    <NavBar/>
      <h1>Conversation History</h1>
      {conversations.length > 0 ? (      
        <ul>
          {conversations.map((conversation) => (
            <li key={conversation.id}>
                <div className='card bg-base-100 w-96 shadow-xl'>
                    <div className="card-body">
                        <h2 className="card-title">{conversation.conversationType == 0 ? "Travel Itinerary" : "Location Information" }</h2>
                        <p>{conversation.messages[0].messageValue}</p>
                        <div className="card-actions justify-end">
                        <Link href={conversationTypeToPage(conversation.conversationType) + "?id=" + conversation.id }>
                            <button className="btn btn-primary">View Details</button>
                        </Link>
                        </div>
                    </div>
                </div>             
            </li>
          ))}
        </ul>
      ) : (
        <p>No conversations found.</p>
      )}
    </div>
  );
}

export default ConversationList;