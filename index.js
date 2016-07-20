'use strict';
const path = require('path');
const Pixiv = require('pixiv.js');
const pixivImg = require('pixiv-img');
const co = require('co');
const ora = require('ora');
const chalk = require('chalk');
const length = require('multibyte-length');
const substr = require('multibyte-substr');
const prettyMs = require('pretty-ms-ja');

const spinner = ora({color: 'red'});

module.exports = (tag, opts) => {
	opts = Object.assign({wait: 5, r18: false, manga: false}, opts);
	spinner.start();
	co(main(tag, opts)).then(() => {
		spinner.stop();
		console.log('downloads complete');
	});
};

function * main(tag, opts) {
	const pixiv = new Pixiv(opts.username, opts.password);

	for (let page = 1, next, c = 0, total; next !== null; ++page) {
		const res = yield pixiv.search(tag, {
			mode: 'tag',
			types: 'illustration',
			page
		});

		// 次のページがない場合null
		next = res.pagination.next;
		total = total || res.pagination.total;

		let works = res.response;
		const len = works.length;

		if (!opts.r18) {
			works = works.filter(v => v.age_limit === 'all-age');
		}
		if (!opts.manga) {
			works = works.filter(v => !v.is_manga);
		}
		if (opts.favorite) {
			works = works.filter(v => {
				const count = v.stats.favorited_count;
				return count.public + count.private >= opts.favorite;
			});
		}

		total -= len - works.length;

		for (const work of works) {
			c++;
			const caption = work.caption ? work.caption.replace(/[\n\r]/g, '') : '';
			const time = prettyMs((total - c) * opts.wait * 1000);
			const text = `${c}/${total} ${time} ${chalk.bold.underline.blue(work.title)} ${caption}`;
			spinner.text = ajustLine(text);

			yield downloadImg(work, opts);
			yield wait(opts.wait);
		}
	}
}

function * downloadImg(work, opts) {
	try {
		if (work.is_manga && work.metadata && work.metadata.pages) {
			for (const page of work.metadata.pages) {
				const imgUrl = page.image_urls.large;
				yield pixivImg(imgUrl, path.resolve(opts.o, path.basename(imgUrl)));
				yield wait(opts.wait);
			}
		} else {
			const imgUrl = work.image_urls.large;
			yield pixivImg(imgUrl, path.resolve(opts.o, path.basename(imgUrl)));
		}
	} catch (err) {
		// エラーが起きてもスキップ
		console.log('\nskip', work.id);
	}
}

function ajustLine(text) {
	const width = process.stdout.columns;
	return length(text) < width ? text : substr(text, 0, width);
}

function wait(s) {
	return new Promise(resolve => {
		setTimeout(() => resolve(), s * 1000 || 5000);
	});
}
