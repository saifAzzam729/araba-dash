const UncontrolledTextInput = ({label, placeholder = '', register, errorMessage, name}) => {
    return (
        <>
            <label htmlFor={`input-${name}`} className="form-label">
                {label}
            </label>
            <input
                className="form-control"
                id={`input-${name}`}
                {...register(name, { min: 1, max: 5, validate: value => value >= 1 && value <= 5 // Custom validation function
                })}
                type="number"
                placeholder={placeholder}
                onKeyDown={e => {
                    // Prevent typing characters other than digits
                    if (!((e.key >= '0' && e.key <= '9') || e.key === 'Backspace' || e.key === 'Delete')) {
                        e.preventDefault();
                    }
                }}
            />
            <p className="text-danger">
                {errorMessage}
            </p>
        </>
    )
}

export default UncontrolledTextInput;
