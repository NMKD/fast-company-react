import React, { useState } from "react";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Edit from "./edit";
import Card from "./card";
import QualitieList from "./qualities/qualitieList";
import CompletedMeetings from "./completedMeetings";
import Comments from "../comments/comments";
import { useUserContext } from "../../../hooks/useUsers";
import { useProfessionContext } from "../../../hooks/useProfession";
import { useQualitiesContext } from "../../../hooks/useQualities";
import CommentsProvider from "../../../hooks/useComment";
import { useAuthContext } from "../../../hooks/useAuth";

const User = ({ userId }) => {
    const { edit } = useParams();
    const { getUser } = useUserContext();
    const { updateCurrentUser, stateUserCurrent } = useAuthContext();
    const { professions } = useProfessionContext();
    const { stateQualities } = useQualitiesContext();
    const qualitiesList = stateQualities.map((item) => ({
        label: item.name,
        value: item._id
    }));
    const user = getUser(userId);
    const [form, setForm] = useState({
        ...stateUserCurrent
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateCurrentUser({
            ...form,
            qualities:
                form.qualities.map((item) => item.value) || form.qualities,
            profession: getProfession(user.profession) || form.profession
        });
        history.push(`/users/${user._id}`);
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
                                    qualities: qualitiesList,
                                    user: form
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
                                                qualities={
                                                    stateUserCurrent.qualities
                                                }
                                            />
                                        </div>
                                    </div>
                                    <CompletedMeetings
                                        completedMeetings={
                                            stateUserCurrent.completedMeetings
                                        }
                                    />
                                </div>
                                <div className="col-12 col-md-8 col-lg-8">
                                    <CommentsProvider>
                                        <Comments {...{ paramId: userId }} />
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
