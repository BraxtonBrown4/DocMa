import { Dropdown } from "react-bootstrap"
import "./OptionsDropdown.css"

export const OptionsDropdown = ({setLocation}) => {

    return (
        <div className="dropdown-container">
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className="">
                    &#8942;
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {setLocation('edit')}}>Edit</Dropdown.Item>
                    {/* add functionality */}
                    <Dropdown.Item>Delete</Dropdown.Item>
                    {/* add functionality */}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}