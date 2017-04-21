var vm = new Vue({
	el:'#container',
	data:{
		edition:1,
		selected:null,
		deleteData:{
			edition:null,
			name:null,
			judge:'deletePage',
			show:false
		},
		addData:{
			introduce:null,
			judge:'addPage',
			show:true
		}
	},
	created:function(){
		this.fetchData();
	},
	watch:{
		selected:'fetchData'
	},
	methods:{
		fetchData:function(){
			var self = this;
			axios.get('/home/getData?edi='+self.selected)
				.then(function(response){
					self.edition = response.data.edi;
				})
				.catch(function(error){
					console.log(error);
				});
		},
		selectEdi:function(edi){
			location.href = '/home?edi='+edi;
		},
		submit:function(){
			console.log(this.deleteData);
			var self = this;
			axios.post('/hoster?type=delete',{
				deleteData:self.deleteData
			})
			.then(function(response){
				alert('删除成功');
			})
			.catch(function(error){
				console.log(error);
				alert('操作失败');
			})
		},
		//用户点击切换管理员功能
		changePage:function(page){
			console.log(page);
			if(page === this.deleteData.judge){
				this.deleteData.show = true;
				this.addData.show = false;
			}else if(page === this.addData.judge){
				this.deleteData.show = false;
				this.addData.show = true;
			}
		}

	}
})