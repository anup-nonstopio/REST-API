const fs = require('fs');

function logReqRes(filename){
    return (req, res, next) => {
        fs.appendFileSync(filename, `Request Method: ${req.method}, Request URL: ${req.url}\n`, (err) => {
            if(err) console.log(err);
        });
        next();
    }
}

module.exports = {
    logReqRes
};