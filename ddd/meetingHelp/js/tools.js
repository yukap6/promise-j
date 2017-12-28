let tools = {
    // 设置cookie
    setCookie: (c_name, value, expiredays) => {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        console.log(c_name, value, exdate)
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    },
    // 获取对应cookie
    getCookie: (c_name) => {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    },
    // 删除对应cookie
    delCookie: (name) => {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    // 验证是否为身份证
    isCardNo: (card) => {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(card) === false) {
            return false;
        } else {
            return true;
        }
    },
    // 验证是否为移动电话
    isMobile: (sMobile) => {
        var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
        if (reg.test(sMobile) === false) {
            return false;
        } else {
            return true;
        }
    },
    // 验证是否为邮箱
    isEmail: (email) => {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (reg.test(email) === false) {
            return false;
        } else {
            return true;
        }
    },
    // 获取对应的参数
    getQuery: (name) => {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var data = window.location.search.substr(1).match(reg);
        if (data != null) {
            return decodeURI(data[2]);
        }
        return null;
    },
}