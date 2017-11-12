$(function(){
    //显示数据  由于是多次的查询所以我们使用函数调用
    var userFun = function(pageNum){
        //通过ajax来拿去数据
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:pageNum || 1,
                pageSize:1
            },
            success:function(data){
                //接收到数据就把数据展示到html页面中
                console.log(data);
                var templateall = template('user-template',data);
                //把这个模板引擎放入tbody中
                $('tbody').html(templateall);


                //当成功的把数据渲染到html页面上  我们使用分类插件
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
                      userFun(page);
                    }
                  });
            }
        })
    }
    userFun();
    //当我们点击操作按钮的时候 改变用户的状态
    $('tbody').on('click','.btn',function(){
        //获取到按钮的名字以及id
        var id = $(this).data('id');
        // var idDelete = $(this).data('idDelete');
        var name = $(this).data('name');
        //当点击按钮时要判断一下当前的状态
        //判断一下当前点击的按钮是否有btn-danger这个警告样式

        //这里的用意  就是获取一下当前按钮的class  如果为警告按钮意味着要禁用  所以下面判断idDelete是否等于1
        //如果等于1 弹出对话框问管理员确定要禁用吗？
        var idDelete = $(this).hasClass('btn-danger') ? 1 : 0;
        //判断当前状态  如果为true说明是禁止
        if(idDelete == 1){
            $('#userModal').find('.waring').html('<i class="glyphicon glyphicon-info-sign"></i>您确定禁用'+name+'吗？');
        }else{
            $('#userModal').find('.waring').html('<i class="glyphicon glyphicon-info-sign"></i>您确定启用'+name+'吗？');
        }
         //当我们点击确定的按钮的时候发送ajax请求
         $('#userModal').on('click','.btn',function(){
             $.ajax({
                 type:'post',
                 url:'/user/updateUser',
                 data:{
                     id:id,
                     isDelete:idDelete
                 },
                 success:function(data){
                    if(data.success == true){
                        //当点击成功的时候 已经把后台数据修改 重新加载数据
                        $('#userModal').modal('hide');
                        userFun();
                    }
                 }
             })
         })
    })
   

})