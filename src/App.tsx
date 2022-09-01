import { useState } from "react";

import { Calendar } from "./components/calendar/Calendar";
import { CalendarIcon } from "./components/icons";
import "./styles/global.css";
import "./@fake-db";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-[#273655] min-h-screen flex items-center justify-center">
      <button
        className="flex items-center text-white text-lg cursor-pointer"
        onClick={onOpen}
      >
        <CalendarIcon />
        <span className="text-xl pl-2">Open Calendar Modal</span>
      </button>
      <Calendar isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default App;
