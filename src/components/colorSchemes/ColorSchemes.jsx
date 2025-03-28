import { SketchPicker } from "react-color";
import { useContext, useEffect, useState } from "react";
import { OptionsDropdown } from "./optionsDropdown/OptionsDropdown";
import "./ColorSchemes.css"
import { UserContext } from "../../customReact/contexts/UserContext";
import { getColorSchemesByUserId } from "../../services/colorSchemeService";
import { useColorSchemes } from "../../customReact/hooks/colorSchemes/useColorSchemes";
import { Dropdown } from "react-bootstrap";

export const ColorSchemes = ({ setMenuOpen }) => {
    const { userId } = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);
    const [location, setLocation] = useState('home');
    const [schemes, setSchemes] = useState([])
    const [defaultSchemes, setDefaultSchemes] = useState([])
    const [color, setColor] = useState("ffffff");
    const [colorScheme, setColorScheme] = useColorSchemes()
    const [CSCopy, setCSCopy] = useState({})
    const root = document.documentElement;

    useEffect(() => {
        if (userId > 0) {
            getColorSchemesByUserId(userId).then((res) => {
                setSchemes(res)
            })
        }

        getColorSchemesByUserId(0).then((res) => {
            setDefaultSchemes(res)
        })
    }, [userId])

    const updateColor = (newColor) => {
        setColor(newColor.hex)
    }

    useEffect(() => {
        setCSCopy(colorScheme)
    }, [colorScheme])

    return (
        <div>
            <button className="modal-btn" onClick={() => { setIsOpen(true), setMenuOpen(false) }}>Color Schemes</button>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <header className="colors-header">
                            <h2>{location === 'home' ? "Color Schemes" : "Custom Colors Menu"}</h2>
                            <button className="bi bi-x-circle close-btn" onClick={() => setIsOpen(false)}></button>
                        </header>

                        <div className="location-container">

                            {
                                location === 'home' &&
                                <>
                                    <button className="bi bi-plus-square new-btn" onClick={() => { setLocation('newColorScheme') }}></button>

                                    <div className="color-schemes">

                                        {
                                            defaultSchemes.map(scheme => {
                                                return <div key={scheme.id} className="color-scheme">
                                                    <button className="default-scheme" onClick={() => { setColorScheme(scheme) }}>{scheme.name}</button>
                                                </div>
                                            })
                                        }
                                        {
                                            schemes.map(scheme => {
                                                return <div key={scheme.id} className="color-scheme">
                                                    <OptionsDropdown setLocation={setLocation} />
                                                    <button className="default-scheme" onClick={() => { setColorScheme(scheme) }}>{scheme.name}</button>
                                                </div>
                                            })
                                        }
                                    </div>
                                </>
                            }

                            {
                                location === 'newColorScheme' &&
                                <>
                                    <div className="new-scheme-menu">
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown-basic">
                                                Elements
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="custom-menu">
                                                {
                                                    Object.entries(colorScheme).map(([key, value]) => {
                                                        if (key !== "id" && key !== "userId" && key !== "name") {
                                                            return <Dropdown.Item key={key} id={key} onClick={() => { console.log(key) }}>{ key.split('-').join(' ') + " color"}</Dropdown.Item>

                                                        }
                                                    })
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <div className="btns-container">
                                            <button>Save</button>
                                            <button onClick={() => {setLocation('home')}}>Cancel</button>
                                        </div>
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