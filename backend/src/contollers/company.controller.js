const CompanyRepo = require('../repository/company.repo');
const cachingService = require("../service/caching.service");
const {keys, nodes} = cachingService;

exports.getAll = async (req, res) => {
    // searching by name
    const {name} = req.query;
    if (!!name) {
        const companiesByName = await CompanyRepo.findByName(name);
        return res.send(companiesByName);
    }

    if (cachingService.sendFromCache(keys.companies, res)) return;

    const companies = await CompanyRepo.find();
    if (companies) {
        cachingService.set(keys.companies, companies);
        console.log('companies from DB');

        return res.send(companies);
    }

    return res.status(404).send({message: 'Companies not found'});
}

exports.delete = async (req, res) => {
    const {id} = req.params;

    const company = await CompanyRepo.delete(id);
    if (company) {
        cachingService.remove(nodes.companies);
        return res.sendStatus(204);
    }

    return res.status(500).send({message: 'Something went wrong'});
}

exports.add = async (req, res) => {
    const {name, description} = req.body;
    if (!name || !description) {
        return res.sendStatus(400).send({message: 'Name and description are required'})
    }

    const company = await CompanyRepo.insert(name, description);
    if (company) {
        cachingService.remove(nodes.companies);
        return res.send(company);
    }

    return res.sendStatus(500).send({message: 'Something went wrong'});
}

exports.getOne = async (req, res) => {
    const {id} = req.params;
    const company = await CompanyRepo.findById(id);
    if (!company) {
        return res.sendStatus(404).send({message: 'Company not found'});
    }

    return res.send(company);
}

exports.update = async (req, res) => {
    const {id} = req.params;
    const {name, description} = req.body;

    if (!name || !description || !id) {
        return res.sendStatus(400).send({message: 'Name and description are required'})
    }

    const company = await CompanyRepo.update(id, name, description);
    if (company) {
        cachingService.remove(nodes.companies);
        return res.send(company);
    }

    return res.status(500).send({message: 'Internal server error'});
}