var vm = new Vue({
	el:'#container',
	data:{
		edition:1,
		selected:null,
		inputUser:null,
		inputPassword:null,
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
			var self = this;
			axios.post('/login',{
				userId:self.inputUser,
				userPassword:self.inputPassword
			})
			.then(function(response){
				if(response.status === 200){
					location.href = '/hoster';
				}
			})
			.catch(function(error){
				console.log(error);
				alert('登录失败');
			})
		}
	}
})