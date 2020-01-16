const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        // search for devs within 10km
        // filter by tech
        const { latitude, longitude, techs } = req.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray, //return devs working with techs
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude], //locate
                    },
                    $maxDistance: 10000, //10km distance
                },
            },
        });
        return res.json({ devs });
    }
}