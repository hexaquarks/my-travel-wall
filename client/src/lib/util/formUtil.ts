type ErrorField = 'password' | 'email' | 'name' | 'general';
type BackendErrorStructure = { field: ErrorField; message: string }[];

export function populateErrorMessagesReceivedFromBackend<T extends object>(
    errorData: BackendErrorStructure,
    errors: T
) {
    errorData.forEach((error) => {
        //@ts-ignore 
        const fieldErrors = errors[error.field] || (errors[error.field] = []);
        fieldErrors.push(error.message);
    });
}
