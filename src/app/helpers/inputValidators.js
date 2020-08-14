const inputValidators = {
  hasDigit: {
    expression: new RegExp('(?=.*\\d)'),
    errorMessage: 'Turi būti bent vienas skaičius',
  },
  hasUppercase: {
    expression: new RegExp('(?=.*[A-Z])'),
    errorMessage: 'Turi būti bent viena didžioji raidė',
  },
  hasLowercase: {
    expression: new RegExp('(?=.*[a-z])'),
    errorMessage: 'Turi būti bent viena mažoji raidė',
  },
  minLength: num => ({
    expression: new RegExp(`^.{${num},}$`),
    errorMessage: `Turi būti bent ${num} simboliai`,
  }),
  maxLength: num => ({
    expression: new RegExp(`^.{0,${num}}$`),
    errorMessage: `Turi būti ne daugiau už ${num} simbolių`,
  }),
  onlyLettersAndNumbers: {
    expression: new RegExp('^([A-Za-z0-9])*$'),
    errorMessage: 'Leidžiamos tik lotyniškos raidės ir skaičiai',
  },
  isValidEmail: {
    expression: new RegExp(
      '^([A-Z|a-z|0-9](\\.|_){0,1})+[A-Z|a-z|0-9]\\@([A-Z|a-z|0-9])+((\\.){0,1}[A-Z|a-z|0-9]){2}\\.[a-z]{2,3}$'
    ),
    errorMessage: 'Netinkamas elektronis paštas',
  },
};

export default inputValidators;
