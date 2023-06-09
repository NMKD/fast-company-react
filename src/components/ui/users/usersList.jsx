/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import SearchStatus from "../table/heading/searchStatus";
import Pagination from "../table/pagination/pagination";
import paginate from "../../../utils/paginate";
import GroupList from "./professions/groupList";
import TableList from "../table/tableList";
import SearchInput from "../form/fields/searchInput";
import _ from "lodash";
import { useUserContext } from "../../../hooks/useUsers";
import { useProfessionContext } from "../../../hooks/useProfession";
import {
    includesToString,
    toFilterProfession
} from "../../../utils/getFilterData";

const UsersList = () => {
    const { users, toogleBookmark } = useUserContext();
    const { professions } = useProfessionContext();

    // professions/api/filter
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({
        path: "name",
        order: "asc",
        ative: false
    });
    // Pagination/
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);

    // search users
    const [searchInput, setSearchInput] = useState("");

    const filterredUsers = searchInput
        ? includesToString(users, searchInput)
        : selectedProf
        ? toFilterProfession(users, selectedProf)
        : users;

    const count = filterredUsers.length;

    const sortedUsers = _.orderBy(
        filterredUsers,
        [sortBy.path],
        [sortBy.order]
    );

    // Pagination/ отображение пользователей / фильтр
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    // Search
    const handleChangeSearch = ({ target }) => {
        const { value } = target;
        setSearchInput(value);
        setSelectedProf();
    };

    // Pagination
    const handlePageChange = (i) => {
        setCurrentPage(i);
    };

    const handleFilterSelect = (item) => {
        setSelectedProf(item);
        setSearchInput("");
    };

    const handleClearFilterSelect = () => {
        setSelectedProf();
    };

    // Sort table
    const handleSortTable = (item) => {
        setSortBy(item);
    };

    const handleToogleBookMark = (id) => {
        toogleBookmark(id);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    if (users.length === 0) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <div className="container pt-4">
                <div className="row">
                    <div className="col col-sm-12 col-lg-2">
                        <>
                            <GroupList
                                selectedItem={selectedProf}
                                items={professions}
                                onFilter={handleFilterSelect}
                            />
                            <button
                                className="btn btn-danger mt-2 mb-2"
                                onClick={handleClearFilterSelect}
                            >
                                Очистить
                            </button>
                        </>
                    </div>
                    <div className="col col-sm-12 col-lg-8">
                        <SearchStatus length={count} />
                        <SearchInput
                            value={searchInput}
                            onChange={handleChangeSearch}
                        />
                        {count > 0 && (
                            <TableList
                                users={usersCrop}
                                onToogle={handleToogleBookMark}
                                onSort={handleSortTable}
                                currentSort={sortBy}
                            />
                        )}
                        <Pagination
                            itemsCount={count}
                            {...{ pageSize, currentPage }}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UsersList;
