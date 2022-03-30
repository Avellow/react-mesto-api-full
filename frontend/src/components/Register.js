import {Link} from "react-router-dom";
import Form from "./Form";
import Input from "./Input";
import {useFormAndValidation} from "../hooks/useFormAndValidation";


function Register(props) {

    const { onSubmit } = props;

    const {
        values,
        handleChange
    } = useFormAndValidation();

    const SIGN_UP_EMAIL = 'sign-up-email';
    const SIGN_UP_PASSWORD = 'sign-up-password';

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(values[SIGN_UP_EMAIL], values[SIGN_UP_PASSWORD]);
    }

    return (
        <>
            <Form
                onSubmit={handleSubmit}
                name='sign'
                title='Регистрация'
                isValid={true}
                buttonText='Зарегистрироваться'
            >
                <Input
                    values={values}
                    onChange={handleChange}
                    name={SIGN_UP_EMAIL}
                    type='email'
                    placeHolder='Email'
                    required={true}
                    formName='sign-form'
                />
                <Input
                    values={values}
                    onChange={handleChange}
                    name={SIGN_UP_PASSWORD}
                    type='password'
                    placeHolder='Пароль'
                    required={true}
                    formName='sign-form'
                />
            </Form>
            <p className="sign-form__subtitle">Уже зарегистрированы?
                <Link className="sign-form__link" to='/sign-in'> Войти</Link></p>
        </>
    )

}

export default Register;