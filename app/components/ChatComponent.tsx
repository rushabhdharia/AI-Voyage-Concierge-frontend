import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function ChatComponent() {
  const [locationsInput, setLocations] = useState<string>('');
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [freeformText, setFreeformText] = useState<string>('');
  const [conversationId, setConversationId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const token = localStorage.getItem('token'); 

  const handleSubmit = async () => {
    const locations = locationsInput.split(',').map((location) => location.trim());
    const requestBody: {
      locations: string[];
      numberOfDays: number;
      freeformText?: string;
      conversationId?: string;
    } = {
      locations,
      numberOfDays,
      freeformText,
    };
  
    if (conversationId) {
      requestBody.conversationId = conversationId;
    }

    if(freeformText) {
      requestBody.freeformText = freeformText;
    }

    console.log(requestBody);

    try {
      var content = "";
      if (locations) 
        content += locations + " ";
      if(numberOfDays)
      content += numberOfDays + " " 
      content += freeformText;
      setMessages([...messages, { role: 'user', content: content }]);
      const response = await fetch('https://localhost:7129/Ai/GetTravelItinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(requestBody),
      });
      console.log(requestBody);
      const data = await response.json();
      console.log(data);
      setConversationId(data.conversationId);

      setMessages([...messages, { role: 'user', content: content }, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        Locations
        <input type="text" placeholder="Locations (separated by commas)" onChange={(e) => setLocations(e.target.value)} />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Number of Days
        <input type="number" placeholder="Number of Days" onChange={(e) => setNumberOfDays(parseInt(e.target.value))} />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Extra Considerations (Optional)
        <textarea className="textarea textarea-bordered" placeholder="Freeform Text" onChange={(e) => setFreeformText(e.target.value)} />
      </label>
      
      <button className='btn btn-primary' onClick={handleSubmit}>Send</button>

      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role === 'user' ? 'chat chat-start' : 'chat chat-end'}`}>
            <div className="chat-bubble">
            {message.role === 'user' ? 'You:' : 'Assistant:'} {message.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatComponent;