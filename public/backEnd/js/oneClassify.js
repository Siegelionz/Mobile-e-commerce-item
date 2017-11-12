$(function () {
    //渲染页面
    var addOneClassify = function (pageNum) {
        $.ajax({
            type: 'get',
            url: ' /category/queryTopCategoryPaging',
            data: {
                page: pageNum || 1,
                pageSize: 3
            },
            success: function (data) {
                //通过模板引擎渲染到html页面中
                var addOne = template('addOne-template', data);
                //把合并好的放入tbody中
                $('tbody').html(addOne);
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
                      addOneClassify(page);
                    }
                  });
            }
        })
    }
    addOneClassify();

    //当点击添加新类校验
    $('#first-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 字段名是表单的name属性的值  验证用户
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
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
    });



    $('.modal-footer').on('click', '.btn-primary', function () {
        var form = $('#first-form').serialize();
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: form,
            success: function (data) {
                if(data.success == true) {
                    $('#addclassify').modal('hide');
                    addOneClassify();
                  }

            }
        })
    })


})