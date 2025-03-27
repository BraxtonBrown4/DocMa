import { SketchPicker } from "react-color";
import { useState } from "react";
import { OptionsDropdown } from "./OptionsDropdown";
import "./CustomColors.css"

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
                                            <h2 onClick={() => {console.log("apply color scheme")}}>Dark Mode</h2>
                                        </div>

                                        <div className="color-scheme">
                                            <h2 onClick={() => {console.log("apply color scheme")}}>Light Mode</h2>
                                        </div>
                                        
                                        {/* insert color schemes .map here... with component? */}
                                        <div className="color-scheme">
                                            <OptionsDropdown/>
                                            <h2 onClick={() => {console.log("apply color scheme")}}>Light Mode</h2>
                                        </div>
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