const UncontrolledEmailInput = ({label, placeholder = '', register, errorMessage, name}) => {
    return (
        <>
            <label htmlFor={`input-${name}`} className="form-label">
                {label}
            </label>
            <input
                className="form-control"
                id={`input-${name}`}
                {...register(name)}
                type="email"
                placeholder={placeholder}
            />
            <p className="text-danger">
                {errorMessage}
            </p>
        </>
    )
}

export default UncontrolledEmailInput;