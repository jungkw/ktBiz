// Class
function Gnb(){

  var _currentPageIndex;

  $('.cfmOllehGnb-menu-item>.link').each(function(i){

    if( $(this).hasClass('on') ){
      _currentPageIndex = i;
    }

  });

  this.open = function($gnbMenuItem, $gnbSubmenu, $totalMenuBtn, $totalMenu, $this){

    $totalMenuBtn.data('open', 'false').removeClass('on');
    $totalMenu.removeClass('on');

    $gnbMenuItem.removeClass('on over');
    $gnbSubmenu.removeClass('on');

    $this.addClass('over');
    $this.next('.' + $gnbSubmenu.attr('class')).addClass('on');

  };

  this.close = function($gnbMenuItem, $gnbSubmenu){
    $gnbMenuItem.removeClass('over');
    $gnbSubmenu.removeClass('on');
    $gnbMenuItem.eq(_currentPageIndex).addClass('on');
  };

  this.totalMenuOpen = function($totalMenu, $this){
    if( $this.data('open') == 'false' ){
      $this.data('open', 'true').addClass('on');
      $totalMenu.addClass('on');
    } else if( $this.data('open') == 'true' ) {
      $this.data('open', 'false').removeClass('on');
      $totalMenu.removeClass('on');
    }
  };

}

function Lnb(){

  // constructor
  $('.cfmOllehLnbNewList-link.has-child').each(function(i){
    if( $(this).hasClass('on') ){
      $(this).data('open', 'true');
    } else {
      $(this).data('open', 'false')
    }
  });

  this.open = function($this){
    if( $this.data('open') == 'false' ){
      /* s : 모법고 고도화 수정 */
      $this.data('open', 'true').addClass('on').attr('title','하위메뉴 열기'); 
      /* e : 모법고 고도화 수정 */
      $this.next('.cfmOllehLnbNewListCont').addClass('on');
    } else {
      /* s : 모법고 고도화 수정 */
      $this.data('open', 'false').removeClass('on').attr('title','하위메뉴 닫기');
      /* e : 모법고 고도화 수정 */
      $this.next('.cfmOllehLnbNewListCont').removeClass('on');
    }
  };

  this.menuItemBlur = function($this){
    $this.blur();
  }

}

function TabContent(){

  this.showContent = function( $this ){

    var $thisParent = $this.parents('.tab-sub');
    var $thisGroup = $thisParent.find('.tab-sub-link');
    var tabIndex = $thisGroup.index( $this );

    var $tabSubContentGroup = $thisParent.next('.tab-sub-content-wrap').find('.tab-sub-content');
    var $thisSubContent = $tabSubContentGroup.eq(tabIndex).addClass('on');

    $thisGroup.removeClass('on');
    $this.addClass('on');

    $tabSubContentGroup.removeClass('on');
    $thisSubContent.addClass('on');

  };

}
// main
// Check UA
if (navigator.userAgent.indexOf('Safari') > 0) {
  if (navigator.userAgent.indexOf('Chrome') > 0) {
    $('html').addClass('chrome');
  } else {
    $('html').addClass('Safari');
  }
} else if (navigator.userAgent.indexOf('Firefox') > 0) {
  $('html').addClass('firefox');
} else if (navigator.userAgent.indexOf('Trident/7.0') > 0) {
  $('html').addClass('ie ie11');
} else if (navigator.userAgent.indexOf('MSIE 10.0') > 0) {
  $('html').addClass('ie ie10');
} else if (navigator.userAgent.indexOf('MSIE 9.0') > 0) {
  $('html').addClass('ie ie9');
} else if (navigator.userAgent.indexOf('MSIE 8.0') > 0) {
  $('html').addClass('ie ie8');
}

$(function () {
  // gnb
  var gnb = new Gnb();

  var $gnbMenu = $('.cfmOllehGnb-menu');
  var $gnbMenuItem = $('.cfmOllehGnb-menu-item>.link');
  var $gnbSubmenu = $('.cfmOllehGnb-submenu');
  var $totalMenuBtn = $('.cfmOllehButtonTotal');
  var $totalMenu = $('.cfmOllehTotalSection');

/* s : 모법고 고도화 수정  */
  $gnbMenuItem.on('mouseenter focusin', function(){
    gnb.open($gnbMenuItem, $gnbSubmenu, $totalMenuBtn, $totalMenu, $(this));
  });

  $gnbMenu.on('mouseleave', function(){
    gnb.close($gnbMenuItem, $gnbSubmenu);
  });

  $('.cfmOllehGnb-menu > .cfmOllehGnb-menu-item > div > ul > li > a').last().focusout(function(){
    gnb.close($gnbMenuItem, $gnbSubmenu);
  });

  $('.cfmOllehY15UtilAr > li > a').focusin(function(){
    gnb.close($gnbMenuItem, $gnbSubmenu);
  });

  $totalMenuBtn.data('open', 'false').on('click', function(e){
    e.preventDefault();
    gnb.totalMenuOpen($totalMenu, $(this));
  });
  /* e : 모법고 고도화 수정  */

  //lnb
  var lnb = new Lnb();

  var $lnbMenuItem = $('.cfmOllehLnbNewList-link.has-child');

  $lnbMenuItem.on('click', function(e) {
    e.preventDefault();
    lnb.open($(this));
  });

  $lnbMenuItem.on('mouseleave', function(){
    lnb.menuItemBlur($(this));
  });

  // main capcha & input bg

  $(window).on('load', function(){

    $('.member-login-input').each(function(i){
      if( $(this).val() != '' ){
        $(this).addClass('bg-none');
      }
    });

  });

  $('.member-login-input').on('focusin', function(){

    $(this).addClass('bg-none');
    $('.ollehMainUMLoginCaptchaArea').addClass('on');

  }).on('blur', function(){

    if( $(this).val() == '' ){
      $(this).removeClass('bg-none');
    }

  });

  $(window).on('load', function(){

    $('.secPlaceholder').each(function(i){
      if( $(this).val() != '' ){
        $(this).addClass('bg-none');
      }
    });

  });

  $('.secPlaceholder').on('focusin', function(){

    $(this).addClass('bg-none');

  }).on('blur', function(){

    if( $(this).val() == '' ){
      $(this).removeClass('bg-none');
    }

  });

  $('.ollehMainUMLoginCaptBtnClose').on('click', function(e){

    e.preventDefault();
    $('.ollehMainUMLoginCaptchaArea').removeClass('on');

  });

  // 사이트 이용안내
  var tabContent = new TabContent();
  var $tabSubItem = $('.tab-sub-link');

  $tabSubItem.on('click', function(e){
    e.preventDefault();
    tabContent.showContent( $(this) );
  });

});

// 청구항목안내 contents tab

function sel_layer3(sel, tot) {
  for (i = 1; i <= tot; i++) {
    if (i == sel) {
      document.getElementById("con" + sel).style.display = "block";
      document.getElementById("tab" + sel).src = "../../images/billmanage/billiteminfo_item" + sel + "_on.gif";
    }
    else if (i != sel) {
      document.getElementById("con" + i).style.display = "none";
      document.getElementById("tab" + i).src = "../../images/billmanage/billiteminfo_item" + i + "_off.gif";
    }
  }
}

// 요금제 contents tab

function sel_layer5(sel, tot) {
  // 빈값을 둬서 뿌리게 편하게 처리.
  //alert("sel ::" + sel + "tot ::" + tot);
  var arBrandImg = ["", "my_fee_tab01", "my_fee_tab02", "my_fee_tab03", "my_fee_tab04", "my_fee_tab05", "my_fee_tab06"];
  for (i = 1; i <= tot; i++) {
    if (i == sel) {
      if (document.getElementById("con" + i)) {
        document.getElementById("con" + i).style.display = "block";
      }
      document.getElementById("num" + i).src = "../../images/common/icon_num" + i + "_on.gif";
      document.getElementById("tab" + i).src = "../../images/prodsystem/" + arBrandImg[i] + "_on.gif";
    } else if (i != sel) {
      if (document.getElementById("con" + i)) {
        document.getElementById("con" + i).style.display = "none";
      }
      document.getElementById("num" + i).src = "../../images/common/icon_num" + i + "_off.gif";
      document.getElementById("tab" + i).src = "../../images/prodsystem/" + arBrandImg[i] + "_off.gif";
    }
  }
}

// 부가서비스 contents tab

function goApplyCat02(mainCd, brandCd) {
  if (chkCnt == 0) {
    ing_layer('show', 'search_ing');//진행중 상태표시
    document.acntSearch.brandCd.value = brandCd;
    document.acntSearch.target = "_self";
    SSLsubmit(document.acntSearch);
    chkCnt = 1;
  } else {
    alert("처리중입니다.\n\n처리가 완료될 때까지 잠시만 기다려 주세요.");
  }
}

// 매장찾기

function MM_openBrWindow(theURL, winName, features) { //v2.0
  window.open(theURL, winName, features);
}
function mapOver(index) {
  document.getElementById("mapImg").src = document.getElementById("mapImg").src.replace("plazamap.gif", "plazamap_" + index + "_on.gif");
}

function mapOut(index) {
  document.getElementById("mapImg").src = document.getElementById("mapImg").src.replace("plazamap_" + index + "_on.gif", "plazamap.gif");
}

function ktPlazaDisplay(index) {
  for (i = 1; i <= 7; i++) {
    document.getElementById("con" + i).style.display = "none";
  }
  document.getElementById("con" + index).style.display = "block";
}

//주소창 파라미터 가져오기 (코딩 현황판에서 사용됩니다.)
function getUrlParameter() {

	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('#');
	
	return sURLVariables;
}