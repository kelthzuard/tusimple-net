var vm = new Vue({
	el:'#container',
	data:{
		edition:1,
		selected:null,
		stuffData:null,
		votes:null,
		voted:false,
		Title:null,
		loaded:false,
		showBigImg:null
	},
	created:function(){
		//检测是否从其他Url跳转，如果有，确认版本
		var urlEdi = parseInt(window.location.search.substring(5,6));
		this.selected = urlEdi?urlEdi:null;
		//获取数据
		this.fetchData();
	},
	watch:{
		selected:'fetchData'
	},
	methods:{
		//获取数据，获取投票状态，最新版本，和数据信息
		fetchData:function(){
			var self = this;
			axios.get('/home/getData?edi='+self.selected)
				.then(function(response){
					self.edition = response.data.edi;
					self.stuffData = response.data.data;
					self.voted = response.data.voted;
					self.Title = response.data.title[0];
					self.loaded = true;
				})
				.catch(function(error){
					console.log(error);
				});
		},
		selectEdi:function(edi){
			this.selected = edi;
		},
		addVote:function(name,Vote){
			//判断是否投票
			var isUpToData = (this.edition === this.selected || this.selected === null);
			if(isUpToData&&(!this.voted)){
				Vote++;
				var self = this;
				axios.get('/home/upData?name='+name+'&&votes='+Vote)
				.then(function(response){
					self.fetchData();
				})
				.catch(function(error){
					console.log(error);
				})
			}

		},
		showImg:function(src){
			this.showBigImg = src;
			console.log(src);
		}		
	},
	computed:{
	},
})