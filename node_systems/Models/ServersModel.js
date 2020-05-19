const utils = require('../utilz.js');
const slugify = require('slugify');
const mongoose = require('mongoose');

const ServersSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description can not be more than 500 characters']
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS'
      ]
    },
    address: {
      type: String,
      required: [true, 'Please add an address']
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String
    },
    services: {
      // Array of strings
      type: [String],
      required: true,
      enum: [
        'Go',
        'Node',
        'Python',
        'Mongo',
        'MySql',
        'Docker',
        'Nginx'
      ]
    }, 
    photo: {
      type: String,
      default: 'no-photo.png'
    },                 	
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }	
});

ServersSchema.pre('save', async function(next)  {
	//slugify title
	this.slug = slugify(this.name, {lower:true});
	
	//geocode address
	let loc = await utils.geocode(this.address);
	//console.log(loc)
	
	this.location = {
		type: 'Point',
		coordinates: [loc[0].longitude, loc[0].latitude],
		formattedAddress: loc[0].formattedAddress,
		street: loc[0].streetName,
	    city: loc[0].city,
	    state: loc[0].stateCode,
	    zipcode: loc[0].zipcode,
	    country: loc[0].countryCode		
	}
	
	next()				
});

ServersSchema.virtual('projects', {
  ref: 'Projects',
  localField: '_id',
  foreignField: 'server',
  justOne: false
});

// Cascade delete courses when a bootcamp is deleted
ServersSchema.pre('remove', async function(next) {
  console.log(`Projects being removed from server ${this._id}`);
  await this.model('Projects').deleteMany({ server: this._id });
  next();
});

module.exports = mongoose.model('Servers', ServersSchema);

