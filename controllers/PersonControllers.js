const person = require('../models/Person');

class PersonController {
    //Listar todas as pessoas
    static async showAllPeople(req, res) {
        try {
            const allPeople = await person.find()
            res.status(200).json(allPeople)
        } catch (err) {
            console.log(err)
        }
    }
    static async createNewPerson(req,res) {
        try {
            const newPerson = req.body;
            await person.create(newPerson)
            res.status(200).json({message: 'Usuário criado com sucesso!'})
        } catch (err) {
            console.log(err)
        }
    }
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
}

module.exports = PersonController;