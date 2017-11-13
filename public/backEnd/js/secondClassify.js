$(function(){
    //拿数据渲染页面
    var addSecClassify = function(pageNum){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:pageNum || 1,
                pageSize:4
            },
            success:function(data){
                 var second = template('addSec-template',data);
                 //添加到tbody中
                 $('tbody').html(second); 
                 //分页插件
                 $('.pagination').bootstrapPaginator({
                    /*当前使用的是3版本的bootstrap*/
                    bootstrapMajorVersion: 3,
                    /*配置的字体大小是小号*/
                    size: 'small',
                    /*当前页*/
                    currentPage: data.page,
                    /*一共多少页*/
                    // 总页数=数据的总数/每页显示多少条数据
                    totalPages: Math.ceil(data.total / data.size),
                    /*点击页面事件*/
                    onPageClicked: function (event, originalEvent, type, page) {
                      /*改变当前页再渲染 page当前点击的按钮的页面*/
                      addSecClassify(page);
                    }
                  });
            }
        })
    }
    //拿一级分类
    var useOneClassify = function(pageNum){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:pageNum||1,
                pageSize:50
            },
            success:function(data){
                var first = template('addOne-template',data);
                $('#secClassify').html(first);
            }
        })
    }

    addSecClassify();
    useOneClassify();
   

    //当点击每一个li标签时
    $('#secClassify').on('click','a',function(){
        $('.dropdown .spantext').html($(this).data('name'));
        //获取当前点击a标签里的id值  给了form表单里的隐藏域
        // console.log($(this).data('id'));
        $('#categoryId').val($(this).data('id'));
        // console.log($('#categoryId').val());
    })


    //上传文件
    var initUpload = function () {
        // 下面的id是type=file类型的input的id
        $("#upDateFile").fileupload({
          // 找到上传图片的接口
          url: "/category/addSecondCategoryPic",
        //   当请求成功使用这个方法接收数据
          done: function (e,data) {
            // console.log(data);
            console.log(data);
            $('.img img').prop('src',data.result.picAddr);
            //把图片的地址给了隐藏域
            $('#brandLogo').val(data.result.picAddr);
          }
        })
      }
      initUpload();

    //校验表单

    $('#second-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 字段名是表单的name属性的值  验证用户
            brandName: {
                validators: {
                    notEmpty: {
                        message: '二级分类不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();
        // Get the form instance
        var $form = $(e.target);
        var bv = $form.data('bootstrapValidator');
        //以上的步骤就是当用户填写用户名和密码符合规则的时候 提交表单通过ajax从后台拿数据来判断是否正确

        // console.log($form.serialize());
        //当验证成功代表可以提交数据  把提交上来的name序列化变为键值对
        var $formData = $form.serialize();

        //ajax请求添加
        $.ajax({
            type:'post',
            url:' /category/addSecondCategory',
            data:$formData,
            success:function(data){
                if(data.success == true){
                    //如果返回的success为true时 说明提交呈贡
                    //重新刷新页面  让弹出框消失
                    $('#addclassify').modal('hide');
                    addSecClassify();
                }
            }
        })
        
    });



      





})