(function () {
    // 提示信息    
    let username = tools.getCookie('username');

    const err = new Err(errMes);

    const name = document.querySelector('#name');
    const detail = document.querySelector('#detail');
    const newsPic = document.querySelector('#newsPic');
    const start = document.querySelector('#start');
    const show_time = document.querySelector('#show_time');
    const time_choose = document.querySelector('#time_choose');
    const end = document.querySelector('#end');
    const room = document.querySelector('#room');
    const sponsor = document.querySelector('#sponsor');
    const join = document.querySelector('#join');
    const canRead = document.querySelector('#canRead');
    const autoJoin = document.querySelector('#autoJoin');
    const save = document.querySelector('#save');

    const now = new Date();

    // 加载会议地点
    // ajaxTool.getRoomList((data) => {
    //     var dom = '';
    //     data.roomList.map((data) => {
    //         dom += '<li>' + data.rName + '</li>';
    //     });

    //     // 在会议地点中加载
    //     room.parentElement.querySelector('ul').innerHTML = dom;

    //     // 根据传递来的参数自动选择当前的会议室地点，然后click
    //     var place = tools.getQuery('place');
    //     room.parentNode.querySelectorAll('ul li').forEach((e)=>{
    //         if(e.innerHTML == place){
    //             e.click();
    //         }
    //     });
    // });
    // 加载会议人物
    ajaxTool.getUserList((data) => {
        var dom = '';
        data.userList.map((data) => {
            dom += '<li>' + data.name + '</li>';
        });

        // 在发起人中加载
        sponsor.parentElement.querySelector('ul').innerHTML = dom;
        // 在参会人中加载
        join.innerHTML = dom;
    });

    // -----------------------------------

    // 获取已经选择的dom的内容
    function getListText(list) {
        var data = [];
        list.forEach(element => {
            data.push(element.innerHTML);
        });
        return data;
    }

    // 上传文件
    // 问题：live server后，上传文件后会刷新页面
    const upLoadPicBtn = document.querySelector('#upLoadPicBtn');
    const uploadImg = document.querySelector('#uploadImg');
    upLoadPicBtn.addEventListener('click', () => {
        if (!newsPic.files.length) {
            alert('请选择文件后再上传！');
            return false;
        }
        // 临时禁用保存按钮
        save.className = 'stop';
        ajaxTool.uploadImg(newsPic, (req) => {
            uploadImg.src = 'http://192.168.199.206:5500/uploads/' + req.filePath;
            // alert("上传完毕！");

            // 开启保存功能
            save.className = 'success';
        });
    });

    // 开始时间小于结束时间
    start.addEventListener('change', () => {
        // 开始时间不能小于当前时间
        start.min = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T' + now.getHours() + ':' + now.getMinutes();
        // 如果先填写了结束时间，开始时间不能大于结束时间
        // if (end.value) {
        //     start.max = end.value;
        // }
        var st_time = start.value.replace(/-/g,"/");
        //console.log(st_time);
        //获取当前日期
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1; 
        month = month < 10 ? ("0" + month) : month;
        var dt = d.getDate();
        dt = dt < 10 ? ("0" + dt) : dt;
        var today = year + "/" + month + "/" + dt;
        //console.log(today);
        if(st_time>=today){
            // 加载会议地点
            ajaxTool.getRoomList((data) => {
                var dom = '';
                data.roomList.map((data) => {
                    if(data.rStatus == 1){
                        dom += '<ul>';
                        dom += '<li>' + data.rName + '</li>';
                        dom += '<li class="choose_percent"></li>';
                        dom += '</ul>';
                        show_time.innerHTML = dom;
                    }  
                });
            });
            // 加载会议列表
            ajaxTool.getMeetList({
                'user': username
            }, (data) => {
                data.meetList.map((data) => {
                    if(st_time == data.mStartTime.split(" ")[0]){
                        var begin_time = data.mStartTime.split(" ")[1];
                        console.log(begin_time);
                        var end_time = data.mEndTime.split(" ")[1];
                        console.log(end_time);
                        time_choose.querySelectorAll('td').forEach((e)=>{
                            if(e.innerHTML >= begin_time && e.innerHTML <= end_time){
                                e.classList.add("not_choose");
                            }
                        });
                    }  
                });
            });

            
        }
        else{
            err.errMesShow('不能选择已经过去的时间，请重新选择');
            return false;
        }
    });
    function time_choosed(){
        
    }

    //结束时间大于开始时间
    // end.addEventListener('focus', () => {
    //     // 结束时间不能小于当前时间
    //     start.min = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T' + now.getHours() + ':' + now.getMinutes();
    //     // 如果填写了开始时间,结束时间必须大于开始时间
    //     if (start.value) {
    //         end.min = start.value;
    //     }
    // });

    // 保存后获取对应位置的信息
    save.addEventListener('click', () => {
        let joinList = getListText(join.querySelectorAll('li.select'));

        if (save.className == 'stop') {
            err.errMesShow('请等待上传完成');
            return false;
        }
        if (name.value == '') {
            err.errMesShow('请输入会议名称');
            return false;
        };
        if (detail.value == '') {
            err.errMesShow('请输入会议详情');
            return false;
        };
        if (start.value == '') {
            err.errMesShow('请选择开始时间');
            return false;
        };
        // if (end.value == '') {
        //     err.errMesShow('请选择结束时间');
        //     return false;
        // };
        // if (room.innerHTML == '请选择') {
        //     err.errMesShow('请选择会议地点');
        //     return false;
        // }
        if (sponsor.innerHTML == '请选择') {
            err.errMesShow('请选择发起人');
            return false;
        }
        if (joinList.length == 0) {
            err.errMesShow('请选择参会人');
            return false;
        }

        var meetData = {
            'name': name.value,
            'detail': detail.value,
            'uploadImg': uploadImg.getAttribute('src'),
            'start': start.value,
            'end': end.value,
            'room': room.innerHTML,
            'sponsor': sponsor.innerHTML,
            'joinList': joinList,
            'canRead': canRead.className == 'selected' ? 0 : 1,
            'autoJoin': autoJoin.className == 'selected' ? 0 : 1
        };

        ajaxTool.addMeet(meetData, (res) => {
            console.log(res)
            if (res.status == 'success') {
                window.location.href = '/';
            }else{
                err.errMesShow('新建失败，请重新来过');                
            }
        });

    });


    

})()