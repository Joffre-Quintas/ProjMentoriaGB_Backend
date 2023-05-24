const person = require('../models/Person');

class PersonController {
    //Listar todas as pessoas
    static async showAllPeople(req, res) {
        try {
            const allPeople = await person.find()
            const allPeopleAgeCalculate = allPeople.map(person => {
                return {
                    ...person._doc,
                    birthday: `${String(person.birthday.getDate()).padStart(2,'0')}/${String((person.birthday.getMonth() + 1)).padStart(2,'0')}/${person.birthday.getFullYear()}`,
                    age: PersonController.ageCalculate(person.birthday),
                    isLegalAge: PersonController.ageCalculate(person.birthday) >= 18
                }
            })
            res.status(200).json(allPeopleAgeCalculate)
        } catch (err) {
            console.log(err)
        }
    }
    //Criar uma nova pessoa
    static async createNewPerson(req,res) {
        try {
            const newPerson = req.body;
            await person.create(newPerson)
            res.status(200).json({message: 'Usuário criado com sucesso!'})
        } catch (err) {
            console.log(err)
        }
    }
    //Encontrar uma pessoa
    static async findOnePerson(req, res) {
        const { uuid } = await req.params;
        const onePerson = await person.findOne({uuid: uuid})

        if(!uuid || onePerson == null) {
            res.status(404).json({message: 'Pessoa não cadastrada'})
        } else {
            try {
                res.status(200).json(onePerson)
            } catch (err) {
                console.log(err)
            }
        }
    }
    //Deletar uma pessoa
    static async deletePerson(req,res) {
        const { uuid } = await req.params;
        const onePerson = await person.findOne({uuid: uuid})

        if(!onePerson) {
            res.status(404).json({message: 'Pessoa não cadastrada'})
        } else {
            try {
                await person.findOneAndDelete({uuid: uuid});
                res.status(200).json({message: "Pessoa deletada com sucesso!"})
            } catch (err) {
                console.log(err)
            }
        }
    }
    //Atualizar pessoa
    static async updatePerson(req,res) {
        const { uuid } = await req.params;
        const onePerson = await person.findOne({uuid: uuid})
        
        if(!onePerson) {
            res.status(404).json({message: 'Pessoa não cadastrada'})
        } else {
            try {
                await person.findOneAndUpdate({uuid: uuid}, req.body);
                res.status(200).json({message: "Pessoa atualizada com sucesso!"})
            } catch (err) {
                console.log(err)
            }
        }
    }
    //Função para calcular idade da pessoa
    static ageCalculate(birthday) {
        const date = new Date().getFullYear()
        const birthdayPerson = new Date(birthday).getFullYear()
        const age = date - birthdayPerson
        return age    
    }
    //Listar maiores de idade
    static async listOfLegalAge(req,res) {
        try {
            const allPeople = await person.find();
            const allPeopleAgeCalculate = allPeople.map(person => {
                return {
                    ...person._doc,
                    birthday: `${String(person.birthday.getDate()).padStart(2, '0')}/${String((person.birthday.getMonth() + 1)).padStart(2, '0')}/${person.birthday.getFullYear()}`,
                    age: PersonController.ageCalculate(person.birthday),
                    isLegalAge: PersonController.ageCalculate(person.birthday) >= 18
                }
            });
            const legalAgePeople = allPeopleAgeCalculate.filter(person => person.isLegalAge);
            res.status(200).json(legalAgePeople);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro ao obter pessoas maiores de idade.' });
        }
    }
    //Listar menores de idade
    static async listOfLegalAge(req,res) {
        try {
            const allPeople = await person.find();
            const allPeopleAgeCalculate = allPeople.map(person => {
                return {
                    ...person._doc,
                    birthday: `${String(person.birthday.getDate()).padStart(2, '0')}/${String((person.birthday.getMonth() + 1)).padStart(2, '0')}/${person.birthday.getFullYear()}`,
                    age: PersonController.ageCalculate(person.birthday),
                    isLegalAge: PersonController.ageCalculate(person.birthday) >= 18
                }
            });
            const NotlegalAgePeople = allPeopleAgeCalculate.filter(person => person.isLegalAge == false);
            res.status(200).json(NotlegalAgePeople);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro ao obter pessoas menores de idade.' });
        }
    }
    //Listar por ordem alfabética
    static async listOfAscAlfabetic(req,res) {
        try {
            const allPeople = await person.find();
            const allPeopleCompletName = await allPeople.map(person => {
                return{
                    completName: `${person.name} ${person.lastName}`,
                    birthday: `${String(person.birthday.getDate()).padStart(2, '0')}/${String((person.birthday.getMonth() + 1)).padStart(2, '0')}/${person.birthday.getFullYear()}`,
                    age: PersonController.ageCalculate(person.birthday),
                    isLegalAge: PersonController.ageCalculate(person.birthday) >= 18
                }
            })
            const listSorted = await allPeopleCompletName.sort((personA,personB) => personA.completName.localeCompare(personB.completName))
            res.status(200).json(listSorted)                       
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = PersonController;