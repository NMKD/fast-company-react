import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Users from "./components/pages/users";
import Main from "./components/pages/main";
import Login from "./components/pages/login";
import NavsBar from "./components/layouts/header/navbar/NavsBar";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";
import QualitiesProvider from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";

const App = () => {
    return (
        <div>
            <AuthProvider>
                <NavsBar />
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Switch>
                            <Route exact path="/" component={Main} />
                            <Route path="/login/:type" component={Login} />
                            <Route
                                path="/users/:id?/:edit?"
                                component={Users}
                            />
                        </Switch>
                    </QualitiesProvider>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
