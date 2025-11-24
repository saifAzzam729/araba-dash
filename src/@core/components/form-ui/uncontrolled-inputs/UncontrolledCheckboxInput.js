const UncontrolledCheckboxInput = ({label, register, errorMessage, name}) => {
    return (
        <>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={`input-${name}`}
                    {...register(name)}
                />
                <label className="form-check-label" htmlFor={`input-${name}`}>
                    {label}
                </label>
            </div>
            {errorMessage &&
                <p className="text-danger">
                    {errorMessage}
                </p>
            }
        </>
    )
}

export default UncontrolledCheckboxInput;