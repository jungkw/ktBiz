
$(document).ready(function(){

    /* cfmOllehTotalSection close */
    $('.cfmOllehTotalSectionCont > .cfmOllehTotalSectionCont-group:last > .cfmOllehTotalMenuList:last > li:last > h4 > a:last').focusout(function(){
          $('.cfmOllehTotalSection').removeClass('on');
          return false;
    });



    /**
    * email chg fn
    * @param {object} this
    */
    $.ktBizMailChg = function(obj){
        var $obj = $(obj);
        var $target = $('.comm_mailInput02');
        var $val = $obj.val();
        if($val=="self"){
          $target.prop("disabled", false).focus();
        }else{
          $target.prop("disabled", true);
          $target.val($val)
          if($val==""){
            $target.val("");
          }
        }
        return false;
    };


    /**
    * select box chg fn
    * @param {object} this.
    */

    $.ktBizSelect = function(obj){
        var $obj = $(obj);
        var text = $obj.children("option:selected").text();
        $obj.siblings("p").children('.selectTxt').text(text);
    };


    $.ktBizSelect.focus = function(){
        $(".comm_select").focusin(function(){
            $(this).parent('div').addClass('on');
        }).focusout(function(){
            $(this).parent('div').removeClass('on')
        });
    };

    $.ktBizSelect.focus();

    /**
    * layerPopup accessibility focus fn
    * @param {object} this.
    */
    $.ktBizPopClick = function(obj){
        var $target = $($(obj).attr('href'));
        $target.show();
        $target.find('.pop_conts').attr('tabindex',0).focus();
        $target.find('.pop_close a, .pop_btn_close').click(function(){
            $target.hide();
            obj.focus();
            $target.find('.pop_conts').removeAttr('tabIndex');
            return false;
        });
        
        return false;
    };


    /**
    * tab & contents module
    * @param {number} tab 1depth or 2depth (01, 02)
    * @param {object} this.
    * @param {string} contents division name.
    */
    $.ktBizTabMenu = function(type, obj, name){
        var $target = $($(obj).attr('href'));
        var $parents = $(obj).closest('li');
        var $friend = $parents.closest('ul').children('li');
        var $tabWrap = $parents.closest('ul').parents('div.comm_tabWrap');
        var $subTab = $(obj).next('ul');
        if(!$parents.hasClass('on')){
            if(type==01){
                $.ktBizTabMenu.depth01($target, $parents, $friend, $tabWrap, $subTab, name);
            }else{
                $.ktBizTabMenu.depth02($target,$parents, $friend, name, obj);
            }
        };
        
        return false;
    };

    /* $.ktBizTabMenu case depth01 fn */
    $.ktBizTabMenu.depth01 = function($target, $parents, $friend, $tabWrap, $subTab, name) {
        $friend.children('ul').hide();
        if($subTab.length < 1){
            $tabWrap.removeClass('tab2depth');
        }else{
            $tabWrap.addClass('tab2depth');
            $friend.children('ul').children('li').removeClass('on');
            $subTab.children('li').eq(0).addClass('on');
        }
        if($tabWrap.hasClass('tab2depth')){
            $subTab.show();   
        }
        $friend.removeClass('on');
        $parents.addClass('on');
        $('.'+name).hide();
        $target.show();
    }

    /* $.ktBizTabMenu case depth02 fn */
    $.ktBizTabMenu.depth02 = function($target, $parents, $friend, name, obj) {
        $friend.removeClass('on');
        $parents.addClass('on');
        $('.'+name).hide();
        $target.show();
    }


    /* notify toggle btn fn */
    $.ktBizNotifyToggle = function(){
        var $obj = $('a.comm_notifyToggle');
        var $conts = $('.comm_notify > ul');
        var $img = $obj.find('img');
        if($conts.css('display') == 'block'){
            $obj.removeClass('reverse');
            $img.attr("alt","알려드립니다 내용 펼치기");
            $conts.hide();
        }else{
            $obj.addClass('reverse');
            $img.attr("alt","알려드립니다 내용 숨기기");
            $conts.show();
        }
        return false;
    }

});
    
    /**
    * common gnb include fn
    * @param {string} 1depth menu validate value 
    */
    $.ktBizGnbView = function(){
      

      var gnbItem = "";
            

            gnbItem += "<!-- s : Logo -->";
            gnbItem += "<a href='http://biz.olleh.com/' class='cfmOllehY15logo' accesskey='0' >olleh</a>";
            gnbItem += "<!-- e : Logo -->";



            gnbItem += "<!-- s : customer type util menu -->";
            gnbItem += "<ul class='cfmOllehY15Util'>";
              gnbItem += "<li>";
                gnbItem += "<a href='http://www.olleh.com' >";
                  gnbItem += "<img src='../../images/common/cfm_olleh_util_list1.png' alt='개인'>";
                gnbItem += "</a>";
              gnbItem += "</li>";
              gnbItem += "<li>";
                gnbItem += "<a href='http://biz.olleh.com' class='on'>";
                  gnbItem += "<img src='../../images/common/cfm_olleh_util_list2.png' alt='기업'>";
                gnbItem += "</a>";
              gnbItem += "</li>";
              gnbItem += "<li class='last'>";
                gnbItem += "<a href='http://soho.olleh.com'>";
                  gnbItem += "<img src='../../images/common/cfm_olleh_util_list3.png' alt='중소사업자'>";
                gnbItem += "</a>";
              gnbItem += "</li>";
            gnbItem += "</ul>";
            gnbItem += "<!-- e : customer type util menu -->";

            gnbItem += "<!-- s : customer center util menu -->";
            gnbItem += "<ul class='cfmOllehY15UtilAr'>";
            gnbItem += "<li>";
                gnbItem += "<a href=''>로그인</a>";
              gnbItem += "</li> ";
              gnbItem += "<li>";
                gnbItem += "<a href=''>회원가입</a>";
              gnbItem += "</li> ";
              gnbItem += "<li class='last'>";
                gnbItem += "<a href='http://biz.olleh.com/biz/wBiz/customer/faqMain.do'>이용안내</a>";
              gnbItem += "</li> ";
            gnbItem += "</ul>";
            gnbItem += "<!-- e : customer center util menu -->";

            gnbItem += "<h2 class='blind'>주메뉴 영역</h2>";



            gnbItem += "<!-- s : gnb -->";
            gnbItem += "<ul class='cfmOllehGnb-menu'>";

                  gnbItem += "<!-- s : gnb item01 -->";
                  gnbItem += "<li class='cfmOllehGnb-menu-item'>";
                gnbItem += "<a href='javascript:depth2_1111();' class='link myservice'>회원관리</a>";

                      gnbItem += "<div class='cfmOllehGnb-submenu'>";
                          gnbItem += "<strong class='cfmOllehGnb-submenu-title'>회원관리</strong>";

                          gnbItem += "<ul class='cfmOllehGnb-submenu-list'>";
                              gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='javascript:depth2_1111();' class='group-heading'>회원정보 조회</a>";
                              gnbItem += "</li>";
                            gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='javascript:depth2_1211();' class='group-heading'>회원정보 수정</a>";
                            gnbItem += "</li>";
                            gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='javascript:depth2_1411();' class='group-heading'>회선정보 조회</a>";
                            gnbItem += "</li>";
                            gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='javascript:depth2_1611();' class='group-heading'>신청/변경 현황</a>";
                            gnbItem += "</li>";
                          gnbItem += "</ul>";
                      gnbItem += "</div>";
                  gnbItem += "</li>";
                  gnbItem += "<!-- e : gnb item01 -->";


                  gnbItem += "<!-- s : gnb item02 -->";
                  gnbItem += "<li class='cfmOllehGnb-menu-item'>";
                      gnbItem += "<a href='javascript:depth3_2111();' class='link billmanage'>요금관리</a>";

                      gnbItem += "<div class='cfmOllehGnb-submenu'>";
                          gnbItem += "<strong class='cfmOllehGnb-submenu-title'>요금관리</strong>";

                          gnbItem += "<ul class='cfmOllehGnb-submenu-list'>";
                            gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='javascript:depth3_2111();' class='group-heading'>요금조회</a>";
                                gnbItem += "<ul class='group-list'>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_2111();' class='group-link'>월별 사용요금</a></li>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_2121();' class='group-link'>실시간 요금</a></li>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_2141();' class='group-link'>전체회선 요금</a></li>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_2211();' class='group-link'>납부/미납 요금</a></li>";
                        gnbItem += "<li class='group-item'> <a href='javascript:depth3_2221();' class='group-link'>납부방법 변경</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:depth2_3111();' class='group-heading'>사용량 조회</a>";
                      gnbItem += "<ul class='group-list'>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth2_3111();' class='group-link'>총사용량 </a></li>";
                      gnbItem += "</ul>";
                    gnbItem += "</li>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:depth3_2311();' class='group-heading'>명세서 관리</a>";
                      gnbItem += "<ul class='group-list'>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_2311();' class='group-link'>청구지정보 변경</a></li>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth4_2324();' class='group-link'>온라인명세서 신청</a></li>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_2331();' class='group-link'>종이명세서 재발행</a></li>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_2361();' class='group-link'>영문명세서 신청</a></li>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_2341();' class='group-link'>점자명세서 신청</a></li>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_2351();' class='group-link'>청구항목 안내</a></li>";
                      gnbItem += "</ul>";
                    gnbItem += "</li>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:depth3_2511();' class='group-heading'>분리납부 조회</a>";
                      gnbItem += "<ul class='group-list'>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_2511();' class='group-link'>분리납부 내역</a></li>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_2521();' class='group-link'>회선별 조회</a></li>";
                      gnbItem += "</ul>";
                    gnbItem += "</li>";
                          gnbItem += "</ul>";
                      gnbItem += "</div>";
                  gnbItem += "</li>";
                  gnbItem += "<!-- e : gnb item02 -->";


                  gnbItem += "<!-- s : gnb item03 -->";
              gnbItem += "<li class='cfmOllehGnb-menu-item'>";
                gnbItem += "<a href='javascript:depth3_5111();' class='link prodsystem'>상품관리</a>";

                gnbItem += "<div class='cfmOllehGnb-submenu'>";
                  gnbItem += "<strong class='cfmOllehGnb-submenu-title'>상품관리</strong>";

                  gnbItem += "<ul class='cfmOllehGnb-submenu-list'>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:depth3_5111();' class='group-heading'>My 상품 조회</a>";
                      gnbItem += "<ul class='group-list'>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_5111();' class='group-link'>요금제 신청/변경</a></li>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_5121();' class='group-link'>부가서비스 신청/변경</a></li>";
                      gnbItem += "</ul>";
                    gnbItem += "</li>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:goBizProductInfo();' class='group-heading'>Biz 상품 소개</a>";
                    gnbItem += "</li>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:goOllehProductInfo();' class='group-heading' style='width:220px;'>요금제/부가서비스 소개</a>";
                    gnbItem += "</li>";
                  gnbItem += "</ul>";
                gnbItem += "</div>";
              gnbItem += "</li>";
              gnbItem += "<!-- e : gnb item03 -->";


              gnbItem += "<!-- s : gnb item04 -->";
              gnbItem += "<li class='cfmOllehGnb-menu-item'>";
                gnbItem += "<a href='javascript:depth3_4121();' class='link phonemanage'>휴대폰관리</a>";

                gnbItem += "<div class='cfmOllehGnb-submenu'>";
                  gnbItem += "<strong class='cfmOllehGnb-submenu-title'>휴대폰관리</strong>";

                  gnbItem += "<ul class='cfmOllehGnb-submenu-list'>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:depth3_4121();' class='group-heading'>일시정지</a>";

                      gnbItem += "<ul class='group-list'>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_4121();' class='group-link'>신청/해제</a></li>";
                        gnbItem += "<li class='group-item'><a href='javascript:depth3_4111();' class='group-link'>이력조회</a></li>";
                      gnbItem += "</ul>";
                    gnbItem += "</li>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:depth2_4211();' class='group-heading'>분실신고</a>";
                    gnbItem += "</li>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:depth2_4411();' class='group-heading'>번호변경</a>";
                    gnbItem += "</li>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:depth2_4511();' class='group-heading'>법인명의 본인확인</a>";
                    gnbItem += "</li>";
                  gnbItem += "</ul>";
                gnbItem += "</div>";
              gnbItem += "</li>";
              gnbItem += "<!-- e : gnb item04 -->";


              gnbItem += "<!-- s : gnb item05 -->";
              gnbItem += "<li class='cfmOllehGnb-menu-item'>";
                gnbItem += "<a href='javascript:depth2_9411();' class='link question'>상담/이용안내</a>";

                gnbItem += "<div class='cfmOllehGnb-submenu'>";
                  gnbItem += "<strong class='cfmOllehGnb-submenu-title'>상담<br>이용안내</strong>";

                  gnbItem += "<ul class='cfmOllehGnb-submenu-list'>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:depth2_9411();' class='group-heading'>사이트 이용안내</a>";
                    gnbItem += "</li>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:depth2_9421();' class='group-heading'>회원가입 안내</a>";
                    gnbItem += "</li>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>  ";
                      gnbItem += "<a href='javascript:depth2_9431();' class='group-heading'>이메일 상담</a>";
                    gnbItem += "</li>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:depth2_9311();' class='group-heading'>자주하는 질문</a>";
                    gnbItem += "</li>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:depth2_9211();' class='group-heading'>공지사항</a>";
                    gnbItem += "</li>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='https://help.olleh.com/plaza/KtStoreSearch.do' target='_blank' class='group-heading'>매장찾기/안내</a>";
                    gnbItem += "</li>";
                    gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                      gnbItem += "<a href='javascript:depth2_8211();' class='group-heading'>대량구매 문의/신청</a>";
                    gnbItem += "</li>";
                  gnbItem += "</ul>";
                gnbItem += "</div>";
              gnbItem += "</li>";
              gnbItem += "<!-- e : gnb item05 -->";

            gnbItem += "</ul>";
            gnbItem += "<!-- e : gnb -->";

            
            gnbItem += "<!-- s : search -->";
            gnbItem += "<fieldset class='cfmOllehMainCommonSearch'>";
              gnbItem += "<form name='frmSch' id='searchFrm' method='get' onsubmit='return searchKwd();'>";
                gnbItem += "<legend>통합검색</legend>";
                gnbItem += "<label for='cfmOllehSearchPut' class='blind'>검색어 입력</label>";
                gnbItem += "<input type='text' name='q' id='cfmOllehSearchPut' class='text' accesskey='9' placeholder='olleh biz GiGA office' />";
                gnbItem += "<input type='hidden' name='t' value='1' />  ";
                gnbItem += "<input type='hidden' name='c' value='OLEH00000' /> ";
                gnbItem += "<input type='image' src='../../images/common/cfm_btn_olleh_search.png' class='cfmSearchButtonSearch' alt='검색' />  ";
              gnbItem += "</form>";
            gnbItem += "</fieldset>";
            gnbItem += "<!-- e : search -->";

            gnbItem += "<!-- s : total section -->";
            gnbItem += "<a href='#' class='cfmOllehButtonTotal'>전체메뉴</a>";

                gnbItem += "<div id='cfmOllehTotalSection' class='cfmOllehTotalSection'>";
                    gnbItem += "<div class='cfmOllehTotalSectionMiddle'>";
                      gnbItem += "<div class='cfmOllehTotalSectionCont'>";
                          gnbItem += "<h2 class='blind'>전체메뉴</h2>";

                          gnbItem += "<!-- s : section item01 -->";
                        gnbItem += "<div class='cfmOllehTotalSectionCont-group'>";
                          gnbItem += "<h3 class='cfmOllehTotalTitle'>회원관리</h3>";
                          gnbItem += "<ul class='cfmOllehTotalMenuList'>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth2_1111();'>회원정보 조회</a></h4></li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth2_1211();'>회원정보 수정</a></h4>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth2_1411();'>회선정보 조회</a></h4>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth2_1611();'>신청/변경 현황</a></h4>";
                            gnbItem += "</li>";
                          gnbItem += "</ul>";
                        gnbItem += "</div>";
                        gnbItem += "<!-- e : section item01 -->";

                        gnbItem += "<!-- s : section item02 -->";
                        gnbItem += "<div class='cfmOllehTotalSectionCont-group'>";
                          gnbItem += "<h3 class='cfmOllehTotalTitle'>요금관리</h3>";
                          gnbItem += "<ul class='cfmOllehTotalMenuList'>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth3_2111();'>요금조회</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='javascript:depth3_2111();'>월별 사용요금</a></li>";
                                gnbItem += "<li><a href='javascript:depth3_2121();'>실시간 요금조회</a></li>";
                                gnbItem += "<li><a href='javascript:depth3_2141();'>전체회선 요금조회</a></li>";
                                gnbItem += "<li><a href='javascript:depth3_2211();'>납부/미납 요금조회</a></li>";
                                gnbItem += "<li><a href='javascript:depth3_2221();'>납부방법 변경</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth2_3111();'>사용량 조회</a></h4>";
                              gnbItem += "<ul class='inlist'>";
                                gnbItem += "<li><a href='javascript:depth2_3111();'>총사용량 조회</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth3_2311();'>명세서관리</a></h4>";
                              gnbItem += "<ul class='inlist'>";
                                gnbItem += "<li><a href='javascript:depth3_2311();'>청구지정보변경</a></li>";
                                gnbItem += "<li><a href='javascript:depth3_2324();'>온라인명세서</a></li>";
                                gnbItem += "<li><a href='javascript:depth3_2331();'>종이명세서재발행</a></li>";
                                gnbItem += "<li><a href='javascript:depth3_2361();'>영문명세서신청</a></li>";
                                gnbItem += "<li><a href='javascript:depth3_2341();'>점자명세서신청</a></li>";
                                gnbItem += "<li> <a href='javascript:depth3_2351();'>청구항목안내</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth3_2511();'>분리납부조회</a></h4>";
                              gnbItem += "<ul class='inlist'>";
                                gnbItem += "<li><a href='javascript:depth3_2511();'>분리납부 내역</a></li>";
                                gnbItem += "<li><a href='javascript:depth3_2521();'>회선별 분리납부 조회</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                          gnbItem += "</ul>";
                        gnbItem += "</div>";
                        gnbItem += "<!-- e : section item02 -->";

                        gnbItem += "<!-- s : section item03 -->";
                        gnbItem += "<div class='cfmOllehTotalSectionCont-group'>";
                          gnbItem += "<h3 class='cfmOllehTotalTitle'>상품관리</h3>";
                          gnbItem += "<ul class='cfmOllehTotalMenuList'>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth3_5111();'>My 상품 조회</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='javascript:depth3_5111();'>요금제 신청/변경</a></li>";
                                gnbItem += "<li><a href='javascript:depth3_5121();'>부가서비스 신청/변경</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:goBizProductInfo();'>Biz 상품 소개</a></h4>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:goOllehProductInfo();'>요금제/부가서비스<br>소개</a></h4>";
                            gnbItem += "</li>";
                          gnbItem += "</ul>";
                        gnbItem += "</div>";
                        gnbItem += "<!-- e : section item03 -->";


                        gnbItem += "<!-- s : section item04 -->";
                        gnbItem += "<div class='cfmOllehTotalSectionCont-group'>";
                          gnbItem += "<h3 class='cfmOllehTotalTitle'>휴대폰관리</h3>";
                          gnbItem += "<ul class='cfmOllehTotalMenuList'>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth3_4111();'>일시정지</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='javascript:depth3_4121();'>신청/해제</a></li>";
                                gnbItem += "<li><a href='javascript:depth3_4111();'>이력조회</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth2_4211();'>분실신고</a></h4>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth2_4411();'>번호변경</a></h4>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth2_4511();'>법인명의 본인확인</a></h4>";
                            gnbItem += "</li>";
                          gnbItem += "</ul>";
                        gnbItem += "</div>";
                        gnbItem += "<!-- e : section item04 -->";


                        gnbItem += "<!-- s : section item05 -->";
                        gnbItem += "<div class='cfmOllehTotalSectionCont-group'>";
                          gnbItem += "<h3 class='cfmOllehTotalTitle'>상담/이용안내</h3>";
                          gnbItem += "<ul class='cfmOllehTotalMenuList'>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth2_9411();'>사이트 이용안내</a></h4>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth2_9421();'>회원가입 안내</a></h4>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth2_9431();'>이메일 상담</a></h4>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth2_9311();'>자주하는질문</a></h4>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth2_9211();'>공지사항</a></h4>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='https://help.olleh.com/plaza/KtStoreSearch.do' target='_blank'>매장찾기/안내</a></h4>";
                            gnbItem += "</li>";
                          gnbItem += "</ul>";
                          gnbItem += "<ul class='cfmOllehTotalMenuList'>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='javascript:depth2_8211();'>대량구매 문의/신청</a></h4>";
                            gnbItem += "</li>";
                          gnbItem += "</ul>";
                        gnbItem += "</div>";
                        gnbItem += "<!-- e : section item05 -->";

                      gnbItem += "</div>";
                    gnbItem += "</div>";
                gnbItem += "</div>";
                gnbItem += "<!-- e : total section -->";

            document.write(gnbItem);
            
      };
    /**
    * common lnb include fn
    * @param {string} lnb code value
    */
      $.ktBizLnbView = function(code){

        var lnbItem = "";
              lnbItem += "<h2 class='blind'>My Page LNB 메뉴 영역</h2>";
              lnbItem += "<div id='cfmOllehLnb'>";
                lnbItem += "<h3 id='cfmOllehLnbTitle' class='cfmOllehLnbTitle' >My Page</h3>";
                lnbItem += "<ul id='cfmOllehLnbNewList' class='cfmOllehLnbNewList'>";
                  
                  lnbItem += "<!-- s : 요금조회/납부 -->";
                  lnbItem += "<li id='li_BA' class=''>";
                    lnbItem += "<a href='' onclick='$.ktBizLnbView.click(this); return false;' id='BA' title='하위메뉴 열기'>요금조회/납부</a>";
                    lnbItem += "<ul id='sub_BA' class='cfmOllehLnbNewListCont' style='display: none;'>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='' onclick='' id='BAA'>명세서 조회</a>";
                      lnbItem += "</li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='' onclick='' id='BAB'>월별요금조회</a>";
                      lnbItem += "</li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='' onclick='' id='BAC'>실시간요금</a>";
                      lnbItem += "</li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='' onclick='' id='BAD'>분리납부내역 조회</a>";
                      lnbItem += "</li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='' onclick='' id='BAE'>요금납부</a>";
                      lnbItem += "</li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='' onclick='' id='BAF'>납부방법 변경</a>";
                      lnbItem += "</li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='' onclick='' id='BAG'>명세서 관리</a>";
                      lnbItem += "</li>";

                    lnbItem += "</ul>";
                  lnbItem += "</li>";
                  lnbItem += "<!-- e : 요금조회/납부 -->";


                  lnbItem += "<!-- s : 가입상품 조회/관리 -->";
                  lnbItem += "<li id='li_BB' class=''>";
                    lnbItem += "<a href='' id='BB' onclick='$.ktBizLnbView.click(this); return false;' title='하위메뉴 열기'>가입상품 조회/관리</a>";
                    lnbItem += "<ul id='sub_BB' class='cfmOllehLnbNewListCont' style='display: none;'>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='' id='BBA'>내 상품 조회</a>";
                      lnbItem += "</li>";
                      lnbItem += "<li id='li_BBB' class=''>";
                        lnbItem += "<a href='' onclick='$.ktBizLnbView.click(this); return false;'  id='BBBA' title='하위메뉴 열기'>사용량 조회</a>";
                        lnbItem += "<ul id='sub_BBBA' style='display: none;'>";
                          lnbItem += "<li class=''><a href='' id='BBBA0'>모바일</a></li>";
                          lnbItem += "<li class=''><a href='' id='BBBA1'>기가인터넷</a></li>";
                          lnbItem += "<li class=''><a href='' id='BBBA2'>WiBro</a></li>";
                        lnbItem += "</ul>";
                      lnbItem += "</li>";

                    lnbItem += "</ul>";
                  lnbItem += "</li>";
                  lnbItem += "<!-- e : 가입상품 조회/관리 -->";


                  lnbItem += "<li id='li_BC' class=''>";
                    lnbItem += "<a href='' id='BC' onclick='$.ktBizLnbView.click(this); return false;' title='하위메뉴 열기'>신청/변경</a>";
                    lnbItem += "<ul id='sub_BC' class='cfmOllehLnbNewListCont' style='display: none;'>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'><a href='' id='BCA'>요금제 신청</a></li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'><a href='' id='BCB'>부가서비스 신청</a></li>";
                      lnbItem += "<li id='li_BCC' class=''>";
                        lnbItem += "<a href='' onclick='$.ktBizLnbView.click(this); return false;' id='BCCA' title='하위메뉴 열기'>번호 변경</a>";
                        lnbItem += "<ul id='sub_BCCA' style='display: none;'>";
                          lnbItem += "<li class=''><a href='' id='BCCA0'>모바일</a></li>";
                          lnbItem += "<li class=''><a href='' id='BCCA1'>일반전화</a></li>";
                        lnbItem += "</ul>";
                      lnbItem += "</li>";

                      lnbItem += "<li id='li_BCD' class=''>";
                        lnbItem += "<a href='' onclick='$.ktBizLnbView.click(this); return false;' id='BCDA' title='하위메뉴 열기'>일시정지</a>";
                        lnbItem += "<ul id='sub_BCDA' style='display: none;'>";
                          lnbItem += "<li class=''><a href='' id='BCDA0'>모바일 신청/해제</a></li>";
                          lnbItem += "<li class=''><a href='' id='BCDA1'>모바일 이력조회</a></li>";
                          lnbItem += "<li class=''><a href='' id='BCDA2'>일반전화 신청/해제</a></li>";
                        lnbItem += "</ul>";
                      lnbItem += "</li>";

                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'><a href='' id='BCE'>설치장소변경</a></li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'><a href='' id='BCF'>명의변경</a></li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'><a href='' id='BCG'>분실신고</a></li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'><a href='' id='BCH'>상품신청/문의(대량구매)</a></li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'><a href='' id='BCI'>신청/변경 현황</a></li>";

                    lnbItem += "</ul>";
                  lnbItem += "</li>";


                lnbItem += "</ul>";
              lnbItem += "</div>";

          document.write(lnbItem);

          var $code = code;
          var $depth1Number = $code.substring(0,2);
          var $depth2Number = $code.substring(0,3);
          var $depth3Number = $code.substring(0,4);
          var $depth4Number = $code.substring(0,5);
          if($code.length==3){
            $('#li_'+$depth1Number).addClass('cfmOllehNewSelected');
            $('#sub_'+$depth1Number).show();
            $('#'+$depth2Number).closest('li').addClass('cfmOllehLnbtSelectedNoDepth');
            $('#'+$depth1Number).attr('title','하위메뉴 닫기');
          }else if($code.length==5){
            $('#li_'+$depth1Number).addClass('cfmOllehNewSelected');
            $('#li_'+$depth2Number).addClass('cfmOllehLnbNewListContSelected');
            $('#sub_'+$depth1Number+', #sub_'+$depth3Number).show();
            $('#'+$depth4Number).closest('li').addClass('cfmOllehLnbLastSelected');
            $('#'+$depth1Number+', #'+$depth3Number).attr('title','하위메뉴 닫기');
          };
          $.ktBizGnbView.code($code);

          return false;

      };

    /**
    * lnb click fn
    * @param {object} this
    */
      $.ktBizLnbView.click = function(obj){
          var $obj = $(obj);
          var $code = $obj.attr('id');
          var $parent = $obj.closest('li');
          if($code.length == '2'){
              $parent.toggleClass('cfmOllehNewSelected');
              $obj.attr('title','하위메뉴 닫기'); 
              if(!$parent.hasClass('cfmOllehNewSelected')){
                $obj.attr('title', '하위메뉴 열기');
              }
            }else if($code.length == '4'){
              $parent.closest('li').toggleClass('cfmOllehLnbNewListContSelected');
              $obj.attr('title','하위메뉴 닫기');
               if(!$parent.hasClass('cfmOllehLnbNewListContSelected')){
                $obj.attr('title', '하위메뉴 열기');
              }
            }

            $obj.next('ul').toggle();

          return false;
      }


    /**
    * gnb on or off fn
    * @param {string} gnb code value
    */
      $.ktBizGnbView.code = function(code){

        var $code = code;
        var $codeArray = ["BA", "BB", "BC"];
        var $depth1Number = $code.substring(0,2);
        var $target = $('.cfmOllehGnb-menu > li');
          for(var i=0; i<$codeArray.length; i++){
            if($codeArray[i]==$depth1Number){
              $target.children('a').removeClass('on');
              $target.eq(i).children('a').addClass('on');
            }
          };
         
      };



      /* common footer include fn */
      $.ktBizFooterView = function(){
            var footerItem = "";
                  footerItem += "<h2 class='blind'>올레닷컴 주요메뉴</h2>";
                  footerItem += "<ul class='cfmOllehNewFooterMenu'>";
                      
                    footerItem += "<li>";

                      footerItem += "<a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=1&amp;depth2=1' >전화</a>";
                      footerItem += "<ul>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=1&amp;depth2=1' >인터넷전화</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=1&amp;depth2=2' >일반전화</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=1&amp;depth2=3' >국제전화</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=1&amp;depth2=4' >전국대표번호</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=1&amp;depth2=5' >무료전화080</a></li>";
                      footerItem += "</ul>";  

                    footerItem += "</li>";    

                    footerItem += "<li>";

                      footerItem += "<a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=2&amp;depth2=1' >인터넷/데이터</a>";
                      footerItem += "<ul>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=2&amp;depth2=1' >인터넷</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=2&amp;depth2=2' >전용회선</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=2&amp;depth2=3' >글로벌데이터</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=2&amp;depth2=4' >ucloud biz</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=2&amp;depth2=5' >IDC</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=2&amp;depth2=6' >Managed</a></li>";
                      footerItem += "</ul>";  

                    footerItem += "</li>";    

                    footerItem += "<li>";
                      footerItem += "<a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=3&amp;depth2=1' >모바일</a>";
                      footerItem += "<ul>";               
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=3&amp;depth2=1' >요금제</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=3&amp;depth2=2' >특화 서비스</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=3&amp;depth2=3' >모바일웍스</a></li>";
                      footerItem += "</ul>";  

                    footerItem += "</li>";    

                    footerItem += "<li>";

                      footerItem += "<a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=4&amp;depth2=1' >IoT</a>";
                      footerItem += "<ul>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=4&amp;depth2=1' >이동체</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=4&amp;depth2=2' >케어/보안</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=4&amp;depth2=3' >환경/방재</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=4&amp;depth2=4' >IoT무선서비스</a></li>";
                      footerItem += "</ul>";  

                    footerItem += "</li>";    

                    footerItem += "<li>";
                      footerItem += "<a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=5&amp;depth2=1' >기업솔루션</a>";
                      footerItem += "<ul>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=5&amp;depth2=1' >bizmeka</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=5&amp;depth2=2' >기업보안</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=5&amp;depth2=3' >스마트빌딩</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=5&amp;depth2=4' >스마트에너지</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/submain.do?idx=5&amp;depth2=5' >디지털사이니지</a></li>";
                      footerItem += "</ul>";  

                    footerItem += "</li>";    

                    footerItem += "<li>";
                      footerItem += "<a href='http://biz.olleh.com/biz/wBiz/customer/findMyItemMain.do?idx=6' >맞춤 컨설팅</a>";
                      footerItem += "<ul>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/customer/findMyItemMain.do?idx=6' >내게 맞는 상품찾기</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/customer/consultMain.do?idx=6' >온라인 컨설팅 신청</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/customer/consultQnaMain.do?idx=6' >1:1 문의</a></li>";
                      footerItem += "</ul>";
                    footerItem += "</li>";
                    footerItem += "<li>";
                      footerItem += "<a href='http://biz.olleh.com/biz/wBiz/customer/faqMain.do' >이용안내</a>";
                      footerItem += "<ul>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/customer/faqMain.do' >FAQ</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/customer/fileMain.do' >신청서 다운로드</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/customer/contactInfoMain.do' >연락처 안내</a></li>";
                        footerItem += "<li><a href='http://biz.olleh.com/biz/wBiz/customer/noticeMain.do' >공지사항</a></li>";
                      footerItem += "</ul>";        
                    footerItem += "</li>";
                  footerItem += "</ul>";


                  footerItem += "<div class='cfmfooterOllehMain'>";
                  footerItem += "<h2 class='blind'>올레 약관 및 소개</h2>";
                  footerItem += "<ul class='info'>";
                    footerItem += "<li>";
                      footerItem += "<a href='http://www.kt.com/main.jsp' title='새창열림' target='_blank' >회사소개</a>";
                    footerItem += "</li>";
                    footerItem += "<li class='button'>";
                      footerItem += "<a href='http://www.kt.com/eng/main.jsp' title='새창열림' target='_blank' ><img src='../../images/common/cfm_btn_english.png' alt='ENGLISH' /></a>";
                    footerItem += "</li>";
                    footerItem += "<li class='button'>";
                      footerItem += "<a href='http://global.olleh.com/eng/main.do' title='새창열림' target='_blank' ><img src='../../images/common/cfm_btn_shop.png' alt='SHOP' /></a>";
                    footerItem += "</li>";
                    footerItem += "<li>";
                      footerItem += "<a href='http://www.olleh.com/index.asp?code=HB000' >이용약관</a></li>";
                    footerItem += "<li>";
                      footerItem += "<a href='http://www.olleh.com/index.asp?code=HC000' >법적고지</a></li>";
                    footerItem += "<li>";
                      footerItem += "<a href='http://www.olleh.com/index.asp?code=HD000' ><strong>개인정보취급방침</strong></a></li>";
                    footerItem += "<li>";
                      footerItem += "<a href='http://www.olleh.com/index.asp?code=HE000' >청소년 보호정책</a>";
                    footerItem += "</li>";
                    footerItem += "<li>";
                      footerItem += "<a href='http://www.olleh.com/index.asp?code=QBF00' >문의/안내처</a></li>";
                    footerItem += "<li>";
                      footerItem += "<a href='http://www.olleh.com/index.asp?code=HP000' >웹접근성 도움말</a></li>";
                    footerItem += "<li>";
                      footerItem += "<a href='http://inside.olleh.com/html/noticeList.asp?code=HAA00&amp;sub=01' >공지사항</a>";
                    footerItem += "</li>";
                    footerItem += "<li class='last'>";
                      footerItem += "<a href='https://my.olleh.com:444/kt12/price/Gui_CyberCancelApplyMain.jsp' >미환급금 조회</a>";
                    footerItem += "</li>";
                  footerItem += "</ul>";
                  footerItem += "<ul class='ollehMainListinfo'>";     
                    footerItem += "<li>(주)케이티 대표이사 황창규</li>";     
                    footerItem += "<li>사업자등록번호 : 102-81-42945</li>";    
                    footerItem += "<li class='down'>통신판매업신고 : 2002-경기성남-0048</li>";     
                    footerItem += "<li class='upAddress'><address>주소 : 경기도 성남시 분당구 불정로 90 (정자동)</address></li>";    
                    footerItem += "<li>TEL : <strong>국번없이 100</strong></li>";   
                  footerItem += "</ul>";
                  footerItem += "<ul class='cfmOllehMainKTsns'>";
                    footerItem += "<li>";
                      footerItem += "<a href='https://www.facebook.com/olleh.fb'  target='_blank' title='새창열림'><img src='../../images/common/cfm_icon_facebook.png' alt='페이스북' /></a>";
                    footerItem += "</li>";
                    footerItem += "<li>";
                      footerItem += "<a href='http://twitter.com/olleh' target='_blank' title='새창열림'><img src='../../images/common/cfm_icon_twitter.png' alt='트위터'/></a>";
                    footerItem += "</li>";
                    footerItem += "<li>";
                      footerItem += "<a href='https://plus.google.com/+olleh' target='_blank' title='새창열림'><img src='../../images/common/cfm_icon_google.png' alt='구글+'/></a>";
                    footerItem += "</li>";
                    footerItem += "<li>";
                      footerItem += "<a href='http://smartblog.olleh.com' target='_blank' title='새창열림'><img src='../../images/common/cfm_icon_blog.png' alt='블로그'/></a>";
                    footerItem += "</li>";
                    footerItem += "<li class='last'>";
                      footerItem += "<a href='http://help.olleh.com/pc/service/customercenter/SmsCenter.jsp' ><img src='../../images/common/cfm_icon_sms.png' alt='문자 고객센터'/></a>";
                    footerItem += "</li>";
                  footerItem += "</ul>";

                  footerItem += "<a href='javascript:olleh.popLink('http://www.ftc.go.kr/info/bizinfo/communicationViewPopup.jsp?wrkr_no=1028142945', 'OllehPOP', '750','700');' title='새창열림' class='company'>";
                    footerItem += "<img src='../../images/common/cfm_btn_licensee.png' alt='사업자정보확인'/>";
                  footerItem += "</a>";
                  footerItem += "<p class='copy'>Copyright ⓒ2011 - 2016 kt corp. All rights reserved.</p>";
                footerItem += "</div>";

            
            document.write(footerItem); 
      };