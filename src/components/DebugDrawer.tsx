import { Offcanvas } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useChat } from '../hooks/use-chat';

interface DebugDrawerProps {
  show: boolean;
  onHide: () => void;
}

const DebugDrawer: React.FC<DebugDrawerProps> = ({ show, onHide }) => {
  const { messages } = useChat();
  const [currentLog, setCurrentLog] = useState<string>('');

  useEffect(() => {
    const log = messages.map((message) => {
      return `${message.username}: ${message.text}`;
    });
    setCurrentLog(log.join('\n'));
  }, [messages]);

  return (
    <Offcanvas show={show} onHide={onHide} className="bg-slate-900" style={{backgroundColor:"#111729"}}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className='text-white'>Console Log</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p className='text-white'>{currentLog}</p>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default DebugDrawer;
