const UserRepo = require('../repository/user.repo');
const CommonRepo = require("../repository/common.repo");
const cache = require('../config/cache.config');
const {createCertificate} = require("../service/cerfificate.creator");
const keys = require('../keys');

exports.statistics = async (req, res) => {
    let totalRecords = cache.get('statistics');

    if (!!totalRecords) {
        console.log('statistics from cache');
        return res.send(totalRecords);
    }

    totalRecords = await CommonRepo.findStatistics();

    if (totalRecords) {
        cache.set('statistics', totalRecords, keys.TTL);
        console.log('statistics from DB');
        return res.send(totalRecords);
    }

    return res.status(404).send({message: 'Statistics not found'});
};

exports.whoAmI = async (req, res) => {
    const user = await UserRepo.findById(req.userId);

    return user
        ? res.send(user)
        : res.sendStatus(404);
}

exports.contracts = async (req, res) => {
    let contracts = cache.get('contracts');

    if (!!contracts) {
        console.log('contracts from cache');
        return res.send(contracts);
    }

    contracts = await CommonRepo.findContracts();

    if (contracts) {
        cache.set('contracts', contracts, keys.TTL);
        console.log('contracts from DB');
        return res.send(contracts);
    }

    return res.status(404).send({message: 'Contracts not found or something went wrong'});
}

exports.income = async (req, res) => {
    let income = cache.get('income');

    if (!!income) {
        console.log('income from cache');
        return res.send(income);
    }

    income = await CommonRepo.findContractConclusionInfoAndIncome();
    console.log('income from DB');
    cache.set('income', income, keys.TTL);

    return res.send(income);
}

exports.getCertificates = async (req, res) => {
    let certificates = cache.get('certificates');

    if (!!certificates) {
        console.log('certificates from cache');
        return res.send(certificates);
    }

    certificates = await CommonRepo.findCertificates();

    console.log('certificates from DB');
    cache.set('certificates', certificates, keys.TTL);

    return res.send(certificates);
}

exports.downloadCertificate = async (req, res) => {
    const {id} = req.params;
    const certificate = await CommonRepo.findCertificate(id);
    if (!certificate) {
        return res.status(404).send({message: 'Certificate not found'});
    }

    const text = `${certificate.lastName} ${certificate.firstName} ` +
        `for completing the ${certificate.course} course on ${certificate.dateOfIssue.toDateString()}`;
    const file = await createCertificate(text);

    await res.download(file);
}