import { Dropdown } from "react-bootstrap"
import "./OptionsDropdown.css"

export const OptionsDropdown = () => {

    return (
        <div className="dropdown-container">
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className="">
                    &#8942;
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>Edit</Dropdown.Item>
                    {/* add functionality */}
                    <Dropdown.Item>Delete</Dropdown.Item>
                    {/* add functionality */}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}