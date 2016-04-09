#!/usr/bin/env node
'use strict';
var meow = require('meow');
var pixivTagDownloader = require('./');

var cli = meow([
	'Usage',
	'  $ pixiv-tag-downloader [input]',
	'',
	'Options',
	'  --uername, -u   pixiv username',
	'  --password, -p  pixiv password',
	'  --output, -o    output path  [Default: current directory]',
	'  --wait, -w      interval time  [Default: 5]',
	'  --favorite, -f  filter favorite count',
	'  --r18, -r       include R18?  [Default: false]',
	'  --manga, -m     include manga?  [Default: false]',
	'',
	'Examples',
	'  $ pixiv-tag-downloader 艦これ1000ユーザ入り -u username -p password',
	'  $ pixiv-tag-downloader エレン・ベーカー -u username -p password --r18 --manga -f 1000'
], {
	alias: {
		username: 'u',
		password: 'p',
		favorite: 'f',
		output: 'o',
		wait: 'w',
		r18: 'r'
	},
	default: {
		output: __dirname,
		wait: 5,
		r18: false,
		manga: false
	}
});

pixivTagDownloader(cli.input[0], cli.flags);
