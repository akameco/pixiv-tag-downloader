#!/usr/bin/env node
'use strict';
const meow = require('meow');
const updateNotifier = require('update-notifier');
const Conf = require('conf');
const pixivTagDownloader = require('./');

const config = new Conf();

const cli = meow(`
Usage
  $ pixiv-tag-downloader [input]

Options
  --uername, -u   pixiv username (use cache)
  --password, -p  pixiv password (use cache)
  --output, -o    output path (create directory)  [Default: current directory]
  --wait, -w      interval time  [Default: 5]
  --favorite, -f  filter favorite count
  --r18, -r       include R18?  [Default: false]
  --manga, -m     include manga?  [Default: false]

Examples
  $ pixiv-tag-downloader 艦これ1000ユーザ入り -u username -p password
  $ pixiv-tag-downloader 嫁セイバー -r -f 1000 -o 嫁セイバー
`, {
	alias: {
		username: 'u',
		password: 'p',
		favorite: 'f',
		output: 'o',
		wait: 'w',
		r18: 'r',
		manga: 'm'
	},
	default: {
		output: process.cwd(),
		wait: 5,
		r18: false,
		manga: false
	}
});

updateNotifier({pkg: cli.pkg}).notify();

const opts = cli.flags;

if (!cli.input[0]) {
	console.log('require tag word');
	process.exit(1);
}

if (opts && opts.username && opts.password) {
	pixivTagDownloader(cli.input[0], cli.flags);
	config.set('username', opts.username);
	config.set('password', opts.password);
} else {
	if (!config.has('username') || !config.has('password')) {
		console.log('require username && password');
		process.exit(1);
	}

	opts.username = config.get('username');
	opts.password = config.get('password');
	pixivTagDownloader(cli.input[0], opts);
}
