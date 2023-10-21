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
        error = field ? field.length > 300
        ? "Please enter between 10 and 300 characters"
            : "" : "Please add a note";
        return error
    }

    return {
        useValidateEmail,
        useRequired,
        useValidatePhoneNumber,
        useValidateTextArea
    }
}