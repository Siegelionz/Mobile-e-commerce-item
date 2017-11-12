// 该文件的功能是用来写首页的js交互的

$(function(){
    
//下拉显示分类
    $('.option li:nth-child(2)').on('click',function(){
        $('.option .classify').stop().slideToggle();
    })
//点击按钮菜单栏消失
    $('[data-btn]').on('click',function(){
        $('.menu').toggle();
        $('.content').toggleClass('full');
    })
//使用进度条插件  需要ajax
//使用window全局监听 当页面中某一个ajax请求发起的时候
$(window).ajaxStart(function(){
    NProgress.start();
})
$(window).ajaxComplete(function(){
    NProgress.done();
})

//如果用户点击了确定意味着要退出管理系统
$('.secede').on('click',function(){
    $.ajax({
        type:'get',
        url:'/employee/employeeLogout',
        success:function(data){
            //接收到接口的返回来的数据 然后判断一下
            if(data.success == true){
                setTimeout(function(){
                   location.href = './login.html';
                },500)

            }
        }
    })
})



})