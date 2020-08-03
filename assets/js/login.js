$(function() {
    // 注册与登陆表单切换
    $('#link-reg').on('click', function() {
        $('.form-login').hide()
        $('.form-reg').show()
    })
    $('#link-login').on('click', function() {
        $('.form-reg').hide()
        $('.form-login').show()
    })
    var form = layui.form
    form.verify({
            // 自定义了一个叫做 pwd 校验规则
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            // 校验两次密码是否一致的规则
            repwd: function(value) {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息即可
                var pwd = $('.regs-box [name=password]').val()
                console.log(value);
                if (pwd !== value) {
                    return '两次密码不一致！'
                }
            }
        })
        // 注册事件监听
    var layer = layui.layer
    $('#form_reg').on('submit', function(e) {
            e.preventDefault();
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    console.log('注册失败');
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                $('#link_login').click()
            })
        })
        // 登录事件监听
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href = 'index.htm'
            }
        })
    })
})