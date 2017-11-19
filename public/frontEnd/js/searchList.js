$(function(){
    var flag = true;

    var val = localStorage.getItem('name');
    var selectData = function(val){
        $.ajax({
            type:'get',
            url:' /product/queryProduct',
            data:{
                proName:val,
                page:1,
                pageSize:6,
                // price:price||2,
                // num:num||2
            },
            success:function(data){
                console.log(data);
                var searched = template('search-template',data);
                $('.search-result-list').html(searched);
                
            }
        })
    } 


    var newData = function(price,num){
        $.ajax({
            type:'get',
            url:' /product/queryProduct',
            data:{
                proName:val,
                page:1,
                pageSize:6,
                price:price||2,
                num:num||2
            },
            success:function(data){
                console.log(data);
                var searched = template('search-template',data);
                $('.search-result-list').html(searched);
                
            }
        })
    } 
    selectData(val);
    //点击搜索
    $('.search-box').on('click','span',function(){
        var val = $('.search-box input').val();
        if(val == ''){
            localStorage.removeItem('name');
            $('.search-result-list').html('<p>没有搜到你期望的!请换个姿势搜一下!</p>');
        }else{
            selectData(val);
        }
        
    })

    //价格排序
    $('.price-btn').on('click',function(){
        if(flag){
            flag = false;
            newData(1,2);
            $(this).addClass('color');
            $(this).find('i').addClass('fa-angle-up');
            $(this).find('i').removeClass('fa-angle-down');
        }else{
            flag = true;
            newData(2,2);
            $(this).removeClass('color');
            $(this).find('i').addClass('fa-angle-down');
            $(this).find('i').removeClass('fa-angle-up');
        }
    })


    //点击购买跳转到购买页面
    $('.item-btn').on('click','button',function(){
        alert(1);
    })
    
});


    
       

   


