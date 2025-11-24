const UncontrolledTextAreaInput = ({label, placeholder = '', register, errorMessage, name}) => {
    return (
        <>
            <label htmlFor={`input-${name}`} className="form-label">
                {label}
            </label>
            <textarea
                className="form-control"
                id={`input-${name}`}
                rows="3"
                {...register(name)}
                placeholder={placeholder}
            ></textarea>
            <p className="text-danger">
                {errorMessage}
            </p>
        </>
    )
}

export default UncontrolledTextAreaInput;