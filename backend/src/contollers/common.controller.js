const UserRepo = require('../repository/user.repo');
const CommonRepo = require("../repository/common.repo");
const {createCertificate} = require("../service/cerfificate.creator");
const cachingService = require("../service/caching.service");
const CourseRepo = require("../repository/course.repo");
const {keys, nodes} = cachingService;

exports.statistics = async (req, res) => {
    if (cachingService.sendFromCache(keys.statistics, res)) return;

    const totalRecords = await CommonRepo.findStatistics();
    if (totalRecords) {
        cachingService.set(keys.statistics, totalRecords);
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
};

exports.contracts = async (req, res) => {
    if (cachingService.sendFromCache(keys.contracts, res)) return;

    const contracts = await CommonRepo.findContracts();
    if (contracts) {
        cachingService.set(keys.contracts, contracts);
        console.log('contracts from DB');

        return res.send(contracts);
    }

    return res.status(404).send({message: 'Contracts not found or something went wrong'});
};

exports.income = async (req, res) => {
    if (cachingService.sendFromCache(keys.income, res)) return;

    const income = await CommonRepo.findContractConclusionInfoAndIncome();
    console.log('income from DB');
    cachingService.set(keys.income, income);

    return res.send(income);
};

exports.getCertificates = async (req, res) => {
    if (cachingService.sendFromCache(keys.certificates, res)) return;

    const certificates = await CommonRepo.findCertificates();
    console.log('certificates from DB');
    cachingService.set(keys.certificates, certificates);

    return res.send(certificates);
};

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
};

exports.addCertificate = async (req, res) => {
    const {id, dates} = req.body;
    if (!id || !dates.dateOfIssue) {
        return res.status(400).send({message: 'ID or date of issue not found'});
    }

    const certificate = await CommonRepo.insertCertificate(id, dates.dateOfIssue);
    if (certificate) {
        cachingService.remove(nodes.certificates);
        return res.status(201).send({message: 'Success'});
    }

    return res.status(500).send({message: 'Something went wrong'});
};

exports.addContract = async (req, res) => {
    const {id, dates} = req.body;
    if (!id || !dates.conclusionDate || !dates.completionDate) {
        return res.status(400).send({message: 'ID not provided'});
    }

    await CommonRepo.insertContract(id, dates.conclusionDate, dates.completionDate)
        .then(result => {
            if (result) {
                cachingService.remove(nodes.contracts);
                return res.status(201).send({message: 'Success'});
            }
        })
        .catch(err => {
            console.log(err.message);
            const message = err.message;
            return res.status(500).send({message});
        });
};

exports.deleteCertificate = async (req, res) => {
    const {id} = req.params;

    const certificate = await CommonRepo.deleteCertificate(id);
    if (certificate) {
        cachingService.remove(nodes.certificates);
        return res.status(204).send({message: 'Success'});
    }

    return res.status(500).send({message: 'Something went wrong'});
};

exports.deleteContract = async (req, res) => {
    const {id} = req.params;

    const contract = await CommonRepo.deleteContract(id);
    if (contract) {
        cachingService.remove(nodes.contracts);
        return res.status(204).send({message: 'Success'});
    }

    return res.status(500).send({message: 'Something went wrong'});
};

exports.clearCache = (req, res) => {
    cachingService.flushAll();
    return res.send({message: 'Success'});
};

exports.getPriceInfo = async (req, res) => {
    const priceInfo = await CourseRepo.priceInfo();
    if (!priceInfo) {
        return res.status(500).send({message: 'Something went wrong'});
    }

    const updatedPriceInfo = Object.fromEntries(Object.entries(priceInfo)
        .map(([k, v]) => [k, Math.round(Number(v))]));

    return res.send(updatedPriceInfo);
};