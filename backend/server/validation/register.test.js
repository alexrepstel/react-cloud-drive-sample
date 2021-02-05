const validateRegisterInput = require("./register");

//empty email test
var emptyEmailData = {
    name: "somename",
    email: "",
    password: "hellos",
    password2: "hellos"
}
test('Empty email', () => {
    expect(validateRegisterInput(emptyEmailData).isValid).toBe(false);
});

//empty name test
var emptyNameData = {
    name: "",
    email: "email@email.com",
    password: "hellos",
    password2: "hellos"
}
test('Empty email', () => {
    expect(validateRegisterInput(emptyNameData).isValid).toBe(false);
});

//password empty test
var passwordEmptyhData = {
    name: "stelios",
    email: "email@email.com",
    password: "",
    password2: "hellos"
}
test('Empty email', () => {
    expect(validateRegisterInput(passwordEmptyhData).isValid).toBe(false);
});


//password2 empty test
var password2EmptyhData = {
    name: "stelios",
    email: "email@email.com",
    password: "resssss",
    password2: ""
}
test('Empty email', () => {
    expect(validateRegisterInput(password2EmptyhData).isValid).toBe(false);
});



//passwords not matching test
var passwordsNotMatchData = {
    name: "stelios",
    email: "email@email.com",
    password: "hellosss",
    password2: "hellos"
}
test('Empty email', () => {
    expect(validateRegisterInput(passwordsNotMatchData).isValid).toBe(false);
});


//passwords too short test
var passwordsShorthData = {
    name: "stelios",
    email: "email@email.com",
    password: "hsss",
    password2: "hsss"
}
test('Empty email', () => {
    expect(validateRegisterInput(passwordsShorthData).isValid).toBe(false);
});
