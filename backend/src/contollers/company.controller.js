const CompanyRepo = require('../repository/company.repo');
const cache = require('../config/cache.config');

exports.getAll = async (req, res) => {
    const {name} = req.query;
    if (!!name) {
        const companiesByName = await CompanyRepo.findByName(name);
        return res.send(companiesByName);
    }

    let companies = cache.get('companies');
    if (!!companies) {
        console.log('companies from cache');
        return res.send(companies);
    }

    companies = await CompanyRepo.find();

    if (companies) {
        cache.set('companies', companies, 12 * 60 * 60);
        console.log('companies from DB');
        return res.send(companies);
    }

    return res.status(404).send({message: 'Companies not found'});
}

exports.delete = async (req, res) => {
    const {id} = req.params;
    const company = await CompanyRepo.delete(id);
    if (company) {
        cache.flushAll();

        return res.sendStatus(204);
    }

    return res.status(500).send({message: 'Something went wrong'});
}