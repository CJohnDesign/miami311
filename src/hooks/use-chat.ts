import { fetchEventSource } from "@fortaine/fetch-event-source";
import { useState, useMemo } from "react";
import { appConfig } from "../../config.browser";
import axios from "axios";

const API_SUBMIT = "http://ec2-3-138-136-102.us-east-2.compute.amazonaws.com:5555/api/ask"

const API_POLL = "http://ec2-3-138-136-102.us-east-2.compute.amazonaws.com:5555/api/poll"

const API_PATH = "/api/chat";
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * A custom hook to handle the chat state and logic
 */
export function useChat() {
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [sessionID, setSessionID] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [state, setState] = useState<"idle" | "waiting" | "loading">("idle");

  // Lets us cancel the stream
  const abortController = useMemo(() => new AbortController(), []);

  /**
   * Cancels the current chat and adds the current chat to the history
   */
  function cancel() {
    setState("idle");
    abortController.abort();
    if (currentChat) {
      const newHistory = [
        ...chatHistory,
        { role: "user", content: currentChat } as const,
      ];

      setChatHistory(newHistory);
      setCurrentChat("");
    }
  }

  /**
   * Clears the chat history
   */

  function clear() {
    console.log("clear");
    setChatHistory([]);
  }

  /**
   * Sends a new message to the AI function and streams the response
   */
  const sendMessage = async (message: string, chatHistory: Array<ChatMessage>) => {
    setState("waiting");

    const result = await axios.post(API_SUBMIT, { 
      question:message
    });

    if (result.data.session_id === null) {
      setCurrentChat("Zoinks, the back end is having trouble, please wait a minute ...");
      return;
    }
    const session_id: string = result.data.session_id;

    let chatContent = "";
    const newHistory = [
      ...chatHistory,
      { role: "user", content: message } as const,
    ];

    setChatHistory(newHistory);
    const body = JSON.stringify({
      // Only send the most recent messages. This is also
      // done in the serverless function, but we do it here
      // to avoid sending too much data
      messages: newHistory.slice(-appConfig.historyLength),
    });

    setCurrentChat("...");

    let history = [];
    let tmp_poll_url = new URL(API_POLL);
    tmp_poll_url.searchParams.set("session_id", session_id)
    const poll_url: string = tmp_poll_url.toString()
    let poll_result;
    let exit = false;
    for (let i = 0; i<30; i++) {

      // get result and update history when necessary
      poll_result = await axios.get(poll_url.toString());
      let poll_result_data = poll_result.data
      if (poll_result_data.process.length > history.length) {
        history = poll_result_data.process
      }

      // compile history into an AI chat message
      let result_message = "";
      history.forEach(element => {
        if (element.command) {
          if (element.command === "print_answer") {
            exit = true
          }
          if (element.arguments.input) {
            result_message += `Running internal command ${element.command}`
          } else if (element.arguments.url) {
            result_message += `Running internal command ${element.command} querying with website ${element.arguments.url}`
          }
        }
      });
      setCurrentChat(result_message);

      if (exit) {
        break
      }

      // wait a sec before polling again
      await new Promise(resolve => setTimeout(resolve, 1000));  
    }

    // This is like an EventSource, but allows things like
    // POST requests and headers
    fetchEventSource(API_PATH, {
      body,
      method: "POST",
      signal: abortController.signal,
      onclose: () => {
        setState("idle");
      },
      onmessage: (event) => {
        switch (event.event) {
          case "delta": {
            // This is a new word or chunk from the AI
            setState("loading");
            const message = JSON.parse(event.data);
            if (message?.role === "assistant") {
              chatContent = "";
              return;
            }
            if (message.content) {
              chatContent += message.content;
              setCurrentChat(chatContent);
            }
            break;
          }
          case "open": {
            // The stream has opened and we should recieve
            // a delta event soon. This is normally almost instant.
            setCurrentChat("...");
            break;
          }
          case "done": {
            // When it's done, we add the message to the history
            // and reset the current chat
            setChatHistory((curr) => [
              ...curr,
              { role: "assistant", content: chatContent } as const,
            ]);
            setCurrentChat(null);
            setState("idle");
          }
          default:
            break;
        }
      },
    });
  };

  return { sendMessage, currentChat, chatHistory, cancel, clear, state };
}
