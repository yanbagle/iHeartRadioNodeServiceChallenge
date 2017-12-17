import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
var request = require('request');

export default ({ config, db }) => {
	let api = Router();

	var url = 'http://us.api.iheart.com/api/v1/catalog/searchAll?keywords=';
	var url2 = `&queryTrack=false&queryBundle=false&queryArtist=true&queryStation=false&queryFeaturedStation=false&queryTalkShow=false&queryTalkTheme=false&queryKeyword=false&countryCode=US`;
	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	api.get('/search', (req, res) => {
        var keyword = req.param('keyword');
        url += keyword + url2;
        request(url, function (error, response, body) {
            if (response) {
                res.send(body);
            } else {
                console.log('error:', error); 
                res.send(error);
            }
        });
	});

	return api;
}
