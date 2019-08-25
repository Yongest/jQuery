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
		
		/**
		 * 实现步骤：
		 * 1、先要看看之前有没有存储过这个歌曲
		 * 2、如果存储过，那么把之前的删除掉
		 * 3、最后添加新的歌曲
		 * */
		
		var searchResult = this.search(song.name);
		if(searchResult) {
			this.delete(song.name);
		}
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

