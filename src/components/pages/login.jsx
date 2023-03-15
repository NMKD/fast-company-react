import React from "react";
import { useParams, Link } from "react-router-dom";
import SignUpForm from "../ui/form/signUpForm";
import SignInForm from "../ui/form/signInForm";

const Login = () => {
    const { type } = useParams();

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col col-md-6 col-lg-6 offset-md-3 offset-lg-3 shadow p-5">
                        {type === "signup" ? (
                            <>
                                <h3 className="text-center">Sign up</h3>
                                <SignUpForm />
                                <p>
                                    Already have account?{" "}
                                    <Link to={"/login/signin"}>Sign in</Link>
                                </p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-center">Sign in</h3>
                                <SignInForm />
                                <p>
                                    Dont have account?{" "}
                                    <Link to={"/login/signup"}>Sign up</Link>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
