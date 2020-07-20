window.addEventListener('load', function() {
    var preview_wrap = document.querySelector('.preview_wrap')
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    preview_wrap.addEventListener("mouseover", function() {
        mask.style.display = 'block'
        big.style.display = 'block';
        preview_wrap.addEventListener('mousemove', function(e) {
            // (1). 先计算出鼠标在盒子内的坐标
            var x = e.pageX - preview_wrap.offsetLeft
            var y = e.pageY - preview_wrap.offsetTop
                //鼠标在中间
                // (3) 我们mask 移动的距离
            var maskX = x - mask.offsetWidth / 2
            var maskY = y - mask.offsetHeight / 2
                // 遮挡层的最大移动距离
            var maskMax = preview_wrap.offsetWidth - mask.offsetWidth;
            if (maskX <= 0) {
                maskX = 0;
            } else if (maskX >= maskMax) {
                maskX = maskMax;
            }
            if (maskY <= 0) {
                maskY = 0;
            } else if (maskY >= maskMax) {
                maskY = maskMax;
            }
            mask.style.left = maskX + "px"
            mask.style.top = maskY + "px"
                // 3. 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
                // 大图
            var bigIMg = document.querySelector('.bigImg');
            var bigMax = bigIMg.offsetWidth - big.offsetWidth;
            // 大图片的移动距离 X Y
            //maskX / maskMax = bigX / bigMax
            var bigX = maskX * bigMax / maskMax;
            var bigY = maskY * bigMax / maskMax;
            bigIMg.style.top = -bigY + "px"
            bigIMg.style.left = -bigX + "px"
        })
    })
    preview_wrap.addEventListener("mouseout", function() {
        mask.style.display = 'none'
        big.style.display = 'none';
    })
})