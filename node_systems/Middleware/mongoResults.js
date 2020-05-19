const mongoResults = (model, populate) => async (req,res,next) => {
	let select = ('select' in req.query) ? req.query.select.split(',').join(' ') : '';
	delete req.query['select']; 
	
	let sort =  ('sort' in req.query) ? req.query.sort.split(',').join(' ') : '-createdAt';
	delete req.query['sort'];
	
	//Pagination
	let page = parseInt(req.query.page, 10) || 1;
	let limit = parseInt(req.query.limit, 10) || 5;
	let startIndex = (page - 1) * limit;
	let endIndex = page * limit;
	const total = await model.countDocuments();
	
	delete req.query['page']; 
	delete req.query['limit']; 
	delete req.query['skip'];
	
	let pagination = {};
	if(endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit: limit,
		}
	}
	if(startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit: limit,
		}
	}
		
	
	let queryStr = JSON.stringify(req.query);
	queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
	
	const results = await model.find(JSON.parse(queryStr)).select(select).sort(sort).skip(startIndex).limit(limit).populate(populate);
	res.mongoResult = { success: true, count: results.length, pagination, data: results }
	
	next() //this is the fix....
}

module.exports = mongoResults;