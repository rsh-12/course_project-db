const cache = require('../config/cache.config');
const envVars = require('../keys');

const keys = {
    // common.controller.js
    income: 'income',
    contracts: 'contracts',
    statistics: 'statistics',
    certificates: 'certificates',

    // company.controller.js
    companies: 'companies',

    // course.controller.js
    courses: 'courses', // instructors_by_course_${id}

    // instructor.controller.js
    instructors: 'instructors',
    courseUnrelatedInstructors: 'courseUnrelatedInstructors',
    courseRelatedInstructors: 'courseRelatedInstructors',

    // student.controller.js
    students: 'students',
    studentsWithoutContracts: 'studentsWithoutContracts',
    keyContracts: 'students-courses-without-contracts',
    keyCertificates: 'students-courses-without-certificates',
};

// relations
// a key is duplicated in the values to delete it along with them at once
const nodes = {
    // common.controller.js
    income: [keys.income],
    contracts: [keys.contracts, keys.income, keys.statistics, keys.keyContracts],
    statistics: [keys.statistics],
    certificates: [keys.certificates, keys.keyCertificates, keys.statistics],

    // company.controller.js
    companies: [keys.companies, keys.statistics, keys.students, keys.contracts],

    // course.controller.js
    courses: [keys.courses, keys.studentsWithoutContracts, keys.keyContracts, keys.keyCertificates,
        keys.statistics, keys.income],

    // instructor.controller.js
    instructors: [keys.instructors, keys.courseUnrelatedInstructors, keys.courseRelatedInstructors, keys.statistics],
    courseUnrelatedInstructors: [keys.courseUnrelatedInstructors],
    courseRelatedInstructors: [keys.courseRelatedInstructors],

    // student.controller.js
    students: [keys.students, keys.keyCertificates, keys.keyContracts, keys.statistics, keys.income],
    studentsWithoutContracts: [keys.studentsWithoutContracts],
    keyContracts: [keys.keyContracts],
    keyCertificates: [keys.keyCertificates],
};

/* get value by key */
get = key => {
    return cache.get(key);
};

/* set key value, TTL is 12 hours by default */
set = (key, value) => {
    return cache.set(key, value, envVars.TTL);
}

/* remove key or keys */
remove = keys => {
    console.log('removing cache with keys: ' + keys);
    return cache.del(keys);
}

flushAll = () => {
    console.log('clearing the entire cache');
    cache.flushAll();
}

/* send response with value by key */
sendFromCache = (key, res) => {
    const value = get(key);
    if (!value) {
        return false;
    }

    console.log(`${key} from cache`);
    res.send(value);

    return true;
}

const cachingService = {
    get,
    set,
    remove,
    flushAll,
    sendFromCache,
    keys,
    nodes,
};

module.exports = cachingService;