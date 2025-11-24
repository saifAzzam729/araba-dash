import React from 'react'
import {useSkin} from "@hooks/useSkin";
import {Button} from "reactstrap";
// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/error.svg";
import illustrationsDark from "@src/assets/images/pages/error-dark.svg";
import {Link} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";

function LoginErrorPage() {
    const {skin} = useSkin();

    const source = skin === "dark" ? illustrationsDark : illustrationsLight;
    const {makeLocaleUrl} = useLocaleContext();

    return (
        <>
            <div className="pt-3 w-100 text-center h-100 flex flex-column align-items-center justify-content-center
            ">
                <h2 className="mb-1">You are not authenticated</h2>
                <p className="mb-2">
                    Please Login.
                </p>
                <Button
                    tag={Link}
                    to={makeLocaleUrl("/login")}
                    color="primary"
                    className="btn-sm-block mb-2"
                >
                    Login Page
                </Button>
                <br/>
                <img src={source} alt="Not authorized page" height={'300px'}/>
            </div>
        </>
    )
}

export default LoginErrorPage
