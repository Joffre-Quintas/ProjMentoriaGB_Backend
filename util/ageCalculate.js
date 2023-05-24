function ageCalculate(birthday) {
    const date = new Date().getFullYear()
    const birthdayPerson = new Date(birthday).getFullYear()
    const age = date - birthdayPerson
    return age    
}

module.exports = ageCalculate;