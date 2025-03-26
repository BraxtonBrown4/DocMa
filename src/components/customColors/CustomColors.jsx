import "./CustomColors.css"
import { useState } from "react";

export const CustomColors = ({setMenuOpen}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button className="modal-btn" onClick={() => {setIsOpen(true), setMenuOpen(false)}}>Custom Colors</button>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Modal Title</h2>
                        <p>This is a modal content.</p>
                        <button onClick={() => setIsOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};