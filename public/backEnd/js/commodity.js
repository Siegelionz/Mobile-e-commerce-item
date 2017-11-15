$(function () {
    //从后台拿数据  渲染页面
    var commodity = function (pageNum) {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: pageNum || 1,
                pageSize: 5
            },
            success: function (data) {
                var shoptemplate = template('commodity-template', data);
                $('tbody').html(shoptemplate);

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
                        commodity(page);
                    }
                });
            }
        })
    }

    commodity();

    //校验
    $('#productform').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 字段名是表单的name属性的值  验证用户
            proName: {
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '商品描述不能为空'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '商品库存不能为空'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '商品价格不能为空'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '商品原价不能为空'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '商品尺码不能为空'
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

        //拿表单提交上来的数据并且序列化
        var $data = $form.serialize();
        // console.log(picList);
        //遍历一下我们上传图片的数组
        $.each(picList,function(i,val){
            $data+='&picName'+(i+1)+'='+val.picName+'&picAddr'+(i+1)+'='+val.picAddr;
        })
        //然后通过ajax添加到后台
        $.ajax({
            type:'post',
            url:' /product/addProduct',
            data:$data,
            success:function(data){
                $('#addclassify').modal('hide');
                commodity();
            }
        })
    });

    //上传文件
    var picList =[];
    var initUpload = function () {
      // 下面的id是type=file类型的input的id
      $("#pic").fileupload({
        // 找到上传图片的接口
        url: "/product/addProductPic",
        done: function (e, data) {
          console.log(data);
          //当我们使用插件上传图片成功后  在这个div盒子里创建一个img标签
        $('.fileupload').append('<img width="50" height="auto" src="'+data.result.picAddr+'" alt="">');
          // console.log(data.result);

          picList.push(data.result);
        }
      })
    }

    
    initUpload();

})