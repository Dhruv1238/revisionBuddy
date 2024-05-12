import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import { ApiKeyContext } from "../context/apiKeyContext";
import { useContext } from "react";


const NavBar = () => {

    const { clearApiKey } = useContext(ApiKeyContext);

    return (
            <Dropdown className="">
                <DropdownTrigger>
                    <h1 className="text-xl text-white md:text-4xl self-start text-start cursor-pointer p-5">Revision Buddy &#x25BC;</h1>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions"
                    color="danger"
                >
                    <DropdownItem key="delete" className="text-danger" color="danger" onClick={() => {
                        clearApiKey();
                    }}>
                        Reset Api Key
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
    );
}

export default NavBar;