import React from "react";
import PropTypes from "prop-types";
import Table from "./table";
import BookMark from "./bookmark/bookmark";
import QualitieList from "../users/qualities/qualitieList";
import Profession from "../../ui/users/professions/profession";
import { Link } from "react-router-dom";

const TableList = ({ users, onToogle, currentSort, onSort }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualitieList qualities={user.qualities} />
        },
        profession: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    {...{ toogle: onToogle }}
                    status={user.bookmark}
                    id={user._id}
                />
            )
        }
    };
    return (
        <>
            <Table {...{ currentSort, onSort, columns, data: users }} />
        </>
    );
};

TableList.propTypes = {
    users: PropTypes.array.isRequired,
    onToogle: PropTypes.func,
    currentSort: PropTypes.object,
    onSort: PropTypes.func
};

export default TableList;
