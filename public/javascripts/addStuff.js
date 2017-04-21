var vm = new Vue({
	el:'#container',
	data:{
		edition:1,
		selected:null
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
		}
	}
})