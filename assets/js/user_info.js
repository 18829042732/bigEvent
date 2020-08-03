$(function() {
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.lenght > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    // 调用初始化信息方法
    initUserInfo()
        // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res)
                    // 调用 form.val 方法，为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
            // 阻止表单的默认重置行为
            e.preventDefault()
            initUserInfo()
        })
        // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                    // window.parent.getUserInfo()
                window.parent.getUserInfo()
            }
        })

        // function getUserInfo() {
        //     $.ajax({
        //         method: 'GET',
        //         url: '/my/userinfo',
        //         // headers 就是请求头配置对象
        //         headers: {
        //             Authorization: localStorage.getItem('token') || ''
        //         },
        //         success: function(res) {
        //             if (res.status !== 0) {
        //                 return layui.layer.msg('获取用户信息失败!')
        //             }
        //             // 调用 renderAvatar 渲染用户的头像
        //             renderAvatar(res.data)
        //         }
        //     })
        // }
        // // 渲染用户的头像
        // function renderAvatar(user) {
        //     // 1. 获取用户的名称
        //     var name = user.nickname || user.username
        //         // 2. 设置欢迎的文本
        //     $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //         // 3. 按需渲染用户的头像
        //     if (user.user_pic !== null) {
        //         // 3.1 渲染图片头像
        //         $('.layui-nav-img')
        //             .attr('src', user.user_pic)
        //             .show()
        //         $('.text-avatar').hide()
        //     } else {
        //         // 3.2 渲染文本头像
        //         $('.layui-nav-img').hide()
        //             // toUpperCase() 将字符串转换为大写
        //         var first = name[0].toUpperCase()
        //         $('.text-avatar')
        //             .html(first)
        //             .show()
        //     }
        // }
    })
})