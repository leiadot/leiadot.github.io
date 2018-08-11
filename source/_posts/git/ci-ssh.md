---
title: 【Hexo】使用 Travis CI 自動佈署 Blog
date: 2018-02-22 15:35:45
tags:
- Hexo
- TravisCI
categories: CodingLife
photo:
- '/img/cover/travisci.jpg'
---

這兩天忙著處理 Travis CI ，終於有點心得，
來簡單分享不加密自動佈署，以及使用 ssh 的方法。

<!-- more -->

# Travis CI 自動化執行

Travis CI 就是一種代理媽媽（？）的概念，他可以代替你在 terminal 的行為，
在網路上看到一些分享文章都會要你裝 ruby ，但假設你不加密可以省略這個步驟，
因為我們只是一般的部落格，所以我們這邊選擇不加密的方式。

那我們開始吧。

## 一、新建 repository ，並分支。

首先要先新建一個 repository ，一般來說 master 放 source code 是比較好的，
但是因為我的 repository name 是 `user.github.io` 格式，所以 github page 只能是 master，
因此我把 source code 放 branch ，產出的文章放 master 。

![](/img/travisci/step01.png)
![](/img/travisci/step02.png)

## 二、申請 token

在 Github 裡面，進入到`Settings`。

![](/img/travisci/step03.png)

選擇`Developer Settings`。

![](/img/travisci/step04.png)

選擇`Personal access tokens`再選擇右邊的`Generate new token`。

![](/img/travisci/step05.png)

命名，依照你的需要選擇權限。
我自己權限是只選擇第一個`repo`，當然你也可以全部選起來。

![](/img/travisci/step06.png)

接著 Github 就會產生一組編碼，**這個編碼只會出現一次，請務必保存**。

## 三、設定 Travis CI

Github 帳號授權連結申請後。

點進 Travis CI 的`Profile`。
![](/img/travisci/step07.png)

把你需要自動化的 repository 打開，在點進旁邊的零件圖示。

![](/img/travisci/step08.png)

這是放置 Travis CI 環境變數的地方。 
新增一個`GH_TOKEN`，值為剛剛 Github 給的編碼，
新增一個`GH_REF`，值為 git repository 的位置，
像是我部落格的位置是`github.com/leiadot/leiadot.github.io.git`。

## 四、新增 `.travis.yml`

![](/img/travisci/step09.png)


在`.git`的同層新增`.travis.yml`，如果你的 hexo 沒有指定`package.json`，
要將`# before_install`的註解打開，否則 Travis CI 無法執行 hexo 的 command line ，檔案內容如下。

```
yml
language: node_js #選擇語言

node_js: stable #選擇版本

# before_install:
  # - npm install -g hexo-cli

install:
  - npm install #安裝npm

script: #要執行的程式
  - hexo clean # 清除
  - hexo generate # 生成

after_success: #執行完成後的 git push
  - cd ./public
  - git init
  - git config user.name "你的user帳號"
  - git config user.email "你的email"
  - git add .
  - git commit -m "Update by travis ci"
  - git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master

branches: #分支
  only:
    - source 
```

![](/img/travisci/step10.png)

回到 Travis CI 查看是否執行完成。

# SSH key 設定

要 Travis CI 觸發，必須 branch 要有動作，
為了節省打帳號密碼的上傳時間，在這邊簡單介紹 ssh key 設定。


```
$ ssh-keygen -t rsa -C "user@gmail.com"
```

在 Terminal 上，輸入新建 ssh key 指令。

```
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa): 
```

輸入ssh key檔案存放位置，一般預設在`~/.ssh`資料夾裡面，
這邊我輸入`/home/user/.ssh/id_rsa`。

```
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```
都按`Enter`跳過

```
Your identification has been saved in /home/user/.ssh/id_rsa.
Your public key has been saved in /home/user/.ssh/id_rsa.pub.
```
ssh key 檔案產生完成。

```
cd ~/.ssh
cat id_rsa.pub
```
到ssh key 資料夾位置，下`cat`指令得到 key 碼，
在 github 上新增 ssh key 之後。

```
ssh -v git@github.com
```

輸入測試 command line。

```
The authenticity of host 'github.com (207.97.227.239)' can't be established.
RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)?
```
得到訊息，輸入`yes`。

```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```
授權成功

```
$ git remote set-url origin git@github.com:user/repo.git
```
如果已經 clone 過，只要再掛載這串指令就好。