import { version } from '../../package.json';
import { Router } from 'express';
var request = require('request');

export default ({ config, db }) => {
	let api = Router();

	var url1 = 'http://us.api.iheart.com/api/v1/catalog/searchAll?keywords=';
	var url2 = `&queryTrack=false&queryBundle=false&queryArtist=true&queryStation=false&queryFeaturedStation=false&queryTalkShow=false&queryTalkTheme=false&queryKeyword=false&countryCode=US`;

	api.get('/search', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        var keyword = req.param('keyword');
        var url = url1 + keyword + url2;
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
