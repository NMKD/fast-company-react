import React from "react";
import Users from "./components/pages/users";
import Main from "./components/pages/main";
import Login from "./components/pages/login";
import NavsBar from "./components/layouts/header/navbar/NavsBar";
import { Route, Switch } from "react-router-dom";
// import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";
import "react-toastify/dist/ReactToastify.css";
import QualitiesProvider from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
// import ProtectedRoute from "./routes/protectedRoute";

const App = () => {
    return (
        <>
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
        </>
    );
};

export default App;
