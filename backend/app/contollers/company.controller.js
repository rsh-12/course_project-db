const CompanyRepo = require('../repository/company.repo');
const cache = require('../config/cache.config');

exports.getAll = async (req, res) => {
    let companies = cache.get('companies');

    if (!!companies) {
        console.debug('companies from cache');
        return res.send(companies);
    }

    console.debug('companies from DB');
    companies = CompanyRepo.find();

    if (companies) {
        cache.set('companies', companies, 12 * 60 * 60);
        return res.send(companies);
    }

    return res.status(404).send({message: 'Companies not found'});
}
