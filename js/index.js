//先加载完成
window.onload = function() {
    var arrow_l = document.querySelector('.arrow-l')
    var arrow_r = document.querySelector('.arrow-r')
    var focus = document.querySelector('.focus');
    var ui = document.querySelector('.main .focus ul')
    var imgs = ui.querySelectorAll('img')
    var ol = document.querySelector('.circle')
    var focusWidth = focus.offsetWidth
        //图片播放
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;
    // flag 节流阀定时器播放
    var flag = true;
    //进入focus
    focus.addEventListener('mouseenter', function() {
            arrow_l.style.display = "block"
            arrow_r.style.display = "block"
            clearInterval(timer)
            timer = null
        })
        //离开
    focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = "none"
            arrow_r.style.display = "none"
            timer = setInterval(function() {
                //手动调用点击事件
                arrow_r.click();
            }, 2000);
        })
        //圆点的设置
    for (var i = 0; i < ui.children.length; i++) {
        //创
        var li = document.createElement('li')
            //图片跳转
        li.setAttribute('index', i)
            //appendchild 加
        ol.appendChild(li)
            //赋 innerHTML
            // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            //刚才重名了
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            this.className = 'current'
                // 5. 点击小圆圈，移动图片 当然移动的是 ul 
                //获取它的index
            var index = this.getAttribute('index')
                // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
            circle = index;
            moveb(ui, -index * focusWidth)
        })

    }
    ol.children[0].className = 'current'
        //克隆
        //深克隆
        // var first = ol.children1[0].cloneNode(true)
        // ol.appendChild(first)
        // 7. 点击右侧按钮， 图片滚动一张
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false
                // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
            if (num == ui.children.length - 1) {
                ui.style.left = 0
                num = 0
            }
            num++;
            moveb(ui, -num * focusWidth, function() {
                    flag = true
                })
                // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    })

    // 9. 左侧按钮做法
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false
                // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
            if (num == 0) {
                num = ui.children.length - 1
                ui.style.left = -num * focusWidth + 'px'
            }
            num--;
            moveb(ui, -num * focusWidth, function() {
                    flag = true
                })
                // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
                // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == 0) {
                circle = ol.children.length;
            }
            circle--;
            // 调用函数
            circleChange();
        }

    })

    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 10. 自动播放轮播图
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);

}