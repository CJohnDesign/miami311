import { useState, useMemo, useEffect, useRef } from "react";
import { App } from "../App";
import { useChat } from "../hooks/use-chat";
import { ChatMessage } from "../components/ChatMessage";
import { appConfig } from "../../config.browser";
import { Welcome } from "../components/Welcome";
import { IconButton, makeStyles } from '@material-ui/core';
import { Code } from '@material-ui/icons';
import DebugDrawer from '../components/DebugDrawer';

const useStyles = makeStyles({
  whiteIcon: {
    color: 'white',
  },
  topRight: {
    position: 'absolute',
    top: 0,
    right: 0,
  }
});

export default function Index() {
  const classes = useStyles();

  // The content of the box where the user is typing
  const [message, setMessage] = useState<string>("");

  // This hook is responsible for managing the chat and communicating with the
  // backend
  const { currentChat, chatHistory, sendMessage, cancel, state, clear } =
    useChat();

  // This is the message that is currently being generated by the AI
  const currentMessage = useMemo(() => {
    return { content: currentChat ?? "", role: "assistant" } as const;
  }, [currentChat]);

  // This is a ref to the bottom of the chat history. We use it to scroll
  // to the bottom when a new message is added.
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [currentChat, chatHistory, state]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // This is a ref to the input box. We use it to focus the input box when the
  // user clicks on the "Send" button.
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, [state]);

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleCodeIconClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };



  return (
    <App title="Miami 311">

      <IconButton className={classes.topRight} onClick={handleCodeIconClick}>
        <Code className={classes.whiteIcon} />
      </IconButton>

      <main className="p-6 w-full h-full flex flex-col">
        <div className="flex items-center justify-end mb-4">
        </div>
        <section className="overflow-y-auto flex-grow mb-4 pb-8">
          <div className="flex flex-col space-y-4">
            {chatHistory.length === 0 ? (
              <>
                <Welcome />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {appConfig.samplePhrases.map((phrase) => (
                    <button
                      key={phrase}
                      onClick={() => sendMessage(phrase, chatHistory)}
                      className="text-white bg-slate-700 border-gray-600 border-2 rounded-lg p-4"
                    >
                      {phrase}
                    </button>
                  ))}
                </div>

              </>
            ) : (
              chatHistory.map((chat, i) => (
                <ChatMessage key={i} message={chat} />
              ))
            )}

            {currentChat ? <ChatMessage message={currentMessage} /> : null}
          </div>

          <div ref={bottomRef} />
        </section>
        <div className="flex items-center justify-center h-20">
          {state === "idle" ? null : (
            <button
              className="text-white bg-slate-700 border-gray-600 py-2 px-4 my-8"
              onClick={cancel}
            >
              Stop generating
            </button>
          )}
        </div>
        <section className="text-white bg-slate-700 rounded-lg p-2">
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(message, chatHistory);
              setMessage("");
            }}
          >
            {chatHistory.length > 1 ? (
              <button
                className="text-white bg-slate-800 border-gray-600 py-2 px-4 rounded"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  clear();
                  setMessage("");
                }}
              >
                Clear
              </button>
            ) : null}
            <input
              type="text"
              ref={inputRef}
              className="bg-slate-700	w-full rounded-l-lg p-2 outline-none"
              placeholder={state == "idle" ? "Type your message..." : "..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={state !== "idle"}
            />
            {state === "idle" ? (
              <button
                className="bg-pink-600 text-white font-bold py-2 px-4 rounded-lg"
                type="submit"
              >
                Send
              </button>
            ) : null}
          </form>
        </section>
        <DebugDrawer open={drawerOpen} onClose={handleDrawerClose} logMessage="Hello world!" classes={{ paper: "bg-slate-900" }} />
      </main>
    </App>
  );
}
