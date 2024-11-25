import { useState, useEffect } from 'react';

interface ChatRequest {
  location: string;
  freeformText: string;
  selectedInformationTypes: number[];
  conversationId?: string;
}

interface Message {
  role: "user" | "assistant";
  messageValue: string;
}


function ChatForm({ id }: { id: string }) {
  const [location, setLocation] = useState('');
  const [freeformText, setFreeformText] = useState('');
  const [selectedInformationTypes, setSelectedInformationTypes] = useState<number[]>([]);
  const [conversationId, setConversationId] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const token = localStorage.getItem("token");

  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    if (id!='') 
    {
      console.log(id);
      // Fetch existing messages for the conversation
      fetch(`https://localhost:7129/Ai/GetConversationById/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        setMessages([...data]);
        setConversationId(id);
      })
      .catch(error => console.error('Error fetching messages:', error));
    }
  }, [id]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllSelected(!allSelected);
    setSelectedInformationTypes(!allSelected ? [0, 1, 2, 3, 4, 5, 6] : []);
  };

  const handleInformationTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedInformationTypes([...selectedInformationTypes, value]);
    } else {
      setSelectedInformationTypes(selectedInformationTypes.filter(type => type !== value));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody: {
      location? : string;
      freeformText?: string;
      informationTypes?: number[];
      conversationId?: string;
    } = {}

    if (location) requestBody.location = location;
    if (freeformText) requestBody.freeformText = freeformText;
    if (selectedInformationTypes.length > 0) requestBody.informationTypes = selectedInformationTypes;
    if (conversationId) requestBody.conversationId = conversationId;

    console.log(requestBody);

    var content = "";
      if (location) content += location + " ";
      if (freeformText) content += freeformText + " ";
      selectedInformationTypes.forEach(element => {
        switch (element) {
          case 0:
            content += "Fun Facts, ";
            break;
          case 1:
            content += "History, ";
            break;
          case 2:
            content += "Local Customs And Traditions, ";
            break;
          case 3:
            content += "Hidden Gems, ";
            break;
          case 4:
            content += "Cultural Facts and Significance, ";
            break;
          case 5:
            content += "Current Owner, ";
            break;
          case 6:
            content += "Previous Owner/s. ";
            break;
        }
      });
    setMessages([...messages, { role: "user", messageValue: content }]);
      
    // Send the request to the API
    try {
      
      const response = await fetch('https://localhost:7129/Ai/GetInformationAboutLocation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log(requestBody);
      console.log(response);

      const data = await response.json();
      console.log(data.response);
      setConversationId(data.conversationId);
      setMessages([
        ...messages,
        { role: "user", messageValue: content },
        { role: "assistant", messageValue: data.response },
      ]);
      // Update UI with the response
    } catch (error) {
      console.error('Error:', error);
    }

    // Clear input fields
    setLocation('');
    setFreeformText('');
    setSelectedInformationTypes([]);
  };

    // ... rest of the component, including input fields and UI
    return (
      <div>
              <div className="chat-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.role === "user" ? "chat chat-start" : "chat chat-end"
            }`}
          >
            <div className="chat-bubble">
              {message.role === "user" ? "You:" : "Assistant:"}{" "}
              {message.messageValue}
            </div>
          </div>
        ))}
      </div>
      <form className='form-control' onSubmit={handleSubmit}>
      {conversationId ? (
        <>
         <label className="input input-bordered flex items-center gap-2">
          Message:
          <textarea 
            className="textarea textarea-bordered"
            value={freeformText} onChange={(e) => setFreeformText(e.target.value)}
            required />
        </label>
        </>) : (<>
          
        <label className="input input-bordered flex items-center gap-2">
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>   
  
        <label className="input input-bordered flex items-center gap-2">
          Other Information (Optional):
          <textarea className="textarea textarea-bordered" value={freeformText} onChange={(e) => setFreeformText(e.target.value)} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Information Types:
          <label className="label cursor-pointer">
            <span className="label-text"> Check All</span>
            <input type="checkbox" className="checkbox" checked={allSelected} onChange={handleSelectAll}/>
          </label>
          <br />
          <label className="label cursor-pointer">
          <span className="label-text"> Fun Fact</span>
          <input type="checkbox" value="0" checked={selectedInformationTypes.includes(0)} onChange={handleInformationTypeChange} /> 
          </label>
          <label className="label cursor-pointer">
          <span className="label-text"> History</span>
          <input type="checkbox" value="1" checked={selectedInformationTypes.includes(1)} onChange={handleInformationTypeChange} /> 
          </label> 
          <label className="label cursor-pointer">
          <span className="label-text"> Local Customs And Traditions</span>
          <input type="checkbox" value="1" checked={selectedInformationTypes.includes(2)} onChange={handleInformationTypeChange} /> 
          </label> 
          <label className="label cursor-pointer">
          <span className="label-text">Hidden Gems</span>
          <input type="checkbox" value="1" checked={selectedInformationTypes.includes(3)} onChange={handleInformationTypeChange} />
          </label> 
          <label className="label cursor-pointer">
          <span className="label-text"> Cultural Facts And Significance</span>
          <input type="checkbox" value="1" checked={selectedInformationTypes.includes(4)} onChange={handleInformationTypeChange} /> 
          </label> 
          <label className="label cursor-pointer">
          <span className="label-text"> Current Owner</span>
          <input type="checkbox" value="1" checked={selectedInformationTypes.includes(5)} onChange={handleInformationTypeChange} /> 
          </label> 
          <label className="label cursor-pointer">
          <span className="label-text"> Previous Owner/s</span>
          <input type="checkbox" value="1" checked={selectedInformationTypes.includes(6)} onChange={handleInformationTypeChange} /> 
          </label>
        </label>
       
        </> 
        )}
         <button className='btn btn-primary' type="submit">Send</button>
       </form>
      </div>
      
    );
}

export default ChatForm;
