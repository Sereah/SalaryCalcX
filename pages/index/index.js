Page({

    data: {
        showHintWindow: false,

        vBeforeSalary: "",
        vBeforeProvidentFund: "",
        vBeforeProvidentFundPer: "",
        vBeforeSocial: "",
        vBeforeBonus: "",
        vBeforeBonusMonth: "",

        vAfterSalary: "",
        vAfterProvidentFund: "",
        vAfterProvidentFundPer: "",
        vAfterSocial: "",
        vAfterBonus: "",
        vAfterBonusMonth: "",

        vTax: "",
        vOtherTax: "",

        clear_image_before: "/assert/index/删除.png",
        clear_image_after: "/assert/index/删除.png",
        clear_image_together: "/assert/index/删除.png",
        tap_clear_image: "/assert/index/删除_aactive.png",
        default_clear_image: "/assert/index/删除.png",
    },

    /* *********************************** 计算须知弹窗 *********************************** */

    tapShowHintWindow: function () {
        this.setData({
            showHintWindow: true
        })
    },

    tapHideHintWindow: function () {
        this.setData({
            showHintWindow: false
        })
    },

    /* *********************************** 旧薪资卡片 *********************************** */

    //月薪
    inputBeforeSalary: function (e) {
        this.data.vBeforeSalary = this._handleCorrentSalaryInput(e, "vBeforeSalary");
    },

    //公积金基数
    inputBeforeProvidentFund: function (e) {
        this.data.vBeforeProvidentFund = this._handleCorrentSalaryInput(e, "vBeforeProvidentFund");
    },

    //公积金比例
    inputBeforeProvidentFundPer: function (e) {
        this.data.vBeforeProvidentFundPer = this._handleProvidentFundPerInput(e, "vBeforeProvidentFundPer");
    },

    //社保
    inputBeforeSocial: function (e) {
        this.data.vBeforeSocial = this._handleCorrentSalaryInput(e, "vBeforeSocial");
    },

    //年终奖
    inputBeforeBonus: function (e) {
        this.data.vBeforeBonus = this._handleCorrentSalaryInput(e, "vBeforeBonus");
    },

    //年终奖月数
    inputBeforeBonusMonth: function (e) {
        this.data.vBeforeBonusMonth = this._handleCorrentMonthInput(e, "vBeforeBonusMonth");
    },

    //清除按钮
    tapClearBefore: function () {
        this.setData({
            vBeforeSalary: "",
            vBeforeProvidentFund: "",
            vBeforeProvidentFundPer: "",
            vBeforeSocial: "",
            vBeforeBonus: "",
            vBeforeBonusMonth: "",
        })
    },

    //清除按钮按压效果
    touchClearStartBefore: function () {
        this.setData({
            clear_image_before: this.data.tap_clear_image,
        })
    },

    //清除按钮按压效果
    touchClearEndBefore: function () {
        this.setData({
            clear_image_before: this.data.default_clear_image,
        })
    },

    /* *********************************** 新薪资卡片 *********************************** */

    //月薪
    inputAfterSalary: function (e) {
        this.data.vAfterSalary = this._handleCorrentSalaryInput(e, "vAfterSalary");
    },

    //公积金
    inputAfterProvidentFund: function (e) {
        this.data.vAfterProvidentFund = this._handleCorrentSalaryInput(e, "vAfterProvidentFund");
    },

    //公积金比例
    inputAfterProvidentFundPer: function (e) {
        this.data.vAfterProvidentFundPer = this._handleProvidentFundPerInput(e, "vAfterProvidentFundPer");
    },

    //社保
    inputAfterSocial: function (e) {
        this.data.vAfterSocial = this._handleCorrentSalaryInput(e, "vAfterSocial");
    },

    //年终奖
    inputAfterBonus: function (e) {
        this.data.vAfterBonus = this._handleCorrentSalaryInput(e, "vAfterBonus");
    },

    //年终奖月数
    inputAfterBonusMonth: function (e) {
        this.data.vAfterBonusMonth = this._handleCorrentMonthInput(e, "vAfterBonusMonth");
    },

    //清除按钮
    tapClearAfter: function () {
        this.setData({
            vAfterSalary: "",
            vAfterProvidentFund: "",
            vAfterProvidentFundPer: "",
            vAfterSocial: "",
            vAfterBonus: "",
            vAfterBonusMonth: "",
        })
    },

    //清除按钮按压效果
    touchClearStartAfter: function () {
        this.setData({
            clear_image_after: this.data.tap_clear_image,
        })
    },

    //清除按钮按压效果
    touchClearEndAfter: function () {
        this.setData({
            clear_image_after: this.data.default_clear_image,
        })
    },

    /* *********************************** 个税扣除选择 *********************************** */
    //专项附加输入框
    inputTax: function (e) {
        this.data.vTax = this._handleCorrentSalaryInput(e, "vTax");
    },

    //其他免税收入输入框
    inputOtherTax: function (e) {
        this.data.vOtherTax = this._handleCorrentSalaryInput(e, "vOtherTax");
    },

    //清除内容
    tapClearTogether: function () {
        this.setData({
            vTax: "",
            vOtherTax: "",
        })
    },

    //清除按钮按压效果
    touchClearStartTogether: function () {
        this.setData({
            clear_image_together: this.data.tap_clear_image,
        })
    },

    //清除按钮按压效果
    touchClearEndTogether: function () {
        this.setData({
            clear_image_together: this.data.default_clear_image,
        })
    },

    /* *********************************** 计算详情按钮 *********************************** */

    tapCalcx: function () {
        const appData = getApp().globalData;

        appData.__vBeforeSalary = this.data.vBeforeSalary;
        appData.__vBeforeProvidentFund = this.data.vBeforeProvidentFund;
        appData.__vBeforeProvidentFundPer = this.data.vBeforeProvidentFundPer;
        appData.__vBeforeSocial = this.data.vBeforeSocial;
        appData.__vBeforeBonus = this.data.vBeforeBonus;
        appData.__vBeforeBonusMonth = this.data.vBeforeBonusMonth;
        appData.__vAfterSalary = this.data.vAfterSalary;
        appData.__vAfterProvidentFund = this.data.vAfterProvidentFund;
        appData.__vAfterProvidentFundPer = this.data.vAfterProvidentFundPer;
        appData.__vAfterSocial = this.data.vAfterSocial;
        appData.__vAfterBonus = this.data.vAfterBonus;
        appData.__vAfterBonusMonth = this.data.vAfterBonusMonth;
        appData.__vTax = this.data.vTax;
        appData.__vOtherTax = this.data.vOtherTax;

        wx.switchTab({
            url: '/pages/book/book',
        })
    },

    /* *********************************** 通用方法 *********************************** */

    _handleProvidentFundPerInput: function (e, fieldName) {
        const value = e.detail.value;
        const num = Number(value);
        if (/^\d*\.?\d{0,3}$/.test(value) && num >= 0.001 && num <= 100.000) {
            this.setData({
                [fieldName]: value
            });
            return value;
        } else {
            this.setData({
                [fieldName]: ""
            });
            wx.showToast({
                title: '输入的比例不正确，请重新输入',
                icon: "none",
                duration: 2000
            });
            return null;
        }
    },

    _handleCorrentSalaryInput: function (e, fieldName) {
        const value = e.detail.value;
        const num = Number(value);
        if (num >= 0 && num < 100000000) {
            this.setData({
                [fieldName]: value
            });
            return num;
        } else {
            this.setData({
                [fieldName]: ""
            });
            wx.showToast({
                title: '输入的金额过大或为空，请重新输入',
                icon: "none",
                duration: 2000
            });
            return null;
        }
    },

    _handleCorrentMonthInput: function (e, fieldName) {
        const value = e.detail.value;
        const num = Number(value);
        if (/^\d*\.?\d{0,3}$/.test(value) && num >= 0.000 && num <= 1000.000) {
            this.setData({
                [fieldName]: value
            });
            return value;
        } else {
            this.setData({
                [fieldName]: ""
            });
            wx.showToast({
                title: '输入的月份过大，请重新输入',
                icon: "none",
                duration: 2000
            });
            return null;
        }
    },
});


