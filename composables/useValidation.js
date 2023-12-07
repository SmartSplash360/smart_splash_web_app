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
        error = field ? field.length > 200
        ? "Please enter between 10 and 200 characters"
            : "" : "Please add a note";
        return error
    }
    const useValidatePassword = ({ password, error }) => {

        // Check if the password length is between 6 and 12 characters
        const lengthCheck = password.length >= 8 && password.length <= 12;

        // Check if the password includes at least one uppercase letter
        const uppercaseCheck = /[A-Z]/.test(password);

        // Check if the password includes at least one lowercase letter
        const lowercaseCheck = /[a-z]/.test(password);

        // Check if the password includes at least one number
        const numberCheck = /\d/.test(password);

        // Check if the password includes at least one special character
        const specialCharacterCheck = /[!@#$%^&]/.test(password);

        // Return true if all checks pass, indicating a strong password

        error = "Please ensure your password contains 8 to 12 characters and includes Uppercase letters (A-Z), Lowercase letters (a-z), Numbers (0-9) and a Special characters"
            
        return  (lengthCheck && uppercaseCheck && lowercaseCheck && numberCheck && specialCharacterCheck) ? "" : error

    }

    return {
        useValidateEmail,
        useRequired,
        useValidatePhoneNumber,
        useValidateTextArea,
        useValidatePassword
    }
}