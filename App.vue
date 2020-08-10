<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		// 全局数据	--	支持响应式
		globalData: null
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	* {
			box-sizing: border-box;
	}
	.content{
		font-size: $uni-font-size-base;
	}
	.price{
		color: $iweb-theme-color-reverse;
	}
	.h1{
		font-size: $uni-font-size-title;
	}
	.h2{
		font-size: $uni-font-size-subtitle;
	}
	.p{
		font-size: $uni-font-size-paragraph;
	}
</style>
