const validateLoginInput = require("./login");

//empty email test
var emptyEmailData = {
    name: "somename",
    email: ""
}
test('Empty email', () => {
    expect(validateLoginInput(emptyEmailData).isValid).toBe(false);
});


//empty name test
var emptyNameData = {
    name: "",
    email: "email@email.com"
}
test('Empty name', () => {
    expect(validateLoginInput(emptyNameData).isValid).toBe(false);
});


//invalid email test
//empty name test
var invalidEmailData = {
    name: "somename",
    email: "email"
}
test('Invalid email', () => {
    expect(validateLoginInput(invalidEmailData).isValid).toBe(false);
});
