<template>
	<view class="content">
		<view v-if="data.length > 0">
			<view class="cart-list" v-for="(item,index) in data" :key="index">
				<image class="pic" :src="server.host + item.pic" mode="widthFix"></image>
				<view>
					<view class="title">{{item.title}}</view>
					<view class="count">购买数量：
						<input type="number" v-model="count[index]" />
						<view class="price">{{item.price*count[index] | currency}}</view>
					</view>
					<button size="mini" @click="changeCount" :data-count="count[index]" :data-ctid="item.courseId">修改</button>
					<button class="del" size="mini" @click="del(item.ctid,item.courseId)">删除</button>
				</view>
			</view>
			<button @click="clearCart">清空购物车</button>
		</view>
		<view v-else>
			<view class="no">购物车空空如也！快去选购吧！</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				count: []
			};
		},
		onLoad() {
			this.info()
		},
		methods: {
			info(){
				uni.request({
					url: this.server.cartList(),
					withCredentials: true,
					success: (res) => {
						let c = []
						this.data = res.data
						res.data.map((item,index)=>{
							return c.push(item.count)
						})
						this.count = c
					}
				})
			},
			del(ctid,cid){
				let data = {
					ctid: ctid,
					cid: cid
				}
				uni.request({
					method: 'POST',
					url: this.server.cartDelete(),
					withCredentials: true,
					data: data,
					success: (res) => {
						uni.showToast({
							title: '删除成功!'
						})
						this.info()
					}
				})
			},
			changeCount(e){
				let data = {
					ctid: e.currentTarget.dataset.ctid,
					count: e.currentTarget.dataset.count
				}
				uni.request({
					method: 'POST',
					url: this.server.cartUpdate(),
					withCredentials: true,
					data: data,
					success: (res) => {
						uni.showToast({
							title: '修改成功！'
						})
					}
				})
			},
			clearCart(){
				uni.request({
					method: 'POST',
					url: this.server.cartClear(),
					withCredentials: true,
					success: (res) => {
						uni.showToast({
							title: '清空成功！'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.cart-list{
	display: flex;
	margin: 30rpx 20rpx;
	align-items: center;
	.pic{
		width: 250rpx;
		margin-right: 20rpx;
	}
	.title{
		font-weight: bold;
	}
	.del{
		margin-left: 30rpx;
	}
	.count{
		display: flex;
		margin: 10rpx 0;
		input{
			margin-left: 20rpx;
			width: 100rpx;
		}
	}
}
.no{
	margin-top: 30rpx;
	text-align: center;
	font-size: $uni-font-size-title;
}
</style>
