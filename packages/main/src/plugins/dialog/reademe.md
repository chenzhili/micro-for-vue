### 【参数没校验，必填的必传】

# ConfirmDialog

参数：

| 参数名    | type    | 默认       | 是否必须 | 说明                   |
| --------- | ------- | ---------- | -------- | ---------------------- |
| message   | String  | 请输入提示 | 是       | 提示主文本             |
| sub       | String  | 空字串     | 否       | 提示副文本             |
| maskClose | Boolean | false      | 否       | 是否可点击蒙层关闭弹窗 |

返回一个 Promise 对象，

|         | 参数 | 说明                                                                                        |
| ------- | ---- | ------------------------------------------------------------------------------------------- |
| resolve | e    | 点击确认按钮时返回，e = 'confirm'                                                           |
| reject  | e    | 点击蒙层、关闭按钮、取消按钮时返回；点击蒙层、关闭按钮(e = 'close')，取消按钮(e = 'cancel') |

使用：

```
 this.$confirmDialog({
	 message: '确认要接触与微信的绑定嘛？',
	 sub: '解绑后，将不能使用微信登录高校新平台',
	 maskClose: true
 }).then(res => {
	 	console.log(res)
	 }).catch(e => {
	 	console.log(e)
	 })
```

# HomeDialog

参数：

| 参数名    | type    | 默认   | 是否必须 | 说明                   |
| --------- | ------- | ------ | -------- | ---------------------- |
| image     | String  | 空字串 | 是       | 首页弹窗图片地址       |
| maskClose | Boolean | false  | 否       | 是否可点击蒙层关闭弹窗 |

返回一个 Promise 对象，

|         | 参数 | 说明                            |
| ------- | ---- | ------------------------------- |
| resolve | e    | 点击图片时返回，e = 'confirm'   |
| reject  | e    | 点击蒙层、关闭按钮，e = 'close' |

使用：

```
 this.$homeDialog({
	 image: 'https://xxxx/ad.png',
	 maskClose: true
 }).then(res => {
	 	console.log(res)
	 }).catch(e => {
	 	console.log(e)
	 })
```

# ApplyDialog

参数：

| 参数名    | type    | 默认   | 是否必须 | 说明                   |
| --------- | ------- | ------ | -------- | ---------------------- |
| image     | String  | 空字串 | 是       | 广告图片地址           |
| maskClose | Boolean | false  | 否       | 是否可点击蒙层关闭弹窗 |

返回一个 Promise 对象，

|         | 参数 | 说明                              |
| ------- | ---- | --------------------------------- |
| resolve | e    | 点击进入比赛时返回，e = 'confirm' |
| reject  | e    | 点击蒙层、关闭按钮，e = 'close'   |

使用：

```
 this.$applyDialog({
	 image: 'https://xxxx/ad.png',
	 maskClose: true
 }).then(res => {
	 	console.log(res)
	 }).catch(e => {
	 	console.log(e)
	 })
```
