import { SketchPicker } from "react-color";
import "./CustomColors.css"
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

export const CustomColors = ({ setMenuOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [location, setLocation] = useState('home');
    const [color, setColor] = useState("ffffff");

    const updateColor = (newColor) => {
        setColor(newColor.hex)
    }

    return (
        <div>
            <button className="modal-btn" onClick={() => { setIsOpen(true), setMenuOpen(false) }}>Custom Colors</button>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <header className="colors-header">
                            <h2>{location === 'home' ? "Color Schemes" : "Custom Colors Menu"}</h2>
                            <button className="bi bi-x-circle close-btn" onClick={() => setIsOpen(false)} disabled></button>
                        </header>

                        <div className="location-container">

                            {
                                location === 'home' &&
                                <>
                                    <button className="bi bi-plus-square new-btn" onClick={() => { setLocation('newColorScheme') }}></button>

                                    <div className="color-schemes">
                                        <div className="color-scheme">
                                            
                                        </div>
                                        {/* insert color schemes .map here... with component? */}
                                    </div>
                                </>
                            }

                            {
                                location === 'newColorScheme' &&
                                <>
                                    <div className="custom-color-menu">

                                    </div>

                                    <SketchPicker color={color} onChange={updateColor} presetColors={[]} disableAlpha />
                                </>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

{/*
                        <div className="custom-color-menu">

                        </div>

                        <SketchPicker color={color} onChange={updateColor} presetColors={[]} disableAlpha /> */}