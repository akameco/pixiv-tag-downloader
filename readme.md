# pixiv-tag-downloader [![Build Status](https://travis-ci.org/akameco/pixiv-tag-downloader.svg?branch=master)](https://travis-ci.org/akameco/pixiv-tag-downloader)

> タグ検索に特化したpixivの画像ダウンローダー

## 特徴
オリジナルサイズの画像ダウンロード<br>
残り時間の表示<br>
ブックマーク数によるフィルタ<br>
R18フィルタのオン・オフ<br>
漫画フィルタのオン・オフ<br>

## Demo

![pixiv-tag-downloader](https://raw.githubusercontent.com/akameco/pixiv-tag-downloader/master/media/demo.gif)

## Install

```
$ npm install --global pixiv-tag-downloader
```

## CLI

```
$ pixiv-tag-downloader --help

  pixiv downloader for tag

  Usage
    $ pixiv-tag-downloader [input]

  Options
    --uername, -u   pixiv username
    --password, -p  pixiv password
    --output, -o    output path  [Default: current directory]
    --wait, -w      interval time  [Default: 5]
    --favorite, -f  filter favorite count
    --r18, -r       include R18?  [Default: false]
    --manga, -m     include manga?  [Default: false]

  Examples
    $ pixiv-tag-downloader 艦これ1000ユーザ入り -u username -p password
    $ pixiv-tag-downloader エレン・ベーカー -u username -p password --r18 --manga -f 1000
```


## License

MIT © [akameco](http://akameco.github.io)
