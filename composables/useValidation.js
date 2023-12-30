


export const useValidation = () => {

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    
    const useRequired = ({ fieldname, field, error }) => {
        error = field ? "" : `The ${fieldname} field is required`;
        return error
    }
    const useValidateEmail = ({ email, error}) => {
        error = email? !email.match(emailRegex)
        ? "Please provide a valid email"
        : "" : "The email field is required";
        return error
    }
    const useValidatePhoneNumber = ({phoneNumber, error }) => {
        error= phoneNumber
        ? !phoneNumber.match(phoneNumberRegex)
        ? "Please provide a valid phone number"
        : "" : "The phone number field is required";
        return error
    }
    const useValidateTextArea = ({  field, error }) => {
        error = field ? field.length > 250
        ? "Please enter between 10 and 250 characters"
            : "" : "Please add a note";
        return error
    }
    const useValidatePassword = ({ password, error }) => {
        error = ''
        if (!(password.length >= 8 && password.length <= 12)) {
            error = 'Password must contains 8 to 12 characters';
        }  
        if (!/[A-Z]/.test(password)) {
            error += ' Password must includes Uppercase letters (A-Z)';}  
        if (!/[a-z]/.test(password)) {
            error += ' Password must includes lowercase letters (a-z)';}  
        if (!/\d/.test(password)) {
            error += ' Password must contains Numbers (0-9)';}  
        if (!/[!@#$%^&]/.test(password)) {
            error += ' Password must contains special characters (@#$%^&)';}       

        return error
    }

    return {
        useValidateEmail,
        useRequired,
        useValidatePhoneNumber,
        useValidateTextArea,
        useValidatePassword
    }
}