const Url = 'http://127.0.0.1:5500';

let ajaxTool = {
    // 校验账户
    checkUser: function (req, callback) {
        fetch(Url + "/api/checkPassword", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req)
            })
            .then(response => response.json())
            .then(data => {
                callback(data);
            })
            .catch(e => console.log("sendAjax报错信息：", e))
    },
    //更新用户具体信息
    updateUser: function (req, callback) {
        fetch(Url + "/api/updateUser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req)
            })
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(e => console.log("报错信息：", e))
    },
    //上传会议附件图片
    uploadImg: function (reqFile, callback) {
        // 模拟form表单上传时的数据结构
        let imgData = new FormData();
        imgData.append('file', reqFile.files[0]);

        fetch(Url + "/api/uploadImg", {
                method: "POST",
                body: imgData
            })
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(e => console.log("报错信息：", e))
    },
    //获取人员信息
    getUserList: function (callback) {
        fetch(Url + "/api/getUserList", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(e => console.log("报错信息：", e))
    },
    //获取会议室信息
    getRoomList: function (callback) {
        fetch(Url + "/api/getRoomList", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(e => console.log("报错信息：", e))
    },
    //新建会议信息
    addMeet: function (meetData, callback) {
        fetch(Url + "/api/addMeet", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(meetData)
            })
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(e => console.log("报错信息：", e))
    },
    //查询会议信息
    findRoom: function (meetData, callback) {
        fetch(Url + "/api/getRoomByAttr", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(meetData)
            })
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(e => console.log("报错信息：", e))
    },
    //获取纪要列表
    getwriteList: function (user, callback) {
        fetch(Url + "/api/getwriteList", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(e => console.log("报错信息：", e))
    },
    //查询纪要信息
    findNote: function (noteData, callback) {
        fetch(Url + "/api/getNoteByAttr", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(noteData)
            })
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(e => console.log("报错信息：", e))
    },
    //更新纪要信息
    updateNote: function (req, callback) {
        fetch(Url + "/api/updateNote", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req)
            })
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(e => console.log("报错信息：", e))
    },
    //获取会议列表
    getMeetList: function (req, callback) {
        fetch(Url + "/api/getMeetList", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req)
            })
            .then(response => response.json())
            .then(data => {
                callback(data)
            })
            .catch(e => console.log("报错信息：", e))
    },
}