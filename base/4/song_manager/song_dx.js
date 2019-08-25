/**
 * 歌曲管理构造函数 ==> 歌曲管理类
 * */
function SongManager(songList) {
	
	// 这里的代码通常称之为初始化实例
	this.songList = songList || [
		{ "name": "痴心绝对", "singer": "李圣杰"},
		{ "name": "北京北京",  "singer": "汪峰"}
	];
}

SongManager.prototype = {
	
	// 添加一个歌曲
	add: function(song) {
		// 在实例的歌曲列表中，添加传入的歌曲
		this.songList.push(song);
	},
	
	// 删除歌曲，传入歌曲名
	delete: function(songName) {
		for(var i = this.songList.length - 1; i >= 0; i--) {
			if(this.songList[i].name === songName) {
				this.songList.splice(i, 1);
			}
		}
	},
	
	// 搜索指定歌曲，传入歌曲名
	search: function(songName) {
		for(var i = this.songList.length - 1; i >= 0; i--) {
			if(this.songList[i].name === songName) {
				return this.songList[i];
			}
		}
	},
	
	// 修改指定歌曲的名字
	modify: function(songName, newSongName) {
		for(var i = this.songList.length - 1; i >= 0; i--) {
			if(this.songList[i].name === songName) {
				this.songList[i].name = newSongName;
			}
		}
	}
};

// 创建一个管理国语乐坛歌曲信息的对象，然后添加一首新歌曲
var gySongManager = new SongManager();
gySongManager.add({
	name: '左手右手一个慢动作',
	singer: '三个小伙子'
});
gySongManager.delete('痴心绝对');
console.log(gySongManager.search('北京北京'));
gySongManager.modify('左手右手一个慢动作', '摇一摇');
console.log(gySongManager.songList);

// 创建一个管理粤语歌曲信息的对象，然后添加一首新歌曲
var yySongManager = new SongManager([]);
yySongManager.add({
	name: '光辉岁月',
	singer: '洋家驹'
});
yySongManager.add({
	name: '喜欢你',
	singer: '洋家驹'
});
console.log(yySongManager.songList);
