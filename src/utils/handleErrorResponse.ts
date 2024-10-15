const handleErrorResponse = (error: any) => {
    if (error?.response) {
        const errorData = error?.response?.data?.message;
        return errorData;
    }

};
export default handleErrorResponse;

