const Form = (props) => {
    const {
        onSubmit,
        buttonText,
        name,
        title,
        isValid,
        children,

    } = props;

    return (
        <form
            onSubmit={onSubmit}
            className={`form ${name}-form`}
            name={`${name}-form`}
            noValidate
        >
            <h2 className={`${name === 'sign' ? 'sign-form__title' : 'form__title'}`}>{ title }</h2>
            { children }
            <button
                className={`${name === 'sign' ? 'sign-form__submit' : 'form__submit'}`}
                type="submit"
                disabled={!isValid}
            >
                { buttonText }
            </button>
        </form>
    )
}

export default Form;