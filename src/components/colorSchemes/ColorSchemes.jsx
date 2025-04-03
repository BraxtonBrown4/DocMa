import { SketchPicker } from "react-color";
import { useContext, useEffect, useState } from "react";
import "./ColorSchemes.css"
import { UserContext } from "../../customReact/contexts/UserContext";
import { createColorScheme, getColorSchemesByUserId, updateColorScheme } from "../../services/colorSchemeService";
import { useColorSchemes } from "../../customReact/hooks/colorSchemes/useColorSchemes";
import { Dropdown } from "react-bootstrap";

export const ColorSchemes = ({ setMenuOpen }) => {
    const { userId } = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);
    const [location, setLocation] = useState('home');
    const [schemes, setSchemes] = useState([])
    const [color, setColor] = useState("ffffff");
    const [colorScheme, setColorScheme, defaultColors] = useColorSchemes()
    const [CSCopy, setCSCopy] = useState({})
    const [selectedElement, setSelectedElement] = useState('')
    const [placeholder, setPlaceHolder] = useState('Elements')

    useEffect(() => {
        if (userId > 0) {
            getColorSchemesByUserId(userId).then((res) => {
                setSchemes(res)
            })
        }
    }, [userId, colorScheme])

    const updateColor = (newColor) => {
        document.documentElement.style.setProperty(selectedElement, newColor.hex)
        setColor(newColor.hex)

        const copy = { ...CSCopy }

        copy[selectedElement] = newColor.hex

        setCSCopy(copy)
    }

    useEffect(() => {
        const copy = { ...colorScheme }

        copy.userId = userId

        setCSCopy(copy)
    }, [colorScheme])

    const handleSubmit = (e) => {
        e.preventDefault()

        const copy = { ...CSCopy }
        
        delete copy.id

        createColorScheme(copy).then((res) => {
            setColorScheme(res)
            resetToHome()
        })
    }

    const resetToHome = () => {

        Object.entries(colorScheme).forEach(([key, value]) => {
            if (key !== "id" && key !== "userId" && key !== "name") {
                document.documentElement.style.setProperty(key, value);
            }
        })

        setColor("ffffff")
        setSelectedElement('')
        setPlaceHolder('Elements')
        setLocation('home')
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        updateColorScheme(CSCopy).then((res) => {
            setColorScheme(res)
            resetToHome()
        })
    }

    return (
        <div>
            <button className="modal-btn" onClick={() => { setIsOpen(true), setMenuOpen(false) }}>Color Schemes</button>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <header className="colors-header">
                            <h1></h1>
                            <h2>{location === 'home' ? "Color Schemes" : "Custom Colors Menu"}</h2>
                            <button className="bi bi-x-circle close-btn" onClick={() => setIsOpen(false)}></button>
                        </header>

                        <div className={`location-container ${location !== 'home' && 'reverse'}`}>

                            {
                                location === 'home' &&
                                <>
                                    <button className="bi bi-plus-square new-btn" onClick={() => { setLocation('newColorScheme') }}></button>

                                    <div className="color-schemes">

                                        <div className="color-scheme">
                                            <button className="default-scheme" onClick={() => { setColorScheme(defaultColors) }}>Default</button>
                                        </div>

                                        {
                                            schemes.map(scheme => {
                                                return <div key={scheme.id} className="color-scheme">
                                                    <div className="dropdown-container">
                                                        <Dropdown>
                                                            <Dropdown.Toggle id="dropdown-basic">
                                                                &#8942;
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => { setLocation('edit'), setColorScheme(scheme) }}>Edit</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
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
                                    <form className="new-scheme-menu" onSubmit={handleSubmit}>
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown-basic">
                                                {placeholder}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {
                                                    Object.entries(colorScheme).map(([key]) => {
                                                        if (key !== "id" && key !== "userId" && key !== "name") {
                                                            return <Dropdown.Item key={key} id={key} onClick={() => { setSelectedElement(key), setPlaceHolder(key.split('-').join(' ') + " color") }}>{key.split('-').join(' ') + " color"}</Dropdown.Item>

                                                        }
                                                    })
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <input type="text" placeholder="Name" maxLength="10" onChange={(e) => {
                                            const copy = { ...CSCopy }
                                            copy.name = e.target.value
                                            setCSCopy(copy)
                                        }} required />

                                        <div className="submit-cancle-container">
                                            <button type="submit">Save</button>
                                            <button onClick={resetToHome}>Cancel</button>
                                        </div>
                                    </form>

                                    <SketchPicker color={color} onChange={updateColor} presetColors={[]} disableAlpha />
                                </>
                            }

                            {
                                location === 'edit' &&
                                <>
                                    <form className="new-scheme-menu" onSubmit={handleUpdate}>
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown-basic">
                                                {placeholder}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {
                                                    Object.entries(colorScheme).map(([key]) => {
                                                        if (key !== "id" && key !== "userId" && key !== "name") {
                                                            return <Dropdown.Item key={key} id={key} onClick={() => { setSelectedElement(key), setPlaceHolder(key.split('-').join(' ') + " color") }}>{key.split('-').join(' ') + " color"}</Dropdown.Item>

                                                        }
                                                    })
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <input type="text" value={CSCopy.name} maxLength="10" onChange={(e) => {
                                            const copy = { ...CSCopy }
                                            copy.name = e.target.value
                                            setCSCopy(copy)
                                        }} required />

                                        <div className="submit-cancle-container">
                                            <button type="submit">Save</button>
                                            <button onClick={resetToHome}>Cancel</button>
                                        </div>
                                    </form>

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