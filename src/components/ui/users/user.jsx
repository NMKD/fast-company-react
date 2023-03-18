import React, { useState } from "react";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Edit from "./edit";
import Card from "./card";
import QualitieList from "./qualities/qualitieList";
import CompletedMeetings from "./completedMeetings";
import Comments from "../comments/comments";
import { useUserContext } from "../../../hooks/useUsers";
import { useProfessionContext } from "../../../hooks/useProfession";
import { useQualitiesContext } from "../../../hooks/useQualities";
import CommentsProvider from "../../../hooks/useComment";
// import useForm from "../../../hooks/useForm";

const User = ({ userId }) => {
    const { edit } = useParams();
    const { getUser } = useUserContext();
    const { professions } = useProfessionContext();
    const { qualities } = useQualitiesContext();
    const user = getUser(userId);
    const fromUser =
        user !== null ? { ...user, profession: user.profession.name } : {};
    const [form, setForm] = useState(fromUser);

    const history = useHistory();

    const radioOptions = [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" },
        { name: "Other", value: "other" }
    ];

    const getProfession = (name) => {
        const i = professions.findIndex(
            (prof) => prof.name.toLowerCase() === name.toLowerCase()
        );
        return professions[i];
    };

    const getQualities = (qualities) => {
        const arrayQualities = [];
        form.qualities.forEach((item) =>
            Object.keys(qualities).forEach((opt) => {
                if (qualities[opt]._id === item.value) {
                    arrayQualities.push(qualities[opt]);
                }
            })
        );
        return arrayQualities;
    };

    const verificationProf = (name) => {
        if (typeof name === "object") {
            return name;
        }
        return getProfession(name);
    };

    const verificationQual = (qualities) => {
        if (user.qualities.filter((item) => item._id)) {
            return user.qualities;
        }
        return getQualities(qualities);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.users
            .update(user._id, {
                ...form,
                profession: verificationProf(user.profession),
                qualities: verificationQual(qualities)
            })
            .then((data) => setForm(data))
            .then(() => history.push(`/users/${user._id}`));
    };

    const handleChange = (target) => {
        setForm((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const { url } = useRouteMatch();

    if (!user) {
        return (
            <div className="container">
                <div className="row">
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <>
                        {edit === "edit" ? (
                            <Edit
                                onSubmit={handleSubmit}
                                onChange={handleChange}
                                {...{
                                    radioOptions,
                                    professions,
                                    qualities,
                                    user: fromUser
                                }}
                            />
                        ) : (
                            <>
                                <div className="col-12 col-md-4 col-lg-4">
                                    <Card user={user} pathName={url} />
                                    <div className="card mb-3">
                                        <div className="card-body d-flex flex-column justify-content-center text-center">
                                            <h6 className="card-title">
                                                <span>Qualities</span>
                                            </h6>
                                            <QualitieList
                                                qualities={fromUser.qualities}
                                            />
                                        </div>
                                    </div>
                                    <CompletedMeetings
                                        completedMeetings={
                                            fromUser.completedMeetings
                                        }
                                    />
                                </div>
                                <div className="col-12 col-md-8 col-lg-8">
                                    <CommentsProvider>
                                        <Comments {...{ userId }} />
                                    </CommentsProvider>
                                </div>
                            </>
                        )}
                    </>
                </div>
            </div>
        </>
    );
};

User.propTypes = {
    userId: PropTypes.string.isRequired
};

export default User;
