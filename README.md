# かわいいきつねさん

統合ゼミコミュニティ（[Twitter](https://twitter.com/tougousemi)）に住んでいるかわいいきつねさんです．

# デプロイ

## 手元で起動する

```sh
git clone <url>
cd fox-ts
npm i
npm run dev
```

## Dockerで起動する

```sh
git clone <url>
cd fox-ts
docker build --name fox-ts .
```

## Herokuにデプロイする

Todo: HerokuへのTypeScriptデプロイ方法を確認する

# 機能

## アクティビティ表示

きつねさんはいつももっふもっふたいむです．

## コマンド

以下のスラッシュコマンドが使えます．

* `/fox`
  * こやーん．
* `/help`
  * 使えるコマンドの一覧を表示します．
* `/fortune`
  * おみくじを引きます．
* `/join [<vc>]`・`/leave`
  * ボイスチャンネルに遊びに来ます．
    * vcを指定した場合，そのvcに遊びに来ます．
    * vcを指定しなかった場合，自分がvcにいればそこに遊びに来ます．いなければ諦めます．
  * 今いるボイスチャンネルに新しい人が来たときに，お助けメッセージを表示します．
* `/google <query> [<count>]`
  * `query`文字列でググります．最初の`count`個（指定なしで3つ）のURLを返します．
* `/url [<keyword> [<url>]]`
  1. 引数を指定しない場合，URLリストを表示します．
  2. keywordだけを指定した場合，該当するURLのリストを表示します．
  3. keywordとurlを指定した場合，URLリストに追加します．
  4. urlだけを指定するとエラーになります．
* `/semi`
  * `/semi search <query>`
    * query文字列が含まれるゼミを検索します．
  * `/semi all`
    * ゼミテレポートチャンネルに誘導します．
* `/quiz`
  * `/quiz add <body> <answer>`
    * bodyを内容として，クイズを追加します．
  * `/quiz random`
    * ランダムにクイズを出します．

## かわいい

それっぽいことを言うと反応してくれます．

Todo: 動的に設定可能にする．

* `きつね`など
  * かわいく鳴いてくれます．
* `:Otsu_desu:`など
  * 労ってくれます．
* `うおうお`など
  * うおうおしてくれます．
* `:sugoi:`など
  * わかってくれます．
* `こんにちは`
  * あいさつしてくれます．
* `こんばんは`
  * あいさつしてくれます．
* `つかれた`など
  * 応援してくれます．
* `:usagi:`など
  * きつねであることを主張します．
* `ごはん`など
  * ご飯を食べます．
* `きつねうどん`
  * 人間を滅ぼすことを決意します．
