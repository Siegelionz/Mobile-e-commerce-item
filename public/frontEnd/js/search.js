$(function () {
    showHistory();

    //当我们点击搜索的时候  拿到用户提交的数据 到后台拿数据渲染
    $('.search-btn').on('tap', function () {
        var val = $('.search-input').val();
        localStorage.setItem('name', val);
        setHistory(val);
        showHistory();
        location.href = "./searchList.html";
    })
    //点击清空记录
    $('#all-delete').on('click',function(){
        localStorage.removeItem('keyHistory');
        showHistory();
    })
    //当点击某一个删除键时
    $('.search-history-list').on('click','i',function(){
        var text = $(this).siblings().html();
        removeHistory(text);
        showHistory();
    })
    //当点击历史搜索的内容跳转
    $('.search-history-list').on('click','span',function(){
        var spanval = $(this).html();
        localStorage.setItem('name', spanval);
        location.href = "./searchList.html";
    })

   
})

//当进入页面时 拿到localStorage里的值
var getHistory = function () {
    var val = JSON.parse(localStorage.getItem('keyHistory') || '[]');
    return val;
}

//当设置key值
var setHistory = function (value) {
    // 1.先接受local的值
    var list = getHistory();
    // 2.判断一下接受的值是否已经存在local里
    $.each(list, function (i, item) {
        if (value == item) {
            list.splice(i, 1);
        }
    })
    // 3.把新的值放入到list数组中
    list.push(value);
    // 4.把这个值重新设置给local
    localStorage.setItem('keyHistory', JSON.stringify(list));
}

//展示数据
var showHistory = function () {
    // 1.拿数据
    var list = getHistory();
    //判断一下list数组是否有值
    if (list.length == 0) {
        $('.search-history').hide();
        $('.p-show').show();
    } else {
        // 2.拿到这些数据渲染html页面
        var listall = template('history-template', {
            list: list
        });
        $('.search-history-list').html(listall);
        $('.p-show').hide();

    }



    // var historyList = template('history-template',
    // {
    //   // list: ['nike','gucci']
    //   list:list
    // });

    // $('.search-history-list').html(historyList);
}

//删除数据
var removeHistory = function (value) {
    //1.拿到数据
    var list = getHistory();
    //2.遍历
    $.each(list, function (i, item) {
        if (value == item) {
            list.splice(i, 1);
        }
    })
    localStorage.setItem('keyHistory', JSON.stringify(list));

}