import Form from "./Form";
import Input from "./Input";
import {useFormAndValidation} from "../hooks/useFormAndValidation";

function Login(props) {

    const { onSubmit } = props;

    const {
        values,
        handleChange
    } = useFormAndValidation();

    const SIGN_IN_EMAIL = 'sign-in-email';
    const SIGN_IN_PASSWORD = 'sign-in-password';

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(values[SIGN_IN_EMAIL], values[SIGN_IN_PASSWORD]);
    }

    return (
        <Form
            onSubmit={handleSubmit}
            name='sign'
            title='Вход'
            isValid={true}
            buttonText='Войти'
        >
            <Input
                values={values}
                onChange={handleChange}
                name={SIGN_IN_EMAIL}
                type='email'
                placeHolder='Email'
                required={true}
                formName='sign-form'
            />
            <Input
                values={values}
                onChange={handleChange}
                name={SIGN_IN_PASSWORD}
                type='password'
                placeHolder='Пароль'
                required={true}
                formName='sign-form'
            />
        </Form>
    )
}

export default Login;