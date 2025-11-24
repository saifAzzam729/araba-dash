const UncontrolledTextInput = ({label, placeholder = '', register, errorMessage, name}) => {
    return (
        <>
            <label htmlFor={`input-${name}`} className="form-label">
                {label}
            </label>
            <input
                className="form-control"
                id={`input-${name}`}
                {...register(name)}
                type="text"
                placeholder={placeholder}
            />
            <p className="text-danger">
                {errorMessage}
            </p>
        </>
    )
}

export default UncontrolledTextInput;