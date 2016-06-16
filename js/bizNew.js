
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
          $target.val("");
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
    * input placeholder fn
    */
    $.ktBizPlaceholder = function(){
      var $target = $('.placeholder');
      var $targetValue = $target.val();
      $target.addClass('active');

      $target.focus(function(){
          if($targetValue == $target.val()){
              $target.val('').removeClass('active');
          }
      }).focusout(function(){
          if(!this.value){
            $target.val($targetValue).addClass('active');
          }
      });
     
      return false;
    };


    /**
    * select box chg fn
    */

    $.ktBizSelect = function(){};

    $.ktBizSelect.index = function(obj){
        var $obj = $(obj);
        var text = $obj.children("option:selected").text();
        $obj.siblings("p").children('.selectTxt').text(text);
    };


    $.ktBizSelect.index.focus = function(){
        $(".index_select").focusin(function(){
            $(this).parent('div').addClass('on');
        }).focusout(function(){
            $(this).parent('div').removeClass('on')
        });
    };

    $.ktBizSelect.index.focus();


    /**
    * global select box
    */
	$('.selectWrap select').selectric();


    /**
    * layerPopup accessibility focus fn
    * @param {object} this.
    */
    $.ktBizPopClick = function(obj){
        var $target = $($(obj).attr('href'));
        var $mask =$target.prev('.pop_mask');
        var $wh = $(window).height();
        var $lh = $target.height();
        var $setTop = ($wh-$lh)/2;


        $target.find('.pop_close a, .pop_btn_close').attr('href', obj.id);
        $target.show().css('top',$setTop+'px');
        $mask.show();
        $target.find('.pop_conts').attr('tabindex',0).focus();
        $target.find('.pop_close a, .pop_btn_close').click(function(){
            $target.hide();
            $mask.hide();
            obj.focus();
            $target.find('.pop_conts').removeAttr('tabIndex');
            return false;
        });
        
        return false;
    };


    /**
    * tab & contents module
    * @param {number} tab style number
    * @param {object} this.
    * @param {string} contents division level.
    */
    $.ktBizTabs = function(type, obj, division){
        var $target = $($(obj).attr('href')); // 노출될 division
        var $parents = $(obj).closest('li'); // this의 자신 부모 li
        var $friend = $parents.closest('ul').children('li'); // 자신 부모 li 의 같은 레벨의 li 들 
        var $tabWrap = $parents.closest('ul').parents('div.comm_tabs'); // 현재 탭 wrapper
        var $subTab = $(obj).next('ul'); // sub ul
        var $division = $('#'+division); // 노출될 division의 wrapper

        if(type=="02"){
          $.ktBizTabs.type02($target, $parents, $division, $friend);
        }else{
          $.ktBizTabs.type01($target, $parents, $tabWrap, $division, $subTab);
        }
        
        return false;
    };


    /**
    * tab 1depth contents module
    * @param {object} contents class object
    * @param {object} this parents li object
    * @param {object} this wrapper object
    * @param {object} conetns wrapper object
    * @param {object} sub list ul object
    */
    $.ktBizTabs.type01 = function($target, $parents, $tabWrap, $division, $subTab){
        if(!$parents.hasClass('selected')){
            $division.children('div').hide();
            $target.show();
            $tabWrap.find('li').removeClass('selected');
            $parents.addClass('selected');
            $subTab.children('li').eq(0).addClass('selected');
        }
        return false;
    };


    /**
    * tab 2depth contents module
    * @param {object} contents class object
    * @param {object} this parents li object
    * @param {object} conetns wrapper object
    * @param {object} this parents all li object
    */
    $.ktBizTabs.type02 = function($target, $parents, $division, $friend){
        $division.children('div').hide();
        $target.show();
        $friend.removeClass('selected');
        $parents.addClass('selected');
        return false;
    }


    // category tab focus fn
    $.ktBizTabs.focus = function(){
      $('.tabsCategory_sub_item > li > a').each(function(){
          $(this).bind('focusin', function(){
            $(this).addClass('focusin');
            $(this).parents('li').addClass('focusin');
          }).bind('focusout', function(){
            $(this).removeClass('focusin');
            $(this).parents('li').removeClass('focusin');
          });
        });
    }
    $.ktBizTabs.focus();


    

    /*
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

    $.ktBizTabMenu.depth02 = function($target, $parents, $friend, name, obj) {
        $friend.removeClass('on');
        $parents.addClass('on');
        $('.'+name).hide();
        $target.show();
    }

    */

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

    $.ktBizPlaceholder();

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
                gnbItem += "<a href='#'>로그인</a>";
              gnbItem += "</li> ";
              gnbItem += "<li>";
                gnbItem += "<a href='#'>회원가입</a>";
              gnbItem += "</li> ";
              gnbItem += "<li class='last'>";
                gnbItem += "<a href='http://biz.olleh.com/biz/wBiz/customer/faqMain.do'>고객센터</a>";
              gnbItem += "</li> ";
            gnbItem += "</ul>";
            gnbItem += "<!-- e : customer center util menu -->";

            gnbItem += "<h2 class='blind'>주메뉴 영역</h2>";



            gnbItem += "<!-- s : gnb -->";
            gnbItem += "<ul class='cfmOllehGnb-menu'>";

                  gnbItem += "<!-- s : gnb item01 -->";
                  gnbItem += "<li class='cfmOllehGnb-menu-item'>";
                      gnbItem += "<a href='#' class='link myPage on'>My페이지</a>";

                      gnbItem += "<div class='cfmOllehGnb-submenu'>";
                          gnbItem += "<div class='cfmOllehGnb-submenu-title'>";
                              gnbItem += "<strong>My페이지</strong>";
                              gnbItem += "<span>법인 고객님들을 위해 가입상품 및 요금, 청구서를 편리하게 조회할 수 있습니다.</span>";
                          gnbItem += "</div>"; 
                          gnbItem += "<ul class='cfmOllehGnb-submenu-list'>";
                            gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='#' class='group-heading'>요금조회/납부</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>명세서 조회</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>월별요금조회</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>실시간 요금</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>분리납부내역 조회</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>요금납부</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>납부방법 변경</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>명세서 관리</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                              gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='#' class='group-heading'>가입상품 조회/관리</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>내상품 조회 </a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>사용량조회</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                              gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='#' class='group-heading'>신청/변경</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>요금제 신청</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>부가서비스 신청</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>번호변경</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>일시정지</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>설치장소 변경</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>분실신고</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>상품 신청/문의(대량구매)</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>신청/변경 현황</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                          gnbItem += "</ul>";
                      gnbItem += "</div>";
                  gnbItem += "</li>";
                  gnbItem += "<!-- e : gnb item01 -->";

                  gnbItem += "<!-- s : gnb item02 -->";
                  gnbItem += "<li class='cfmOllehGnb-menu-item phone'>";
                      gnbItem += "<a href='#' class='link phone'>전화</a>";

                      gnbItem += "<div class='cfmOllehGnb-submenu'>";
                          gnbItem += "<div class='cfmOllehGnb-submenu-title'>";
                              gnbItem += "<strong>전화</strong>";
                              gnbItem += "<span>기업환경에 최적화된 커뮤니케이션 방법, 고객님께 제안해 드려요.</span>";
                          gnbItem += "</div>"; 

                          gnbItem += "<ul class='cfmOllehGnb-submenu-list'>";
                            gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='#' class='group-heading'>인터넷전화</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz 인터넷전화</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>kt biz 인터넷전화 centrex</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                              gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='#' class='group-heading'>일반전화</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>ISDN PRI</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>이너텔</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>구내교환 DID/DOD</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>이너텔c-type</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>m이너텔</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                              gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='#' class='group-heading'>국제전화</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>국제전화 express</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>800단일번호서비스</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>국제클로버서비스</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>001 biz 요금제</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz 글로벌 메시징</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                              gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='#' class='group-heading'>전국대표번호</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>전국대표번호</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                              gnbItem += "<li class='cfmOllehGnb-submenu-item next-item'>";
                                gnbItem += "<a href='#' class='group-heading'>무료전화080</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>무료전화080</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                          gnbItem += "</ul>";
                      gnbItem += "</div>";
                  gnbItem += "</li>";
                  gnbItem += "<!-- e : gnb item02 -->";


                  gnbItem += "<!-- s : gnb item03 -->";
                  gnbItem += "<li class='cfmOllehGnb-menu-item internetData'>";
                      gnbItem += "<a href='#' class='link internetData'>인터넷/데이터</a>";

                      gnbItem += "<div class='cfmOllehGnb-submenu'>";
                          gnbItem += "<div class='cfmOllehGnb-submenu-title'>";
                              gnbItem += "<strong>인터넷/데이터</strong>";
                              gnbItem += "<span>빠른 속도와 완벽한 보안으로 기업 경쟁력을 강화하세요.</span>";
                          gnbItem += "</div>"; 

                          gnbItem += "<ul class='cfmOllehGnb-submenu-list'>";
                            gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='#' class='group-heading'>인터넷</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>kt biz GiGA office</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz kornet</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz VPN</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                              gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='#' class='group-heading'>전용회선</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>일반전용회선</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>방송전용회선</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>CCTV전용회선</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                              gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='#' class='group-heading'>글로벌데이터</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>글로벌데이터</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                              gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='#' class='group-heading'>ucloud biz</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh ucloud biz</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                              gnbItem += "<li class='cfmOllehGnb-submenu-item next-item''>";
                                gnbItem += "<a href='#' class='group-heading'>IDC</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz 코로케이션</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>서버호스팅</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>MSP</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>보안서비스</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>백업서비스</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz CDN</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                              gnbItem += "<li class='cfmOllehGnb-submenu-item next-item''>";
                                gnbItem += "<a href='#' class='group-heading'>Managed</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>Managed 네트워크</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>Managed 무선랜</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>Managed IP-PBX</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>Managed Device</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>Managed 서버</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                          gnbItem += "</ul>";
                      gnbItem += "</div>";
                  gnbItem += "</li>";
                  gnbItem += "<!-- e : gnb item03 -->";



                  gnbItem += "<!-- s : gnb item04 -->";
                  gnbItem += "<li class='cfmOllehGnb-menu-item mobile'>";
                      gnbItem += "<a href='#' class='link mobile'>모바일</a>";

                      gnbItem += "<div class='cfmOllehGnb-submenu'>";
                          gnbItem += "<div class='cfmOllehGnb-submenu-title'>";
                              gnbItem += "<strong>모바일</strong>";
                              gnbItem += "<span>기업에 특화된 서비스로 스마트한 비즈니스 환경을 갖추세요.</span>";
                          gnbItem += "</div>"; 

                          gnbItem += "<ul class='cfmOllehGnb-submenu-list'>";
                            gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='#' class='group-heading'>요금제</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>biz data 기본형</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>biz data 무제한</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>biz data 대용량</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                              gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='#' class='group-heading'>특화 서비스</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>kt 기업전용 LTE</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>법인명의 본인확인</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>법인 마케팅서비스</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz data box</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>분리과금</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>올레 콘텐츠박스</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>LTE 데이터쿠폰</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                              gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                gnbItem += "<a href='#' class='group-heading'>모바일웍스</a>";
                                gnbItem += "<ul class='group-list'>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz MDM</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz MAM</a></li>";
                                  gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz MCM</a></li>";
                                gnbItem += "</ul>";
                              gnbItem += "</li>";
                              
                          gnbItem += "</ul>";
                      gnbItem += "</div>";
                  gnbItem += "</li>";
                  gnbItem += "<!-- e : gnb item04 -->";



                  gnbItem += "<!-- s : gnb item05 -->";
                      gnbItem += "<li class='cfmOllehGnb-menu-item iot'>";
                          gnbItem += "<a href='#' class='link iot'>IoT</a>";

                          gnbItem += "<div class='cfmOllehGnb-submenu'>";
                              gnbItem += "<div class='cfmOllehGnb-submenu-title'>";
                                  gnbItem += "<strong>IoT</strong>";
                                  gnbItem += "<span>정보와 사람을 연결한 서비스, 새로운 가치를 느껴보세요.</span>";
                              gnbItem += "</div>"; 

                              gnbItem += "<ul class='cfmOllehGnb-submenu-list'>";
                                gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                    gnbItem += "<a href='#' class='group-heading'>이동체</a>";
                                    gnbItem += "<ul class='group-list'>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz 브랜드택시</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz DTG</a></li>";
                                    gnbItem += "</ul>";
                                  gnbItem += "</li>";
                                  gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                    gnbItem += "<a href='#' class='group-heading'>케어/보안</a>";
                                    gnbItem += "<ul class='group-list'>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>어린이 안심서비스</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>U안심알리미</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh 똑똑</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh CCTV telecop</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh CCTV telecop plus</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh CCTV</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>페이스캅</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh 통합보안 Package</a></li>";
                                    gnbItem += "</ul>";
                                  gnbItem += "</li>";
                                  gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                    gnbItem += "<a href='#' class='group-heading'>환경/방재</a>";
                                    gnbItem += "<ul class='group-list'>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>MOS</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>Smart Toner</a></li>";
                                    gnbItem += "</ul>";
                                  gnbItem += "</li>";
                                  gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                    gnbItem += "<a href='#' class='group-heading'>IoT무선서비스</a>";
                                    gnbItem += "<ul class='group-list'>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>IoT무선서비스</a></li>";
                                    gnbItem += "</ul>";
                                  gnbItem += "</li>";
                                  
                              gnbItem += "</ul>";
                          gnbItem += "</div>";
                      gnbItem += "</li>";
                      gnbItem += "<!-- e : gnb item05 -->";



                      gnbItem += "<!-- s : gnb item06 -->";
                      gnbItem += "<li class='cfmOllehGnb-menu-item bizSolution'>";
                          gnbItem += "<a href='#' class='link bizSolution'>기업솔루션</a>";

                          gnbItem += "<div class='cfmOllehGnb-submenu'>";
                              gnbItem += "<div class='cfmOllehGnb-submenu-title'>";
                                  gnbItem += "<strong>기업솔루션</strong>";
                                  gnbItem += "<span>고객님의 사업관리에 필요한 다양한 상품들을 만나보세요.</span>";
                              gnbItem += "</div>"; 

                              gnbItem += "<ul class='cfmOllehGnb-submenu-list'>";
                                gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                    gnbItem += "<a href='#' class='group-heading'>bizemeka</a>";
                                    gnbItem += "<ul class='group-list'>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>bizmeka 그룹웨어</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>화상회의</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh bizmeka 365 esd</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>bizmeka 콜센터</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>bizmeka 전자회로 기판 관리서비스</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz 크로샷</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz say</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>전화회의 MeetMe</a></li>";
                                    gnbItem += "</ul>";
                                  gnbItem += "</li>";
                                  gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                    gnbItem += "<a href='#' class='group-heading'>기업보안</a>";
                                    gnbItem += "<ul class='group-list'>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz Secure IP</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz 파밍 차단</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>Managed 보안</a></li>";
                                    gnbItem += "</ul>";
                                  gnbItem += "</li>";
                                  gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                    gnbItem += "<a href='#' class='group-heading'>스마트빌딩</a>";
                                    gnbItem += "<ul class='group-list'>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>광대역무선통합인프라</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz smart CMS</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz 통합 SI/FMS</a></li>";
                                    gnbItem += "</ul>";
                                  gnbItem += "</li>";
                                  gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                    gnbItem += "<a href='#' class='group-heading'>스마트에너지</a>";
                                    gnbItem += "<ul class='group-list'>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>olleh biz BEMS</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>에너지효율화사업</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>에너지 진단</a></li>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>그린리모델링</a></li>";
                                    gnbItem += "</ul>";
                                  gnbItem += "</li>";
                                  gnbItem += "<li class='cfmOllehGnb-submenu-item next-item''>";
                                    gnbItem += "<a href='#' class='group-heading'>디지털사이니지</a>";
                                    gnbItem += "<ul class='group-list'>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>메가/메디 프레임</a></li>";
                                    gnbItem += "</ul>";
                                  gnbItem += "</li>";
                                  
                              gnbItem += "</ul>";
                          gnbItem += "</div>";
                      gnbItem += "</li>";
                      gnbItem += "<!-- e : gnb item06 -->";


                      gnbItem += "<!-- s : gnb item07 -->";
                      gnbItem += "<li class='cfmOllehGnb-menu-item consulting'>";
                          gnbItem += "<a href='#' class='link consulting'>맞춤 컨설팅</a>";

                          gnbItem += "<div class='cfmOllehGnb-submenu'>";
                              gnbItem += "<div class='cfmOllehGnb-submenu-title'>";
                                  gnbItem += "<strong>맞춤컨설팅</strong>";
                                  gnbItem += "<span>고객님의 성공적인 비즈니스를 위해 최고의 온라인 컨설팅을 준비했어요.</span>";
                              gnbItem += "</div>"; 

                              gnbItem += "<ul class='cfmOllehGnb-submenu-list'>";
                                gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                    gnbItem += "<a href='#' class='group-heading'>내게 맞는 상품 찾기</a>";
                                    gnbItem += "<ul class='group-list'>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>내게 맞는 상품 찾기</a></li>";
                                    gnbItem += "</ul>";
                                  gnbItem += "</li>";
                                  gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                    gnbItem += "<a href='#' class='group-heading'>온라인 컨설팅 신청</a>";
                                    gnbItem += "<ul class='group-list'>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>온라인 컨설팅 신청</a></li>";
                                    gnbItem += "</ul>";
                                  gnbItem += "</li>";
                                  gnbItem += "<li class='cfmOllehGnb-submenu-item'>";
                                    gnbItem += "<a href='#' class='group-heading'>1:1문의</a>";
                                    gnbItem += "<ul class='group-list'>";
                                      gnbItem += "<li class='group-item'><a href='#' class='group-link'>1:1문의</a></li>";
                                    gnbItem += "</ul>";
                                  gnbItem += "</li>";
                                 
                                  
                              gnbItem += "</ul>";
                          gnbItem += "</div>";
                      gnbItem += "</li>";
                      gnbItem += "<!-- e : gnb item07 -->";

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
                          gnbItem += "<h3 class='cfmOllehTotalTitle'>My페이지</h3>";
                          gnbItem += "<ul class='cfmOllehTotalMenuList'>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>요금조회/납부</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>명세서 조회</a></li>";
                                gnbItem += "<li><a href='#'>월별요금조회</a></li>";
                                gnbItem += "<li><a href='#'>실시간 요금</a></li>";
                                gnbItem += "<li><a href='#'>분리납부내역 조회</a></li>";
                                gnbItem += "<li><a href='#'>요금납부</a></li>";
                                gnbItem += "<li><a href='#'>납부방법 변경</a></li>";
                                gnbItem += "<li><a href='#'>명세서 관리</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>가입상품 조회/관리</a></h4>";
                              gnbItem += "<ul class='inlist'>";
                                gnbItem += "<li><a href='#'>내상품조회</a></li>";
                                gnbItem += "<li><a href='#'>사용량조회</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>신청/변경</a></h4>";
                              gnbItem += "<ul class='inlist'>";
                                gnbItem += "<li><a href='#'>요금제 신청</a></li>";
                                gnbItem += "<li><a href='#'>부가서비스 신청</a></li>";
                                gnbItem += "<li><a href='#'>번호변경</a></li>";
                                gnbItem += "<li><a href='#'>일시정지</a></li>";
                                gnbItem += "<li><a href='#'>설치장소 변경</a></li>";
                                gnbItem += "<li><a href='#'>분실신고</a></li>";
                                gnbItem += "<li><a href='#'>상품 신청/문의 (대량구매)</a></li>";
                                gnbItem += "<li><a href='#'>신청/변경 현황</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                           
                          gnbItem += "</ul>";
                        gnbItem += "</div>";
                        gnbItem += "<!-- e : section item01 -->";



                        gnbItem += "<!-- s : section item02 -->";
                        gnbItem += "<div class='cfmOllehTotalSectionCont-group'>";
                          gnbItem += "<h3 class='cfmOllehTotalTitle'>전화</h3>";
                          gnbItem += "<ul class='cfmOllehTotalMenuList'>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>인터넷전화</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>olleh biz 인터넷전화</a></li>";
                                gnbItem += "<li><a href='#'>kt biz 인터넷전화 centrex</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>일반전화</a></h4>";
                              gnbItem += "<ul class='inlist'>";
                                gnbItem += "<li><a href='#'>ISDN PRI</a></li>";
                                gnbItem += "<li><a href='#'>이너텔</a></li>";
                                gnbItem += "<li><a href='#'>구내교환 DID/DOD</a></li>";
                                gnbItem += "<li><a href='#'>이너텔c-type</a></li>";
                                gnbItem += "<li><a href='#'>m이너텔</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>국제전화</a></h4>";
                              gnbItem += "<ul class='inlist'>";
                                gnbItem += "<li><a href='#'>국제전화 express</a></li>";
                                gnbItem += "<li><a href='#'>800단일번호서비스</a></li>";
                                gnbItem += "<li><a href='#'>국제클로버서비스</a></li>";
                                gnbItem += "<li><a href='#'>001 biz 요금제</a></li>";
                                gnbItem += "<li><a href='#'>olleh biz 글로벌 메시징</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>전국대표번호</a></h4>";
                              gnbItem += "<ul class='inlist'>";
                                gnbItem += "<li><a href='#'>전국대표번호</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>무료전화080</a></h4>";
                              gnbItem += "<ul class='inlist'>";
                                gnbItem += "<li><a href='#'>무료전화080</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                          gnbItem += "</ul>";
                        gnbItem += "</div>";
                        gnbItem += "<!-- e : section item02 -->";

                        gnbItem += "<!-- s : section item03 -->";
                        gnbItem += "<div class='cfmOllehTotalSectionCont-group'>";
                          gnbItem += "<h3 class='cfmOllehTotalTitle'>인터넷/데이터</h3>";
                          gnbItem += "<ul class='cfmOllehTotalMenuList'>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>인터넷</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>kt biz GiGa office</a></li>";
                                gnbItem += "<li><a href='#'>olleh biz kornet</a></li>";
                                gnbItem += "<li><a href='#'>olleh biz VPN</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>전용회선</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>일반전용회선</a></li>";
                                gnbItem += "<li><a href='#'>방송전용회선</a></li>";
                                gnbItem += "<li><a href='#'>CCTV전용회선</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>글로벌데이터</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>글로벌데이터</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>ucloud biz</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>olleh ucloud biz</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>IDC</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>olleh biz 코로케이션</a></li>";
                                gnbItem += "<li><a href='#'>서버호스팅</a></li>";
                                gnbItem += "<li><a href='#'>MSP</a></li>";
                                gnbItem += "<li><a href='#'>보안서비스</a></li>";
                                gnbItem += "<li><a href='#'>백업서비스</a></li>";
                                gnbItem += "<li><a href='#'>olleh biz CDN</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>Managed</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>Managed 네트워크</a></li>";
                                gnbItem += "<li><a href='#'>Managed 무선랜</a></li>";
                                gnbItem += "<li><a href='#'>Managed IP-PBX</a></li>";
                                gnbItem += "<li><a href='#'>Managed Device</a></li>";
                                gnbItem += "<li><a href='#'>Managed 서버</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                          gnbItem += "</ul>";
                        gnbItem += "</div>";
                        gnbItem += "<!-- e : section item03 -->";


                        gnbItem += "<!-- s : section item04 -->";
                        gnbItem += "<div class='cfmOllehTotalSectionCont-group sectionCont-left'>";
                          gnbItem += "<h3 class='cfmOllehTotalTitle'>모바일</h3>";
                          gnbItem += "<ul class='cfmOllehTotalMenuList'>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>요금제</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>biz data 기본형</a></li>";
                                gnbItem += "<li><a href='#'>biz data 무제한</a></li>";
                                gnbItem += "<li><a href='#'>biz data 대용량</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>특화 서비스</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>kt 기업전용 LTE</a></li>";
                                gnbItem += "<li><a href='#'>법인명의 본인확인</a></li>";
                                gnbItem += "<li><a href='#'>법인 마케팅서비스</a></li>";
                                gnbItem += "<li><a href='#'>olleh biz data box</a></li>";
                                gnbItem += "<li><a href='#'>분리과금</a></li>";
                                gnbItem += "<li><a href='#'>올레 콘텐츠박스</a></li>";
                                gnbItem += "<li><a href='#'>LTE 데이터쿠폰</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li class='w120'>";
                              gnbItem += "<h4><a href='#'>모바일웍스</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>olleh biz MDM</a></li>";
                                gnbItem += "<li><a href='#'>olleh biz MAM</a></li>";
                                gnbItem += "<li><a href='#'>olleh biz MCM</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                          gnbItem += "</ul>";
                        gnbItem += "</div>";
                        gnbItem += "<!-- e : section item04 -->";


                        gnbItem += "<!-- s : section item05 -->";
                        gnbItem += "<div class='cfmOllehTotalSectionCont-group sectionCont-right'>";
                          gnbItem += "<h3 class='cfmOllehTotalTitle'>IoT</h3>";
                          gnbItem += "<ul class='cfmOllehTotalMenuList'>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>이동체</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>olleh biz 브랜드택시</a></li>";
                                gnbItem += "<li><a href='#'>olleh biz DTG</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>케어/보안</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>어린이 안심서비스</a></li>";
                                gnbItem += "<li><a href='#'>U안심알리미</a></li>";
                                gnbItem += "<li><a href='#'>olleh 똑똑</a></li>";
                                gnbItem += "<li><a href='#'>olleh CCTV telecop</a></li>";
                                gnbItem += "<li><a href='#'>olleh CCTV telecop plus</a></li>";
                                gnbItem += "<li><a href='#'>olleh CCTV</a></li>";
                                gnbItem += "<li><a href='#'>페이스캅</a></li>";
                                gnbItem += "<li><a href='#'>olleh 통합보안 package</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>환경/방재</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>MOS</a></li>";
                                gnbItem += "<li><a href='#'>Smart Toner</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li class='mt25'>";
                              gnbItem += "<h4><a href='#'>IoT무선서비스</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>IoT무선서비스</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                          gnbItem += "</ul>";
                        gnbItem += "</div>";
                        gnbItem += "<!-- e : section item05 -->";



                        gnbItem += "<!-- s : section item06 -->";
                        gnbItem += "<div class='cfmOllehTotalSectionCont-group clear'>";
                          gnbItem += "<h3 class='cfmOllehTotalTitle'>기업솔루션</h3>";
                          gnbItem += "<ul class='cfmOllehTotalMenuList'>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>bizemeka</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>bizemeka 그룹웨어</a></li>";
                                gnbItem += "<li><a href='#'>화상회의</a></li>";
                                gnbItem += "<li><a href='#'>olleh bizmeka 365 esd</a></li>";
                                gnbItem += "<li><a href='#'>bizmeka 콜센터</a></li>";
                                gnbItem += "<li><a href='#'>bizmeka 에듀</a></li>";
                                gnbItem += "<li><a href='#'>bizmeka 전자회로 기판 관리서비스</a></li>";
                                gnbItem += "<li><a href='#'>olleh biz 크로샷</a></li>";
                                gnbItem += "<li><a href='#'>olleh biz say</a></li>";
                                gnbItem += "<li><a href='#'>전화회의 MeetMe</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>기업보안</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>olleh biz Secure IP</a></li>";
                                gnbItem += "<li><a href='#'>olleh biz 파밍 차단</a></li>";
                                gnbItem += "<li><a href='#'>Managed 보안</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>스마트빌딩</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>광대역무선통합인프라</a></li>";
                                gnbItem += "<li><a href='#'>olleh biz smart CMS</a></li>";
                                gnbItem += "<li><a href='#'>olleh biz 통합 SI/FMS</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>스마트 에너지</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>olleh biz BEMS</a></li>";
                                gnbItem += "<li><a href='#'>에너지효율화사업</a></li>";
                                gnbItem += "<li><a href='#'>에너지 진단</a></li>";
                                gnbItem += "<li><a href='#'>그린리모델링</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>디지털사이니지</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>메가/메디 프레임</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>Managed</a></h4>";
                              gnbItem += "<ul class='inlinst'>";
                                gnbItem += "<li><a href='#'>Managed 네트워크</a></li>";
                                gnbItem += "<li><a href='#'>Managed 무선랜</a></li>";
                                gnbItem += "<li><a href='#'>Managed IP-PBX</a></li>";
                                gnbItem += "<li><a href='#'>Managed Device</a></li>";
                                gnbItem += "<li><a href='#'>Managed 서버</a></li>";
                              gnbItem += "</ul>";
                            gnbItem += "</li>";
                          gnbItem += "</ul>";
                        gnbItem += "</div>";
                        gnbItem += "<!-- e : section item06 -->";



                        gnbItem += "<!-- s : section item07 -->";
                        gnbItem += "<div class='cfmOllehTotalSectionCont-group'>";
                          gnbItem += "<h3 class='cfmOllehTotalTitle'>맞춤 컨설팅</h3>";
                          gnbItem += "<ul class='cfmOllehTotalMenuList'>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>내게 맞는 상품 찾기</a></h4></li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>온라인 컨설팅 신청</a></h4>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>1:1 문의</a></h4>";
                            gnbItem += "</li>";
                          gnbItem += "</ul>";
                        gnbItem += "</div>";
                        gnbItem += "<!-- e : section item07 -->";



                        gnbItem += "<!-- s : section item08 -->";
                        gnbItem += "<div class='cfmOllehTotalSectionCont-group'>";
                          gnbItem += "<h3 class='cfmOllehTotalTitle'>고객센터</h3>";
                          gnbItem += "<ul class='cfmOllehTotalMenuList'>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>FAQ</a></h4></li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>신청서 다운로드</a></h4>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>연락처 안내</a></h4>";
                            gnbItem += "</li>";
                            gnbItem += "<li>";
                              gnbItem += "<h4><a href='#'>공지사항</a></h4>";
                            gnbItem += "</li>";
                          gnbItem += "</ul>";
                        gnbItem += "</div>";
                        gnbItem += "<!-- e : section item08 -->";


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
              lnbItem += "<h2 class='blind'>My페이지 LNB 메뉴 영역</h2>";
              lnbItem += "<div id='cfmOllehLnb'>";
                lnbItem += "<h3 id='cfmOllehLnbTitle' class='cfmOllehLnbTitle' >My페이지</h3>";
                lnbItem += "<ul id='cfmOllehLnbNewList' class='cfmOllehLnbNewList'>";
                  
                  lnbItem += "<!-- s : 요금조회/납부 -->";
                  lnbItem += "<li id='li_BA' class=''>";
                    lnbItem += "<a href='#' onclick='$.ktBizLnbView.click(this); return false;' id='BA' title='하위메뉴 열기'>요금조회/납부</a>";
                    lnbItem += "<ul id='sub_BA' class='cfmOllehLnbNewListCont' style='display: none;'>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='#' onclick='' id='BAA'>명세서 조회</a>";
                      lnbItem += "</li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='#' onclick='' id='BAB'>월별요금조회</a>";
                      lnbItem += "</li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='#' onclick='' id='BAC'>실시간요금</a>";
                      lnbItem += "</li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='#' onclick='' id='BAD'>분리납부내역 조회</a>";
                      lnbItem += "</li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='#' onclick='' id='BAE'>요금납부</a>";
                      lnbItem += "</li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='#' onclick='' id='BAF'>납부방법 변경</a>";
                      lnbItem += "</li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='#' onclick='' id='BAG'>명세서 관리</a>";
                      lnbItem += "</li>";

                    lnbItem += "</ul>";
                  lnbItem += "</li>";
                  lnbItem += "<!-- e : 요금조회/납부 -->";


                  lnbItem += "<!-- s : 가입상품 조회/관리 -->";
                  lnbItem += "<li id='li_BB' class=''>";
                    lnbItem += "<a href='#' id='BB' onclick='$.ktBizLnbView.click(this); return false;' title='하위메뉴 열기'>가입상품 조회/관리</a>";
                    lnbItem += "<ul id='sub_BB' class='cfmOllehLnbNewListCont' style='display: none;'>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'>";
                        lnbItem += "<a href='#' id='BBA'>내 상품 조회</a>";
                      lnbItem += "</li>";
                      lnbItem += "<li id='li_BBB' class=''>";
                        lnbItem += "<a href='#' onclick='$.ktBizLnbView.click(this); return false;'  id='BBBA' title='하위메뉴 열기'>사용량 조회</a>";
                        lnbItem += "<ul id='sub_BBBA' style='display: none;'>";
                          lnbItem += "<li class=''><a href='#' id='BBBA0'>모바일</a></li>";
                          lnbItem += "<li class=''><a href='#' id='BBBA1'>기가인터넷</a></li>";
                          lnbItem += "<li class=''><a href='#' id='BBBA2'>WiBro</a></li>";
                        lnbItem += "</ul>";
                      lnbItem += "</li>";

                    lnbItem += "</ul>";
                  lnbItem += "</li>";
                  lnbItem += "<!-- e : 가입상품 조회/관리 -->";


                  lnbItem += "<li id='li_BC' class=''>";
                    lnbItem += "<a href='#' id='BC' onclick='$.ktBizLnbView.click(this); return false;' title='하위메뉴 열기'>신청/변경</a>";
                    lnbItem += "<ul id='sub_BC' class='cfmOllehLnbNewListCont' style='display: none;'>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'><a href='#' id='BCA'>요금제 신청</a></li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'><a href='#' id='BCB'>부가서비스 신청</a></li>";
                      lnbItem += "<li id='li_BCC' class=''>";
                        lnbItem += "<a href='#' onclick='$.ktBizLnbView.click(this); return false;' id='BCCA' title='하위메뉴 열기'>번호 변경</a>";
                        lnbItem += "<ul id='sub_BCCA' style='display: none;'>";
                          lnbItem += "<li class=''><a href='#' id='BCCA0'>모바일</a></li>";
                          lnbItem += "<li class=''><a href='#' id='BCCA1'>일반전화</a></li>";
                        lnbItem += "</ul>";
                      lnbItem += "</li>";

                      lnbItem += "<li id='li_BCD' class=''>";
                        lnbItem += "<a href='#' onclick='$.ktBizLnbView.click(this); return false;' id='BCDA' title='하위메뉴 열기'>일시정지</a>";
                        lnbItem += "<ul id='sub_BCDA' style='display: none;'>";
                          lnbItem += "<li class=''><a href='#' id='BCDA0'>모바일 신청/해제</a></li>";
                          lnbItem += "<li class=''><a href='#' id='BCDA1'>모바일 이력조회</a></li>";
                          lnbItem += "<li class=''><a href='#' id='BCDA2'>일반전화 신청/해제</a></li>";
                        lnbItem += "</ul>";
                      lnbItem += "</li>";

                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'><a href='#' id='BCE'>설치장소변경</a></li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'><a href='#' id='BCG'>분실신고</a></li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'><a href='#' id='BCH'>상품신청/문의(대량구매)</a></li>";
                      lnbItem += "<li class='cfmOllehLnbNewNoDepth'><a href='#' id='BCI'>신청/변경 현황</a></li>";

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
          /*$.ktBizGnbView.code($code);*/
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
                  footerItem += "<div class='cfmfooterOllehMain'>";
                  footerItem += "<h2 class='blind'>올레(기업) 약관 및 소개</h2>";
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