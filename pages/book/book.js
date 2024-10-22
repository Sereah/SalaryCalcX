import * as echarts from '../../ec-canvas/echarts';

const appData = getApp().globalData;

Page({
	data: {
		ec: {
			lazyLoad: true // 懒加载
		},
		salaryImg: "/assert/index/持平.png",
		salaryImg_default: "/assert/index/持平.png",
		salaryImg_up: "/assert/index/涨幅.png",
		salaryImg_down: "/assert/index/下跌.png",
		salaryColor: "#717171",

		providentImg: "/assert/index/持平.png",
		providentImg_default: "/assert/index/持平.png",
		providentImg_up: "/assert/index/涨幅.png",
		providentImg_down: "/assert/index/下跌.png",
		providentColor: "#717171",

		bonusImg: "/assert/index/持平.png",
		bonusImg_default: "/assert/index/持平.png",
		bonusImg_up: "/assert/index/涨幅.png",
		bonusImg_down: "/assert/index/下跌.png",
		bonusColor: "#717171",

		yearTaxImg: "/assert/index/持平.png",
		yearTaxImg_default: "/assert/index/持平.png",
		yearTaxImg_up: "/assert/index/涨幅.png",
		yearTaxImg_down: "/assert/index/下跌.png",
		yearTaxColor: "#717171",

		yearImg: "/assert/index/持平.png",
		yearImg_default: "/assert/index/持平.png",
		yearImg_up: "/assert/index/涨幅.png",
		yearImg_down: "/assert/index/下跌.png",
		yearColor: "#717171",

		//月薪
		salaryOld: 0,
		salaryNew: 0,
		salaryPer: 0.0,

		//年度公积金
		providentFundOld: 0,
		providentFundNew: 0,
		providentFundPer: 0.0,

		//年终奖
		bonusOld: 0,
		bonusNew: 0,
		bonusPer: 0.0,

		//税前年薪
		yearTaxOld: 0,
		yearTaxNew: 0,
		yearTaxPer: 0.0,

		//税后年薪
		yearOld: 0,
		yearNew: 0,
		yearPer: 0.0,

		//税后月薪
		janOld: 0,
		janNew: 0,
		febOld: 0,
		febNew: 0,
		marOld: 0,
		marNew: 0,
		aprOld: 0,
		aprNew: 0,
		mayOld: 0,
		mayNew: 0,
		junOld: 0,
		junNew: 0,
		julOld: 0,
		julNew: 0,
		augOld: 0,
		augNew: 0,
		sepOld: 0,
		sepNew: 0,
		octOld: 0,
		octNew: 0,
		novOld: 0,
		novNew: 0,
		decOld: 0,
		decNew: 0,

		showYearWindow: false,
		yearDetalBoxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
		reImage: "/assert/index/翻转.png",
		isYearNew: false,
	},

	onShareAppMessage() {
		return {
			title: '税前税后工资计算',
			path: '/pages/book/book',
		};
	},

	onShareTimeline() {
		return {
			title: '税前税后工资计算',
			path: '/pages/book/book',
		};
	},

	onShow: function () {

		//月薪
		this._calcxSalary();

		//年度公积金
		this._calcxProvidentFund();

		//年终奖
		this._calcxBonus();

		//税前年薪
		this._calcxYearBeforeTax();

		//税后月薪/年薪
		this._calcxYearAfterTax();

		this.echartsComponent = this.selectComponent('#mychart-dom-bar');
		this.initChart();
	},

	/* *********************************** 卡片展示方法 *********************************** */

	//月薪卡片
	_calcxSalary: function () {
		//月薪
		let salaryN = 0;
		let salaryO = 0;
		let salaryP = 0.0;
		if (appData.__vAfterSalary != "") {
			salaryN = appData.__vAfterSalary;
		}
		if (appData.__vBeforeSalary != "") {
			salaryO = appData.__vBeforeSalary;
		}

		if (salaryN != 0 && salaryO != 0) {
			salaryP = (((salaryN - salaryO) / salaryO) * 100);
		}

		if (salaryP > 0) {
			this.setData({
				salaryImg: this.data.salaryImg_up,
				salaryColor: "#D11C14",
			})
		} else if (salaryP == 0) {
			this.setData({
				salaryImg: this.data.salaryImg_default,
				salaryColor: "#717171",
			})
		} else {
			this.setData({
				salaryImg: this.data.salaryImg_down,
				salaryColor: "#717171",
			})
		}

		this.setData({
			salaryNew: salaryN.toFixed(2),
			salaryOld: salaryO.toFixed(2),
			salaryPer: salaryP.toFixed(2),
		})
	},

	//年度公积金卡片
	_calcxProvidentFund: function () {
		// providentFundOld: 0,
		// providentFundNew: 0,
		// providentFundPer: 0.0,
		let pfo = 0;
		let pfn = 0;
		let pfp = 0;

		if (appData.__vBeforeProvidentFund != "" && appData.__vBeforeProvidentFundPer) {
			pfo = appData.__vBeforeProvidentFund * (appData.__vBeforeProvidentFundPer / 100) * 12 * 2;
		}

		if (appData.__vAfterProvidentFund != "" && appData.__vAfterProvidentFundPer) {
			pfn = appData.__vAfterProvidentFund * (appData.__vAfterProvidentFundPer / 100) * 12 * 2;
		}

		if (pfo != 0 && pfn != 0) {
			pfp = (((pfn - pfo) / pfo) * 100);
		}

		if (pfp > 0) {
			this.setData({
				providentImg: this.data.providentImg_up,
				providentColor: "#D11C14",
			})
		} else if (pfp == 0) {
			this.setData({
				providentImg: this.data.providentImg_default,
				providentColor: "#717171",
			})
		} else {
			this.setData({
				providentImg: this.data.providentImg_down,
				providentColor: "#717171",
			})
		}

		this.setData({
			providentFundOld: pfo.toFixed(2),
			providentFundNew: pfn.toFixed(2),
			providentFundPer: pfp.toFixed(2),
		})
	},

	//年终奖卡片
	_calcxBonus: function () {
		let bn = 0;
		let bo = 0;
		let bp = 0.0;

		if (appData.__vBeforeBonus != "" && appData.__vBeforeBonusMonth != "") {
			bo = appData.__vBeforeBonus * appData.__vBeforeBonusMonth;
		}

		if (appData.__vAfterBonus != "" && appData.__vAfterBonusMonth != "") {
			bn = appData.__vAfterBonus * appData.__vAfterBonusMonth;
		}

		if (bo != 0 && bn != 0) {
			bp = (((bn - bo) / bo) * 100);
		}

		if (bp > 0) {
			this.setData({
				bonusImg: this.data.bonusImg_up,
				bonusColor: "#D11C14",
			})
		} else if (bp == 0) {
			this.setData({
				bonusImg: this.data.bonusImg_default,
				bonusColor: "#717171",
			})
		} else {
			this.setData({
				bonusImg: this.data.bonusImg_down,
				bonusColor: "#717171",
			})
		}

		this.setData({
			bonusNew: bn.toFixed(2),
			bonusOld: bo.toFixed(2),
			bonusPer: bp.toFixed(2),
		})
	},

	//税前年薪卡片
	_calcxYearBeforeTax: function () {
		let yto = 0;
		let ytn = 0;
		let ytp = 0.0;

		const salaryOld = this._handleSalary(appData.__vBeforeSalary);
		const salaryNew = this._handleSalary(appData.__vAfterSalary);
		const providentOld = this._handleProvident(appData.__vBeforeProvidentFund, appData.__vBeforeProvidentFundPer);
		const providentNew = this._handleProvident(appData.__vAfterProvidentFund, appData.__vAfterProvidentFundPer);
		const bonusOld = this._handleBonus(appData.__vBeforeBonus, appData.__vBeforeBonusMonth);
		const bonusNew = this._handleBonus(appData.__vAfterBonus, appData.__vAfterBonusMonth);
		yto = salaryOld + providentOld + bonusOld;
		ytn = salaryNew + providentNew + bonusNew;

		if (yto != 0 && ytn != 0) {
			ytp = (((ytn - yto) / yto) * 100);
		}

		if (ytp > 0) {
			this.setData({
				yearTaxImg: this.data.yearTaxImg_up,
				yearTaxColor: "#D11C14",
			})
		} else if (ytp == 0) {
			this.setData({
				yearTaxImg: this.data.yearTaxImg_default,
				yearTaxColor: "#717171",
			})
		} else {
			this.setData({
				yearTaxImg: this.data.yearTaxImg_down,
				yearTaxColor: "#717171",
			})
		}

		this.setData({
			yearTaxOld: yto.toFixed(2),
			yearTaxNew: ytn.toFixed(2),
			yearTaxPer: ytp.toFixed(2),
		})
	},

	//税后年薪/月薪卡片
	_calcxYearAfterTax: function () {
		let o1 = this._handleTaxMonth(1,
			appData.__vBeforeSalary, (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100),
			(appData.__vBeforeSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let o2 = this._handleTaxMonth(2,
			appData.__vBeforeSalary, (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100),
			(appData.__vBeforeSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let o3 = this._handleTaxMonth(3,
			appData.__vBeforeSalary, (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100),
			(appData.__vBeforeSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let o4 = this._handleTaxMonth(4,
			appData.__vBeforeSalary, (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100),
			(appData.__vBeforeSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let o5 = this._handleTaxMonth(5,
			appData.__vBeforeSalary, (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100),
			(appData.__vBeforeSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let o6 = this._handleTaxMonth(6,
			appData.__vBeforeSalary, (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100),
			(appData.__vBeforeSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let o7 = this._handleTaxMonth(7,
			appData.__vBeforeSalary, (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100),
			(appData.__vBeforeSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let o8 = this._handleTaxMonth(8,
			appData.__vBeforeSalary, (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100),
			(appData.__vBeforeSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let o9 = this._handleTaxMonth(9,
			appData.__vBeforeSalary, (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100),
			(appData.__vBeforeSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let o10 = this._handleTaxMonth(10,
			appData.__vBeforeSalary, (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100),
			(appData.__vBeforeSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let o11 = this._handleTaxMonth(11,
			appData.__vBeforeSalary, (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100),
			(appData.__vBeforeSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let o12 = this._handleTaxMonth(12,
			appData.__vBeforeSalary, (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100),
			(appData.__vBeforeSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));

		let n1 = this._handleTaxMonth(1,
			appData.__vAfterSalary, (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100),
			(appData.__vAfterSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let n2 = this._handleTaxMonth(2,
			appData.__vAfterSalary, (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100),
			(appData.__vAfterSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let n3 = this._handleTaxMonth(3,
			appData.__vAfterSalary, (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100),
			(appData.__vAfterSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let n4 = this._handleTaxMonth(4,
			appData.__vAfterSalary, (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100),
			(appData.__vAfterSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let n5 = this._handleTaxMonth(5,
			appData.__vAfterSalary, (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100),
			(appData.__vAfterSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let n6 = this._handleTaxMonth(6,
			appData.__vAfterSalary, (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100),
			(appData.__vAfterSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let n7 = this._handleTaxMonth(7,
			appData.__vAfterSalary, (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100),
			(appData.__vAfterSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let n8 = this._handleTaxMonth(8,
			appData.__vAfterSalary, (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100),
			(appData.__vAfterSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let n9 = this._handleTaxMonth(9,
			appData.__vAfterSalary, (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100),
			(appData.__vAfterSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let n10 = this._handleTaxMonth(10,
			appData.__vAfterSalary, (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100),
			(appData.__vAfterSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let n11 = this._handleTaxMonth(11,
			appData.__vAfterSalary, (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100),
			(appData.__vAfterSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));
		let n12 = this._handleTaxMonth(12,
			appData.__vAfterSalary, (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100),
			(appData.__vAfterSocial * 0.105), ((appData.__vTax + appData.__vOtherTax) / 12));

		this.setData({
			janOld: (appData.__vBeforeSalary - o1 - (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100) - (appData.__vBeforeSocial * 0.105)).toFixed(2),
			janNew: (appData.__vAfterSalary - n1 - (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100) - (appData.__vAfterSocial * 0.105)).toFixed(2),

			febOld: (appData.__vBeforeSalary - o2 - (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100) - (appData.__vBeforeSocial * 0.105)).toFixed(2),
			febNew: (appData.__vAfterSalary - n2 - (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100) - (appData.__vAfterSocial * 0.105)).toFixed(2),

			marOld: (appData.__vBeforeSalary - o3 - (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100) - (appData.__vBeforeSocial * 0.105)).toFixed(2),
			marNew: (appData.__vAfterSalary - n3 - (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100) - (appData.__vAfterSocial * 0.105)).toFixed(2),

			aprOld: (appData.__vBeforeSalary - o4 - (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100) - (appData.__vBeforeSocial * 0.105)).toFixed(2),
			aprNew: (appData.__vAfterSalary - n4 - (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100) - (appData.__vAfterSocial * 0.105)).toFixed(2),

			mayOld: (appData.__vBeforeSalary - o5 - (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100) - (appData.__vBeforeSocial * 0.105)).toFixed(2),
			mayNew: (appData.__vAfterSalary - n5 - (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100) - (appData.__vAfterSocial * 0.105)).toFixed(2),

			junOld: (appData.__vBeforeSalary - o6 - (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100) - (appData.__vBeforeSocial * 0.105)).toFixed(2),
			junNew: (appData.__vAfterSalary - n6 - (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100) - (appData.__vAfterSocial * 0.105)).toFixed(2),

			julOld: (appData.__vBeforeSalary - o7 - (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100) - (appData.__vBeforeSocial * 0.105)).toFixed(2),
			julNew: (appData.__vAfterSalary - n7 - (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100) - (appData.__vAfterSocial * 0.105)).toFixed(2),

			augOld: (appData.__vBeforeSalary - o8 - (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100) - (appData.__vBeforeSocial * 0.105)).toFixed(2),
			augNew: (appData.__vAfterSalary - n8 - (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100) - (appData.__vAfterSocial * 0.105)).toFixed(2),

			sepOld: (appData.__vBeforeSalary - o9 - (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100) - (appData.__vBeforeSocial * 0.105)).toFixed(2),
			sepNew: (appData.__vAfterSalary - n9 - (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100) - (appData.__vAfterSocial * 0.105)).toFixed(2),

			octOld: (appData.__vBeforeSalary - o10 - (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100) - (appData.__vBeforeSocial * 0.105)).toFixed(2),
			octNew: (appData.__vAfterSalary - n10 - (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100) - (appData.__vAfterSocial * 0.105)).toFixed(2),

			novOld: (appData.__vBeforeSalary - o11 - (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100) - (appData.__vBeforeSocial * 0.105)).toFixed(2),
			novNew: (appData.__vAfterSalary - n11 - (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100) - (appData.__vAfterSocial * 0.105)).toFixed(2),

			decOld: (appData.__vBeforeSalary - o12 - (appData.__vBeforeProvidentFund * appData.__vBeforeProvidentFundPer / 100) - (appData.__vBeforeSocial * 0.105)).toFixed(2),
			decNew: (appData.__vAfterSalary - n12 - (appData.__vAfterProvidentFund * appData.__vAfterProvidentFundPer / 100) - (appData.__vAfterSocial * 0.105)).toFixed(2),
		})

		let yearO = Number(this.data.janOld) + Number(this.data.febOld) + Number(this.data.marOld) + Number(this.data.aprOld) + Number(this.data.mayOld) + Number(this.data.junOld) + Number(this.data.julOld) + Number(this.data.julOld) + Number(this.data.sepOld) + Number(this.data.octOld) + Number(this.data.novOld) + Number(this.data.decOld);
		let yearN = Number(this.data.janNew) + Number(this.data.febNew) + Number(this.data.marNew) + Number(this.data.aprNew) + Number(this.data.mayNew) + Number(this.data.junNew) + Number(this.data.julNew) + Number(this.data.augNew) + Number(this.data.sepNew) + Number(this.data.octNew) + Number(this.data.novNew) + Number(this.data.decNew);

		if (yearO == "" || isNaN(yearO)) {
			yearO = 0;
		}

		if (yearN == "" || isNaN(yearN)) {
			yearN = 0;
		}

		//税后年终奖（年终奖不计入综合所得）
		let bonusO = appData.__vBeforeBonus * appData.__vBeforeBonusMonth - this._handleTaxPer(appData.__vBeforeBonus * appData.__vBeforeBonusMonth);
		let bonusN = appData.__vAfterBonus * appData.__vAfterBonusMonth - this._handleTaxPer(appData.__vAfterBonus * appData.__vAfterBonusMonth);

		yearO = yearO + bonusO;
		yearN = yearN + bonusN;

		this.setData({
			yearOld: yearO.toFixed(2),
			yearNew: yearN.toFixed(2),
		})

		if (this.data.yearOld != 0 && this.data.yearNew != 0) {
			this.setData({
				yearPer: (((this.data.yearNew - this.data.yearOld) / this.data.yearOld) * 100).toFixed(2),
			})
		}

		if (this.data.yearPer > 0) {
			this.setData({
				yearImg: this.data.yearImg_up,
				yearColor: "#D11C14",
			})
		} else if (this.data.yearPer == 0) {
			this.setData({
				yearImg: this.data.yearImg_default,
				yearColor: "#717171",
			})
		} else {
			this.setData({
				yearImg: this.data.yearImg_down,
				yearColor: "#717171",
			})
		}
	},

	//计算税前月薪*12
	_handleSalary: function (salary) {
		if (salary != "") {
			return salary * 12;
		} else {
			return 0;
		}
	},

	//计算全年公积金
	_handleProvident: function (provident, providentPer) {
		if (provident != "" && providentPer != "") {
			return (providentPer * (provident / 100)) * 2 * 12;
		} else {
			return 0;
		}
	},

	//计算年终奖
	_handleBonus: function (bonus, month) {
		if (bonus != "" && month != "") {
			return bonus * month;
		} else {
			return 0;
		}
	},

	//计算月纳税额
	_handleTaxMonth: function (index, salaryMonth, providentMonth, socialMonth, tax) {
		//本月累计收入
		let currentSalarySum = 0;
		//本月累计五险一金
		let currentSocialAndProvidentSum = 0;
		//本月累计扣除和
		let currentTaxSum = 0;
		//本月累计起征额
		let currentStartTaxSum = 0;
		//本月应纳税所得额
		let currentShouldTaxSum = 0;

		//上月累计收入
		let lastSalarySum = 0;
		//上月累计五险一金
		let lastSocialAndProvidentSum = 0;
		//上月累计扣除和
		let lastTaxSum = 0;
		//上月累计起征额
		let lastStartTaxSum = 0;
		//上月应纳税所得额
		let lastShouldTaxSum = 0;

		//累计应纳税额
		let allTax = 0;
		//已缴纳税额
		let haveTax = 0;

		if (salaryMonth > 0) {
			currentSalarySum = salaryMonth * index;
			currentSocialAndProvidentSum = (providentMonth + socialMonth) * index;
			currentTaxSum = tax * index;
			currentStartTaxSum = 5000 * index;

			lastSalarySum = currentSalarySum - salaryMonth;
			lastSocialAndProvidentSum = currentSocialAndProvidentSum - (providentMonth + socialMonth);
			lastTaxSum = currentTaxSum - tax;
			lastStartTaxSum = currentStartTaxSum - 5000;

			currentShouldTaxSum = currentSalarySum - currentSocialAndProvidentSum - currentTaxSum - currentStartTaxSum;
			lastShouldTaxSum = lastSalarySum - lastSocialAndProvidentSum - lastTaxSum - lastStartTaxSum;

			allTax = this._handleTaxPer(currentShouldTaxSum);
			haveTax = this._handleTaxPer(lastShouldTaxSum);

			return allTax - haveTax;
		}
	},

	_handleTaxPer(taxSum) {
		if (taxSum > 0 && taxSum <= 36000) {
			return taxSum * 0.03;
		} else if (taxSum > 36000 && taxSum <= 144000) {
			return taxSum * 0.1 - 2520;
		} else if (taxSum > 144000 && taxSum <= 300000) {
			return taxSum * 0.2 - 16920;
		} else if (taxSum > 300000 && taxSum <= 420000) {
			return taxSum * 0.25 - 31920;
		} else if (taxSum > 420000 && taxSum <= 660000) {
			return taxSum * 0.3 - 52920;
		} else if (taxSum > 660000 && taxSum <= 960000) {
			return taxSum * 0.35 - 85920;
		} else if (taxSum > 960000) {
			return taxSum * 0.45 - 181920;
		} else {
			return 0;
		}
	},

	/* *********************************** 图表 *********************************** */

	onLoad: function () {
	},

	initChart: function () {
		this.echartsComponent.init((canvas, width, height, dpr) => {
			const chart = echarts.init(canvas, null, {
				width: width,
				height: height,
				devicePixelRatio: dpr
			});

			const dataOld = [this.data.salaryOld, this.data.providentFundOld, this.data.bonusOld, this.data.yearTaxOld, this.data.yearOld,];
			const dataNew = [this.data.salaryNew, this.data.providentFundNew, this.data.bonusNew, this.data.yearTaxNew, this.data.yearNew,];

			const option = {
				title: {
					text: '综合对比'
				},
				legend: {
					data: ['新', '旧']
				},
				grid: {
					left: '16%',
					right: '5%',
					top: '20%',
					bottom: '25%'
				},
				tooltip: {
					trigger: 'axis'
				},
				xAxis: {
					type: 'category',
					data: ['月薪', '公积金', '年终奖', '税前年薪', '税后年薪'],
					axisLabel: {
						formatter: function (value) {
							return value.split("").join("\n"); // 每个字符换行
						}
					}
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: '旧',
						type: 'bar',
						data: [dataOld[0], dataOld[1], dataOld[2], dataOld[3], dataOld[4]],
						itemStyle: {
							color: '#bfbfbf'
						}
					},
					{
						name: '新',
						type: 'bar',
						data: [dataNew[0], dataNew[1], dataNew[2], dataNew[3], dataNew[4]],
						itemStyle: {
							color: '#dd6572'
						}
					},

				]
			};

			chart.setOption(option);
			return chart;
		});
	},

	/* *********************************** 详情点击 *********************************** */
	tapHideYearWindow: function () {
		this.setData({
			showYearWindow: false
		})
	},

	tapShowYearWindow: function () {
		console.log("old: ", this.data.yearOld);
		console.log("new: ", this.data.yearNew);
		if (this.data.yearNew == 0 && this.data.yearOld == 0) {
			wx.showToast({
				title: '税后年薪为空, 无法查看详情。',
				icon: "none",
				duration: 2000
			});
			return;
		}
		this.setData({
			showYearWindow: true
		})
	},

	touchYearDetailStart: function () {
		this.setData({
			yearDetalBoxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
		})
	},

	touchYearDetailEnd: function () {
		this.setData({
			yearDetalBoxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
		})
	},

	tapYearWindowRe: function () {
		if (this.data.isYearNew) {
			this.setData({
				isYearNew: false
			})
		} else {
			this.setData({
				isYearNew: true
			})
		}
	},

	touchReStart: function () {
		this.setData({
			reImage: "/assert/index/翻转_active.png"
		})
	},

	touchReEnd: function () {
		this.setData({
			reImage: "/assert/index/翻转.png"
		})
	},

	tapCatch: function () { }
});
