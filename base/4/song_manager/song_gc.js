var songList = [
	{ "name": "痴心绝对", "singer": "李圣杰"},
	{ "name": "北京北京",  "singer": "汪峰"}
];

// 添加一个歌曲
songList.push({
	name: '我的滑板鞋',
	singer: '庞超'
});
console.log(songList);

// 搜索一个歌曲 ==> 搜索痴心绝对
for(var i = 0, len = songList.length; i < len; i++) {
	if(songList[i].name === '痴心绝对') {
		console.log(songList[i]);
	}
}

// 删除一个歌曲 ==> 删除北京北京歌曲
for(var i = songList.length - 1; i >= 0; i--) {
	if(songList[i].name === '北京北京') {
		songList.splice(i, 1);
	}
}
console.log(songList);

// 修改一个歌曲 ==> 修改我的滑板鞋歌曲名为我的环保鞋
for(var i = 0, len = songList.length; i < len; i++) {
	if(songList[i].name === '我的滑板鞋') {
		songList[i].name = '我的环保鞋';
	}
}
console.log(songList);
