//import { TokenResponse } from "../types";

export const login = async (email: string, password: string): Promise<string | null> => {
    try {
      const response = await fetch('https://localhost:7129/identity/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data: string = await response.text();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };