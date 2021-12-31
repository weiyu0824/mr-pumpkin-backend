function errorHandler (err, req, res, next) {

    console.log('error-control')
    // err = new ApiError();
    // write error log file
    // const log = `${moment().unix()} ERROR  ${err.stack}\n`;
    // const log = 'log:';
    // fs.appendFile('logs.txt', log, (err) => {
    //     if (err) console.error(err);
    // });

    // send error
    res.sendStatus(500);
    // res.render('error', { error: err });
    // res.sendStatus(err.status ? err.status : 500);

    console.log('err');
    console.log(err);
}
export default errorHandler;