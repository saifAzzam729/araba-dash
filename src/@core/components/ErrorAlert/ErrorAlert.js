import {Alert} from "@mui/material";

const ErrorAlert = ({isError, errors = {}}) => {

    if (!isError) {
        return null;
    }

    return (<>
        <Alert severity="error">
            {Object.entries(errors).map(([key, value]) => {
                return <div key={key}>
                    <span>{key}: </span>
                    <span>{value.errors}</span>
                </div>
            })}
        </Alert>
    </>);
}

export default ErrorAlert;
