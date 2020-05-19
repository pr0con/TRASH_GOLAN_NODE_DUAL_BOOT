const errorHandler = (err, req, res, next) => {
	console.log(err);
	
	switch(err.name) {
		case "MongoError":
			switch(err.code) {
				case 11000:
					err.statusCode = 400;
					err.message = `Duplicate field value.`;
					break;
				default:
					err.message = `Some weird crap happend with mongo code: ${err.code}`;
					break;
			}
			break;
		case "CastError":
			err.statusCode = 400;
			err.message = `Resource not found with oid - ${err.value}`;
			break;
		case "ValidationError":
			err.statusCode = 400;
			const msgs = Object.values(err.errors).map(val => val.message);
			err.message = msgs;
			break;
		default:
			break;
	}
	
	res.status(err.statusCode || 500).json({
		success: false,
		error: err.message || 'Something went horribly wrong.'
	});
}

module.exports = errorHandler;