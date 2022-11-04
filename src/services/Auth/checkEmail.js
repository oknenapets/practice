const checkExistingEmail = (data, email) => data.findIndex((item) => item.email === email);

export default checkExistingEmail;
