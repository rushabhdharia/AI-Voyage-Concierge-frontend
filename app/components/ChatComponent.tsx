import { useState, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  messageValue: string;
}

function ChatComponent({ id }: { id: string }) {
  const [locationsInput, setLocations] = useState<string>("");
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [freeformText, setFreeformText] = useState<string>("");
  const [conversationId, setConversationId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const token = localStorage.getItem("token");

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

  const handleSubmit = async () => {

    const locations = locationsInput
      .split(",")
      .map((location) => location.trim());
    var requestBody: {
      locations?: string[];
      numberOfDays?: number;
      freeformText?: string;
      conversationId?: string;
    } = {};

    if (locationsInput != "")
    {
      requestBody.locations = locations;
    }

    if(numberOfDays)
    {
      requestBody.numberOfDays = numberOfDays;
    }

    if (conversationId) {
      requestBody.conversationId = conversationId;
    }

    if (freeformText) {
      requestBody.freeformText = freeformText;
    }

    console.log(requestBody);

    try {
      var content = "";
      if (locations) content += locations + " ";
      if (numberOfDays) content += numberOfDays + " ";
      content += freeformText;
      setMessages([...messages, { role: "user", messageValue: content }]);
      const response = await fetch(
        "https://localhost:7129/Ai/GetTravelItinerary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
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
    } catch (error) {
      console.log(error);
      console.error("Error:", error);
    }

    setLocations("");
    setNumberOfDays(0);
    setFreeformText("");
  };

  return (
    <div>
      {messages && (
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
      </div> )}
      {conversationId ? (
        <>
          <label className="input input-bordered flex items-center gap-2">
            Message
            <textarea
              className="textarea textarea-bordered"
              placeholder="Freeform Text"
              onChange={(e) => setFreeformText(e.target.value)}
              required
            />
          </label>
        </>
      ) : (
        <>
          <label className="input input-bordered flex items-center gap-2">
            Locations
            <input
              type="text"
              placeholder="Locations (separated by commas)"
              onChange={(e) => setLocations(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Number of Days
            <input
              type="number"
              placeholder="Number of Days"
              onChange={(e) => setNumberOfDays(parseInt(e.target.value))}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Extra Considerations (Optional)
            <textarea
              className="textarea textarea-bordered"
              placeholder="Freeform Text"
              onChange={(e) => setFreeformText(e.target.value)}
            />
          </label>
        </>
      )}

      <button className="btn btn-primary" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
}

export default ChatComponent;
