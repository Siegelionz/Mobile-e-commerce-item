$(function(){
    //利用插件来验证用户名以及密码
    //form表单的id调用插件方法   https://www.cnblogs.com/nele/p/5493414.html
    $('#login-form').bootstrapValidator({
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
          // 字段名是表单的name属性的值  验证用户
          username: {
            validators: {
              notEmpty: {
                message: '用户名不能为空'
              },
              stringLength: {
                min: 4,
                max: 16,
                message: '用户名长度在4到16位之间'
              },
              callback:{
                message:'用户名错误'
            }
            }
          },
          //表单密码框的name值  验证密码 
          password: {
            validators: {
              notEmpty: {
                message: '密码不能为空'
              },
              stringLength: {
                min: 6,
                max: 16,
                message: '密码长度在6到16之间'
              },
              different: {
                //判断用户名的name值是否与输出的密码相同
                field: 'username',
                message: '密码不能和用户名相同'
              },
              callback:{
                  message:'密码错误'
              }
            }
          }
        }
      })
}).on('success.form.bv', function (e){
    // Prevent form submission
    e.preventDefault();
    // Get the form instance
    var $form = $(e.target);
    var bv = $form.data('bootstrapValidator');
    //以上的步骤就是当用户填写用户名和密码符合规则的时候 提交表单通过ajax从后台拿数据来判断是否正确
    $.ajax({
        type:'post',
        url:' /employee/employeeLogin',
        //序列化  把用提交上来的数据序列化 变为key=value&key1=value1的形式
        data:$form.serialize(),
        dataTypt:'json',
        success:function(data){
            //判断data中的success属性
            if(data.success == true){
                location.href = './index.html';
            }else if(data.error = 1001){
                $('#login-form').data('bootstrapValidator').updateStatus("password",  "INVALID",  'callback' );
            }else if(data.erro = 1000){
                $('#login-form').data('bootstrapValidator').updateStatus("username",  "INVALID",  'callback' );
            }
        }
    })
});