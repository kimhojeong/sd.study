$(function(){

    $('.h-type .btngroup button').click(function(){

        console.log($(this).index())

    })

    $(function(){

        //A.hover
        $('nav li').mouseenter(function(){
            $(this).css('backgroundColor','#00F').children('a')
            .css('color','#FFF')
        }).mouseleave(function(){
            $(this).css('backgroundColor','').children('a')
            .css('color','')
        })

        // B. ScrollMove Menu
        $('nav li').click(function(e){
            e.preventDefault();
            var idx = $(this).index();
            var sec = $('body section').eq(idx).offset().top;
            $('body,html').stop().animate({
                'scrollTop':sec
            },500)
        })

        // C. Slide Banner
        var slideIdx = Math.floor(Math.random() * $('.slidebanner li').size())
        $('.slidebanner li').eq(slideIdx).addClass('on').children('img').show()

        function slideMove(start,end,idx){
            $('.slidebanner li').eq(idx).addClass('on').children('img').css({
                "left":start,
                "display":'block'
            }).animate({
                'left':end
            }).parent().siblings().removeClass('on')
        }

        var slideInter = setInterval(function(){
            $('.next').click();
        },4500)

        $('.slidebanner').mouseenter(function(){
            clearInterval(slideInter)
        }).mouseleave(function(){
            slideInter = setInterval(function(){
                $('.next').click();
            },4500)
        })

        $('.slidebanner li a').click(function(){
            slideIdx = $(this).parent('li').index();
            var hisNum = $('.slidebanner li.on').index();

            if(slideIdx > hisNum){
                slideMove("0","-100%",hisNum)
                slideMove("100%","0",slideIdx)
            }else if(slideIdx < hisNum){
                slideMove("0","100%",hisNum)
                slideMove("-100%","0",slideIdx)
            }
        })

        $('.slidebanner .next').on({
            'click':function(){
                slideMove("0","-100%",slideIdx)
                slideIdx++
                slideMove("100%","0",slideIdx)

                if(slideIdx == $('.slidebanner li').size()){
                    slideIdx = 0
                    slideMove("100%","0",slideIdx)
                }
            }
        })

        $('.slidebanner .prev').on({
            'click':function(){
                slideMove("0","100%",slideIdx)
                slideIdx--
                slideMove("-100%","0",slideIdx)

                if(slideIdx < 0){
                    slideIdx = $('.slidebanner li').size() -1;
                    slideMove("-100%","0",slideIdx)
                }
            }
        })

        // D. Fade Banner
        var fadeIdx = 0;

        fadeBanner = function(){
            $('.fadebanner li').eq(fadeIdx).removeClass('on').children('img').fadeOut(1000,function(){
                fadeIdx++
            $('.fadebanner li').eq(fadeIdx).addClass('on').children('img').fadeIn(1000)
            })
        }

        var fadeInter = setInterval(fadeBanner,4800)


        $('.fadebanner').mouseenter(function(){
            clearInterval(fadeInter)
        })
        $('.fadebanner').mouseleave(function(e){
            fadeInter = setInterval(fadeBanner,4800)
        })

        $('.fadebanner li a').click(function(e){
            e.preventDefault();
            fadeIdx = $(this).parent().index();
            var hisNum =$('.fadebanner li.on').index();

            $('.fadebanner li').eq(hisNum).removeClass('on').children('img').fadeOut(1000,function(){
                $('.fadebanner li').eq(fadeIdx).addClass('on').children('img').fadeIn(1000);
            })
        })

        // E. SNS Move List Gellay
        $('.movie-view li a').click(function(e){
            e.preventDefault();
            var url = $(this).attr('href')
            url = "https://www.youtube.com/embed/"+url+"?rel=0&amp;controls=0&amp;showinfo=0"
            $('.movie-view iframe').attr('src',url);
            $(this).children('img').fadeTo(500,0.5).parent().parent().siblings().find('img').fadeTo(500,1)

        })


        // F. Wing banner
        $(window).scroll(function(){
            var sct = $(this).scrollTop()
            $('.wing').stop().animate({
                'top':sct
            })
        })

    })

})
