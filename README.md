# Vocabulary

## 简介

这是一个背单词的软件，由三个页面组成，其主要特点是能够用户对每个单词的熟练度。熟练度有：level0（新词），level1（没有印象），level2（不熟练），level3（认识），level4（熟练），level5（牢记在心）。
用户可以制定自己每日要背的单词书数量，优先选取熟练度低的单词记忆。
用到的工具：NodeJs, ExpressJs, MongoDB

## public里每个页面的功能
### index.html
在第一个页面index.html页面里，用户可以填入一个单词（必填），其英文注解（选填），其中文注解（必填）。通过/add将每个单词存入数据库。<br/>
要实现的功能：	
|需求|完成度|
|---|----|
|能够将单词数据存入数据库|完成|
|如果单词输入栏为空，alert|未完成|
|如果中文注解输入栏为空，alert|未完成|
|如果输入单词和数据库中单词重复，alert|未完成|

### learn.html
在learn.html页面里，用户可以根据自己制定的计划进行学习。根据用户制定每日学习单词的量，服务器会从数据库中调取单词。服务器优先调取level0的单词，要是用户每日的单词量小于level0中单词量，则不考虑其他level的单词直接调取level0的单词（顺序无所谓）。如果用户每日单词量大于level0中单词，剩下的单词则从其他level中根据设置的概率进行调取。<br/>
当用户在学习单词时，对于每个熟练度的单词，点击每个按钮会让单词进入不同的新的熟练度：
|用户所按的按钮|当前熟练度为level0|level1|level2|level3|level4|level5|
|-----------|----------------|-----|------|-------|-------|------|
|Familiar|level2|level2|level3|level4|level5|level5|
|Somewhat familiar|level1|level2|level2|level3|level3|level4|
|Unfamiliar|level1|level1|level1|level1|level2|level2|

而Skip则跳过当前这个单词。 <br/>
在页面中，h1中的vocabulary将被数据库中这个单词的vocabulary所代替，level0将被这个单词的具体熟练度所代替，Engling Meaning: 后面将出现这个单词的englighMeaning，同理，Chinese Meaning: 后面将出现这个单词的chineseMeaning。在没有按Show English Meaning和Show Chinese Meaning按钮之前，隐藏他们的注解。<br/>
要实现的功能：	
|需求|完成度|
|---|----|
|从后段根据规程调取用户每日学习量的单词|未完成|
|将页面中的元素换成单词的数据|未完成|
|完成对Show English Meaning和Show Chinese Meaning两个按钮功能的实现|未完成|
|完成对Familiar，Somewhat familiar和Unfamiliar三个按钮功能的实现（post进数据库）|未完成|
|完成对skip这个按钮功能的实现|未完成|

（目前未设计API）

### setting.html
在setting.html页面里，用户可以设置每个熟练度单词出现的概率，首先level0的单词（新词）必须优先出现，比如说，一天的背诵量是100个，数据库中有50个新词，这50个新词必须出现在100个需要背诵的单词里，剩余50个单词根据每个难度的概率来分配。所以这里只有level1到level5的概率，而没有level0的概率。用户在最后一个输入框里可以设置每天要背诵的单词量。<br/>
要实现的功能：
|需求|完成度|
|---|----|
|能够见用户输入的设置数据改写进数据库|完成|
|如果用户输入的5个概率之和不为1，alert|未完成|
|如果用户输入的每日单词数量低于0，alert|未完成|

## models里的模型和数据库
models提供单词和设置的数据库模型，db.js用于连接mongodb.

### models/setting.js
数据库中只有一个setting的document，他的name是'vocabularySetting'。在服务器中通过改写这一个document来实现改写数据。level1-level5代表每个熟练度的概率。vocabNumber代表一天要背的数量。

### models/vocabulary.js
这是单词的数据库模型，vocab代表单词，englishMeaning代表英文注解，chineseMeaning代表中文注解，level代表这个单词的熟练度（0-5），context代表这个单词在文章中的上下文（目前不考虑实现这个功能，所以暂定array是空的）。

### db.js
这是连接数据库的文件，目前暂定用自己本地的数据库，可能之后考虑用网上的。

## 服务器（server.js）

### /add
功能为post，用户在index.html中输入的单词将通过/add来存储进数据库中。

### /setting
功能为post，用户在setting.html中输入的设置通过/setting来对数据库中document进行改写。