import { Offcanvas } from 'react-bootstrap';
import { useChat } from '../hooks/use-chat';

interface DebugDrawerProps {
    show: boolean;
    onHide: () => void;
}



const DebugDrawer: React.FC<DebugDrawerProps> = ({ show, onHide }) => {
    const { currentLog } = useChat();
    if (currentLog) {console.log(currentLog)}
    const log = ["Log 1", "Log 2", "Log 3"]; // Replace with your console log

    return (
        <Offcanvas show={show} onHide={onHide} className="bg-slate-900">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='text-white'>Console Log</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {log.map((message, index) => (
                    <p className='text-white' key={index}>{message}</p>
                ))}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default DebugDrawer;
