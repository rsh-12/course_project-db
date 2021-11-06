exports.allAccess = (req, res) => {
    return res.status(200).send("Public Content.");
};

exports.securedContent = (req, res) => {
    return res.status(200).send("Secured Content.");
};

