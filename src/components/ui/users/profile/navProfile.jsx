import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuth";

const NavProfile = () => {
    const history = useHistory();
    const { stateUserCurrent, onSignOut } = useAuthContext();
    const [isOpen, setOpen] = useState(false);
    const toogleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    const handleSignOut = () => {
        onSignOut();
        history.push("/");
    };

    return (
        <div className="dropdown" onClick={toogleMenu}>
            <div className="btn dropdown-toogle d-flex align-items-center">
                <div className="me-2">
                    Пользователь: {stateUserCurrent.name}
                </div>

                <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`}
                    alt="avatar"
                    height="40px"
                    className="img-resposive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu " + (isOpen ? "show" : "")}>
                <Link
                    to={`/users/${stateUserCurrent._id}`}
                    className="p-3 dropdown-item"
                >
                    Мой профиль
                </Link>
                <div className="p-3 dropdown-item" onClick={handleSignOut}>
                    Sign Out
                </div>
            </div>
        </div>
    );
};

export default NavProfile;
