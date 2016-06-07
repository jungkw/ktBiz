var code = "";
var memberLevelCheck = "";


ktBizGnbCode = function(menuIndex) {
	code = menuIndex;
}

lnbMenuOpen = function(menuCode, obj) {
	var lnbMenuCode = "lnbMenuCode_" + menuCode;
	if (document.getElementById(lnbMenuCode).style.display == "none") {
		document.getElementById(lnbMenuCode).style.display = "block";
		
		if (menuCode  === "BE") {
			$(".cfmOllehLnbBanner").show();
		} else {
			$(".cfmOllehLnbBanner").hide();
		}
		//obj.title = obj.title.replace("열기", "닫기");
		//obj.className = obj.className.replace("cfmOllehLnbDepth1Plus","cfmOllehLnbDepth1Minus")
		//obj.className = obj.className.replace("cfmOllehLnbDepth2Open","cfmOllehLnbDepth2Close")
	} else {
		document.getElementById(lnbMenuCode).style.display = "none";
		//obj.title = obj.title.replace("닫기", "열기");
		//obj.className = obj.className.replace("cfmOllehLnbDepth1Minus","cfmOllehLnbDepth1Plus")
		//obj.className = obj.className.replace("cfmOllehLnbDepth2Close","cfmOllehLnbDepth2Open")
	}
}

lnbMenuOpen2 = function(menuCode, obj) {
	
	$elem = $("#" + menuCode);
		
	$elem.addClass("on");
	
	if ($elem.attr("title") != null)
		$elem.attr("title").replace("열기","닫기");
	
	$elem.next().addClass("on");
	/*var lnbMenuCode = "lnbMenuCode_" + menuCode;
	if (document.getElementById(lnbMenuCode).style.display == "none") {
		document.getElementById(lnbMenuCode).style.display = "block";
		obj.title = obj.title.replace("열기", "닫기");
		obj.className = obj.className.replace("cfmOllehLnbDepth1Plus","cfmOllehLnbDepth1Minus")
		obj.className = obj.className.replace("cfmOllehLnbDepth2Open","cfmOllehLnbDepth2Close")
	} else {
		document.getElementById(lnbMenuCode).style.display = "none";
		obj.title = obj.title.replace("닫기", "열기");
		obj.className = obj.className.replace("cfmOllehLnbDepth1Minus","cfmOllehLnbDepth1Plus")
		obj.className = obj.className.replace("cfmOllehLnbDepth2Close","cfmOllehLnbDepth2Open")
	}*/
}

lnbViewBiz = function() {
	if (code == "0000") {
		return;
	} else {
		$(".cfmOllehLnbNewList a").removeClass("on");
		$(".cfmOllehLnbNewListCont").removeClass("on");
		
		depth1Number = code.substring(0,2);
		depth2Number = code.substring(0,3);
		if (code.length == 4) {
			depth3Number = code;
			$("#"+depth1Number).addClass("on");
			$("#"+depth2Number).addClass("on");
			$("#"+depth3Number).addClass("on");
			lnbMenuOpen(depth1Number, document.getElementById(depth1Number));
			lnbMenuOpen2(depth2Number, document.getElementById(depth2Number));
		} else {
			lnbMenuOpen(depth1Number, document.getElementById(depth1Number));
			//lnbMenuOpen(depth2Number, document.getElementById(depth2Number));
			$("#"+depth1Number).addClass("on");
			$("#"+depth2Number).addClass("on");
		}
	}
}





//location bar
ktBizLocationBar = function(param) {
	memberLevelCheck = param;
	var locationBar = "";
	var codeTmp = code;  // 2depth
	var codeTmp2 = "";   // 3depth
//	var home = "<a href='#home' onclick='depth0_0000();'><img src='/images/common/icon_home.gif' alt='홈으로' /></a>";
	var home = "<a href='#home' class='home' onclick='depth0_0000();'><img src='../../images/common/cfm_olleh_icon_home.png' alt='사이트 메인으로'></a>";
	
	if (codeTmp != "" && codeTmp != null) {
		if (codeTmp.length >= 2) {
			codeTmp2 = codeTmp.substr(2, codeTmp.length);
			codeTmp = codeTmp.substring(0, 2);
		}
	}
	locationBar = home;
	if (codeTmp == "BA") {
		locationBar = locationBar + " &gt;&nbsp; <a href='#home' onclick='depth2_1111();'>회원관리</a> &gt; ";
		
		if (codeTmp2 == 'A') {
			document.title = "[회원관리] 회원정보 조회 - :: 모바일법인고객센터 ::";
			locationBar += "<a href='javascript:depth2_1111();'>회원정보 조회</a>";
		} else if (codeTmp2 == 'B') {
			document.title = "[회원관리] 회원정보 수정 - :: 모바일법인고객센터 ::";
			locationBar += "<a href='javascript:depth2_1211();'>회원정보 수정</a>";
		} else if (codeTmp2 == 'C') {
			document.title = "[회원관리] 모바일 가입정보 - :: 모바일법인고객센터 ::";
			locationBar += "<a href='javascript:depth2_1411();'>모바일 가입정보</a>";
		} else if (codeTmp2 == 'D') {
			document.title = "[회원관리] 신청/변경 현황 - :: 모바일법인고객센터 ::";
			locationBar += "<a href='javascript:depth2_1611();'>신청/변경 현황</a>";
		}
		
		$(".link").removeClass("on");
		$(".link").eq(0).addClass("on");

	} else if (codeTmp == "BB") {
		locationBar = locationBar + " &gt; <a href='#' onclick='depth3_2111();'>요금관리</a>";
		if(codeTmp2 == "AA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_2111();'>요금조회</a> &gt; <a href='#' onclick='javascript:depth3_2111();'>월별 사용요금</a>";
			document.title = "[요금관리] 월별 사용요금 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "AB"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_2111();'>요금조회</a> &gt; <a href='#' onclick='javascript:depth3_2121();'>실시간 요금조회</a>";
			document.title = "[요금관리] 실시간 요금조회 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "AC"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_2111();'>요금조회</a> &gt; <a href='#' onclick='javascript:depth3_2141();'>전체회선 요금조회</a>";
			document.title = "[요금관리] 전체회선 요금조회 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "AD"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_2111();'>요금조회</a> &gt; <a href='#' onclick='javascript:depth3_2211();'>납부/미납 요금조회</a>";
			document.title = "[요금관리] 납부/미납요금조회 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "AE"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_2111();'>요금조회</a> &gt; <a href='#' onclick='javascript:depth3_2221();'>납부방법 변경</a>";
			document.title = "[요금관리] 납부방법 변경 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "BA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth2_3111();'>사용량 조회</a> &gt; <a href='#' onclick='javascript:depth2_3111();'>총사용량 조회</a>";
			document.title = "[요금관리] 총사용량 조회 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "BB"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth2_3111();'>사용량 조회</a> &gt; <a href='#' onclick='javascript:depth2_3311();'>음성통화 패턴</a>";
			document.title = "[요금관리] 음성통화 패턴 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "CA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_2311();'>명세서 관리</a> &gt; <a href='#' onclick='javascript:depth3_2311();'>청구지정보변경</a>";
			document.title = "[요금관리] 청구지정보변경 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "CB"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_2311();'>명세서 관리</a> &gt; <a href='#' onclick='javascript:depth4_2324();'>온라인명세서</a>";
			document.title = "[요금관리] 온라인명세서 - :: 모바일법인고객센터 ::";		
		}else if(codeTmp2 == "CC"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_2311();'>명세서 관리</a> &gt; <a href='#' onclick='javascript:depth3_2331();'>종이명세서재발행</a>";
			document.title = "[요금관리] 종이명세서재발행 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "CD"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_2311();'>명세서 관리</a> &gt; <a href='#' onclick='javascript:depth3_2361();'>영문명세서신청</a>";
			document.title = "[요금관리] 영문명세서 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "CE"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_2311();'>명세서 관리</a> &gt; <a href='#' onclick='javascript:depth3_2341();'>점자명세서</a>";
			document.title = "[요금관리] 점자명세서 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "CF"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_2311();'>명세서 관리</a> &gt; <a href='#' onclick='javascript:depth3_2351();'>청구항목안내</a>";
			document.title = "[요금관리] 청구항목안내 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "DA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_2511();'>분리납부조회</a> &gt; <a href='#' onclick='javascript:depth3_2511();'>분리납부정보</a>";
			document.title = "[요금관리] 분리납부정보 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "DB"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_2511();'>분리납부조회</a> &gt; <a href='#' onclick='javascript:depth3_2521();'>회선별 조회</a>";
			document.title = "[요금관리] 회선별 조회 - :: 모바일법인고객센터 ::";
		}
		$(".link").removeClass("on");
		$(".link").eq(1).addClass("on");
		
	} else if (codeTmp == "BC") {
		locationBar = locationBar + " &gt;&nbsp; <a href='#home' onclick='depth2_3111();'>통화조회</a> &gt;"
	} else if (codeTmp == "BD") {
		locationBar = locationBar + " &gt; <a href='#' onclick='depth3_4121();'>휴대폰관리</a>";
		if(codeTmp2 == "AA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_4121();'>일시정지</a> &gt; <a href='#' onclick='javascript:depth3_4121();'>신청/해제</a>";
			document.title = "[휴대폰관리] 일시정지 - 신청/해제 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "AB"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_4121();'>일시정지</a> &gt; <a href='#' onclick='javascript:depth3_4111();'>이력조회</a>";
			document.title = "[휴대폰관리] 일시정지 - 이력조회 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "BA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth2_4211();'>분실신고</a>";
			document.title = "[휴대폰관리] 분실신고 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "CA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth2_4411();'>번호변경</a>";
			document.title = "[휴대폰관리] 번호변경 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "DA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth2_4511();'>법인명의 본인확인</a>";
			document.title = "[휴대폰관리] 법인명의 본인확인 - :: 모바일법인고객센터 ::";
		}
		$(".link").removeClass("on");
		$(".link").eq(3).addClass("on");
	} else if (codeTmp == "BE") {
		locationBar = locationBar + " &gt; <a href='#' onclick='depth3_5111();'>상품관리</a>";
		if(codeTmp2 == "AA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_5111();'>My 상품 조회</a> &gt; <a href='#' onclick='javascript:depth3_5111();'>요금제 신청/변경</a>";
			document.title = "[상품관리] 요금제 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "AB"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_5111();'>My 상품 조회</a> &gt; <a href='#' onclick='javascript:depth3_5121();'>부가서비스 신청/변경</a>";
			document.title = "[상품관리] 부가서비스 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "AC"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth3_5111();'>My 상품 조회</a> &gt; <a href='#' onclick='javascript:depth3_5131();'>데이터상품</a>";
			document.title = "[상품관리] 데이터상품 - :: 모바일법인고객센터 ::";
		}
		$(".link").removeClass("on");
		$(".link").eq(2).addClass("on");
	} else if (codeTmp == "BF") {
		locationBar = locationBar + " &gt;&nbsp; <a href='#home' onclick='http://biz.olleh.com/webConts/product/productMain.asp?lo=01' target='_blank'>상품/비즈니스</a> &gt;";
	} else if (codeTmp == "BG") {
		locationBar = locationBar + " &gt;&nbsp; <a href='#home' onclick='depth2_8211();'>olleh모바일판매</a> &gt;";
	} else if (codeTmp == "BH") {
		locationBar = locationBar + " &gt; <a href='#home' onclick='depth2_9411();'>상담/이용안내</a>";
		if(codeTmp2 == "AA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth2_9411();'>사이트 이용안내</a>";
			document.title = "[상담/이용안내] 사이트 이용안내 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "BA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth2_9421();'>회원가입 안내</a>";
			document.title = "[상담/이용안내] 회원가입 안내 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "CA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth2_9431();'>이메일 상담</a>";
			document.title = "[상담/이용안내] 이메일 상담 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "DA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth2_9311();'>자주하는 질문</a>";
			document.title = "[상담/이용안내] 자주하는 질문 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "EA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth2_9211();'>공지사항</a>";
			document.title = "[상담/이용안내] 공지사항 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "FA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth2_9711();'>매장찾기/안내</a>";
			document.title = "[상담/이용안내] 매장찾기/안내 - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "GA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:depth2_8211();'>대량구매 문의/신청</a>";
			document.title = "[상담/이용안내] 대량구매 문의/신청 - :: 모바일법인고객센터 ::";
		}
		$(".link").removeClass("on");
		$(".link").eq(4).addClass("on");
	} else if (codeTmp == 'MA') {
		locationBar += " &gt; <a href='#' onclick='javascript:depth0_9999();'>회원가입</a>";
		
		document.title = "[회원가입] - :: 모바일법인고객센터 ::";
		$(".link").removeClass("on");
		$(".link").eq(0).addClass("on");
	}
	
	// FOOTER 메뉴들
	if (codeTmp == "ZZ") {
		if(codeTmp2 == "AA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:privacy();'>이용약관</a>";
			document.title = "[이용약관] - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "BA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:private();'>개인정보취급방침</a>";
			document.title = "[개인정보취급방침] - :: 모바일법인고객센터 ::";
		}else if(codeTmp2 == "CA"){
			locationBar = locationBar + " &gt; <a href='#' onclick='javascript:legalnotice();'>법적고지</a>";
			document.title = "[법적고지] - :: 모바일법인고객센터 ::";
		}
		$(".link").removeClass("on");
	}	
	
	// 준회원인 경우 : Location Bar 미출력
	if(memberLevelCheck=="Z"){
		memberLevelCheck = "";
	}else{
		window.document.write(locationBar);
	}
}


window.overHandler = {
	leave : function (e, obj){
	}
};
