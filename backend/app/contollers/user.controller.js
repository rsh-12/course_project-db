exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.securedContent = (req, res) => {
    res.status(200).send("Secured Content.");
};

