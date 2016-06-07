;jQuery.extend({
	Model: function(){
		var cache 					= {};
		var that 					= this;
		var listeners 				= {};
		var signInfo 				= {};
		var currentActiveProduct	= '';

		var layerFactory = function()
		{
			var str  = '<div id="viewLoading" style="display:none;position:absolute;top:35%;left:45%;background:#fff;z-index:10;" ><img src="/images/common/anibox.gif" alt="처리 중입니다. 잠시만 기다려주세요." /></div>	';
				return str;
		}

		this.getLoading = function()
		{
			return $(layerFactory({
				layerID 		: 'viewLoading'
			}));
		}

		//자바스크립트 배열에 contains함수 추가
		Array.prototype.contains=function(element) {
			for(var i=0;i<this.length;i++)
			{
				if(this[i]==element)
					return true;
			}
			return false;
		}

		//페이지 BackSpace Key막기
		$(document).keydown(function(e){
			var actEl=document.activeElement;
			if(e.which==8)
			{
				if(actEl.getAttribute('readonly') || actEl.nodeName=='BODY' || actEl.nodeName=='DIV') return false;
			}
		});

		//마우스우클릭 금지
		//document.oncontextmenu = function() {return false;};


		//브라우저 버전정보 가져오기
		var  ua = navigator.userAgent.toLowerCase()
					,check = function(r){
							return r.test(ua);
					}
			,DOC 			= document
			,docMode 		= DOC.documentMode
			,isOpera 		= check(/opera/)
			,isChrome 		= check(/\bchrome\b/)
					,isWebKit 		= check(/webkit/)
					,isSafari 		= !isChrome && check(/safari/)
					,isSafari2 		= isSafari && check(/applewebkit\/4/)
					,isSafari3 		= isSafari && check(/version\/3/)
					,isSafari4 		= isSafari && check(/version\/4/)
					,isIE 			= !isOpera && (check(/msie/) || check(/rv:11\.0/))
					,isIE7 			= isIE && (check(/msie 7/) || docMode == 7)
					,isIE8 			= isIE && (check(/msie 8/) && docMode != 7)
					,isIE9 			= isIE && check(/msie 9/)
					,isIE10 		= isIE && check(/msie 10/)
					,isIE11 		= isIE && check(/rv:11\.0/)
					,isIE6 			= isIE && !isIE7 && !isIE8 && !isIE9 && !isIE10 && !isIE11
					,isGecko 		= !isWebKit && check(/gecko/)
					,isGecko2 		= isGecko && check(/rv:1\.8/)
					,isGecko3 		= isGecko && check(/rv:1\.9/)
					,isWindows 		= check(/windows|win32/)
					,isMac 			= check(/macintosh|mac os x/)
					,isAir 			= check(/adobeair/)
					,isIPad 		= check(/ipad/)
					,isIpod 		= check(/ipod/)
					,isIphone 		= check(/iphone/)
			,isLinux 		= check(/linux/)
			,isAndroid		= check(/android/);

		this.isIE  	 	= isIE;
		this.isIE6 	 	= isIE6;
		this.isIE7 	 	= isIE7;
		this.isIE8 	 	= isIE8;
		this.isIE9 	 	= isIE9;
		this.isIE10 	= isIE10;
		this.isIE11 	= isIE11;
		this.isOpera 	= isOpera;
		this.isSafari 	= isSafari;
		this.isGecko	= isGecko;
		this.isChrome   = isChrome;
		this.isIPad     = isIPad;
		this.isIpod 	= isIpod;
			this.isIphone 	= isIphone;
			this.isAndroid  = isAndroid;

		this.setCache = function(id,data) {
			cache[id] = data;
		}

		this.getMlisteners = function() {
			return listeners;
		}

		this.hasCache = function(id) {
			return cache[id]!=undefined;
		}

		this.getItem = function(cfg) {
			cfg.cache = false;
			if(cfg.cache) {
				if(cache[cfg.id]!=undefined) {
					that.notifyItemLoaded(cfg.id,cache[cfg.id],cfg.isTabActive,cfg.isDivShow);
					return;
				}
			}
			//아이폰 ios 6 버그 cache 문제 AJAX caching bug
			var rand = "rand=" + Math.floor(Math.random() * 999999) + 100000; //100000 부터 999999범위 중 radom 수 발생
			if (cfg.data && cfg.data != "") {
				cfg.data += "&" + rand ;
			} else {
				cfg.data =  rand ;
			}

			that.notifyLoadBegin(cfg.id, cfg.loading);
			$.ajax({
				url       		: cfg.url
				,data      		: cfg.data
				,type      		: (cfg.method == undefined)?'post':cfg.method
				,contentType  	: 'application/x-www-form-urlencoded;charset=UTF-8'
				//,contentType  	: 'application/json; charset=UTF-8'
				,dataType  		: cfg.dataType
				,context   		: document.body
				,async     		: (cfg.async == undefined)?true:cfg.async
				,timeout   		: 80000
				,error: function(e){
					that.notifyLoadFail(cfg.id,e);
				}
				,success: function(data){
					loadResponse(cfg.id,data,cfg.isTabActive,cfg.isDivShow);
					that.notifyLoadFinish(cfg.id,data,cfg.loading);
				}
			});
		}
		function loadResponse(id,data,isTabActive,isDivShow){
			cache[id] = data;
			that.notifyItemLoaded(id,data,isTabActive,isDivShow);
		}

		this.isObject = function(obj)
		{
			return Object.prototype.toString.call(obj) === '[object Object]';
		}

		/**
		 * load lots of data from the server
		 */
		this.clearAll = function(){
			cache = new Array();
		}

		/**
		 * add a listener to this model
		 */
		this.addListener = function(list){
			listeners[list.id] = list;
		}

		this.notifyLoadBegin = function(id, loading){
			listeners[id].loadBegin(loading);
		}
		/**
		 * we're done loading, tell everyone
		 */
		this.notifyLoadFinish = function(id,data,loading){
			listeners[id].loadFinish(data,loading);
		}

		this.notifyLoadFail = function(id,e){
			listeners[id].loadFail(e);
		}

		this.notifyItemLoaded = function(id,data,isTabActive,isDivShow){
			var code = undefined;
			if(typeof data == 'string')	{
				try
				{
					data = JSON.parse(data);
					code = data['RESULT_TYPE'];
					if(code != undefined && code == '1') return;  //세션오류
				}
				catch(e){}
			} else {
				try	{
					if (data.RESULT_TYPE == 'L') {
						window.location.href = '/needLogin.jsp?goPage='+data.RETURN_URL;
						return;
					} else if (data.RESULT_TYPE == 'E') {
						window.location.href = '/etc/common_message_err.jsp';
						return;
					} else if (data.RESULT_TYPE == 'U') {
						window.location.href = '/etc/common_message_auth.jsp?reason='+data.reason;
						return;
					}
					//if(code != undefined && code == '1') return;
				} catch(x){}
			}

			listeners[id].loadItem(data,isTabActive,isDivShow);
		}

		this.getSerializedData = function(param){
			var resultStr = '';
			if(this.isObject(param))
			{
				var arr = [];
				for(var p in param)
				{
					if(param.hasOwnProperty(p))
					{
						arr.push(p+'='+param[p]);
					}
				}

				resultStr = arr.join('&');
			}
			else if($.isArray(param))
			{
				resultStr = param.join('&');
			}

			return resultStr;
		}
	}

	/**
	 * let people create listeners easily
	 */
	,ModelListener: function(list,view) {
		if(!list) list = {};
		return $.extend({
			loadBegin  : function(loading) {
				if (loading == undefined || loading == true) {
					view.showIndicator();//로딩이미지보임
				}
			}
			,loadFinish : function(data,loading) {
				var code = undefined;
				var sessionChk = function(_code) {
					if(_code != undefined || _code == 'L') {
						if(_code == '1' || _code == 'L')  //세션Disconnect
						{
							alert('접속시간이 만료 되었습니다.\n다시 로그인 해주세요.');
							window.location.href = '/needLogin.jsp'
						}
					}
				}

				if(typeof data == 'string')	{
					try {
						data = JSON.parse(data);
						code = data;
						sessionChk(code);
					} catch(e){}
				} else {
					try	{
						code = data;
						sessionChk(code);
					} catch(x){}
				}

				if (loading == undefined || loading == true) {
					//로딩이미지 숨김
					view.hideIndicator();
				}

			}
			,loadItem   : function() { }
			,loadFail   : function(e) {
				//로딩이미지 숨김
				view.hideIndicator();
				//error code : 0   ==> timeout
				//error code : 500 ==> internal server error
				var errorMsg = '';

				if(e.status == '0')	{
					errorMsg = '서버 에러입니다. 관리자에게 문의해 주시기 바랍니다';
				} else {
					errorMsg = '서버 에러입니다. 관리자에게 문의해 주시기 바랍니다.';
				}
				//alert(errorMsg);

			}
		}, list);
	}
});

jQuery.extend({
	Controller: function(model, view){
		this._model 			= model;
		this._view  			= view;

				//텍스트박스 엔터키 이벤트 핸들러
				this.textboxEnterHandlerInit = function(addParam) {
					var arr = addParam || this.textEnterConfig;
					if(!$.isArray(arr)) return;
					var arrLen = arr.length;
					var id = '';
					var fn = null;
					for(var i=0;i<arrLen;i++) {
						(function(x){
							id = arr[x]['id'];
							fn = arr[x]['fn'];
							$('#'+id).keyup(function(e){
								if(e.keyCode == ENTER_CODE)
								{
									if(typeof fn == 'function')
									{
										fn();
									}
								}
							});
						}(i));
					}
				}

				/***************************************************************************
				 * TextBox 이벤트
				 **************************************************************************/
				this.isAlphabet = function(e) {
					if(e.which == SHIFT_CODE) isPressedShiftKey = true;
					if(e.which == CTRL_CODE)  isPressedCtrlKey = true;

					if (((e.which > 64 &&  e.which < 91) && !isPressedShiftKey && !isPressedCtrlKey)  || ((e.which > 64 &&  e.which < 91) && isPressedShiftKey && !isPressedCtrlKey) || ((e.which > 96 &&  e.which < 123) && !isPressedCtrlKey) || isSpecialKey(e.which))
				{
					return true;
				}

				return false;
				}

				this.isNumeric = function(e) {
					if(e.which == SHIFT_CODE) isPressedShiftKey = true;
					if(e.which == CTRL_CODE)  isPressedCtrlKey = true;

					if (((e.which > 47 &&  e.which < 58) && !isPressedShiftKey && !isPressedCtrlKey) || ((e.which>95 && e.which<106) && !isPressedShiftKey && !isPressedCtrlKey) ||  isSpecialKey(e.which)) {
					return true;
				}
				return false;
				}

				this.isKorean = function(e) {
					if(e.which == SHIFT_CODE) isPressedShiftKey = true;
					if(e.which == CTRL_CODE)  isPressedCtrlKey = true;

					if(!that.isAlphabet(e) && !that.isNumeric(e) && (!isPressedShiftKey || (isPressedShiftKey && (e.which == 229 || e.which == 129))) && !isPressedCtrlKey)
					return true;
				return false;
				}

				this.isKoreanAlphabet = function(e) {
					if(that.isAlphabet(e) || that.isKorean(e))
					return true;
				return false;
				}

				this.isAlphabetAndNumeric=function(e) {
				if(that.isAlphabet(e) || that.isNumeric(e))
					return true;
				return false;
			}

				this.isNotSpecialKey = function(e) {
					if(that.isAlphabet(e) || that.isNumeric(e) || that.isKorean(e))
					return true;
				return false;
				}

			this.bindTextBoxKeyDown = function(arr) {
			if(arr==undefined || !$.isArray(arr)) return;
			var len = arr.length;

			for(var i=0;i<len;i++) {
				(function(x){
					$('#'+arr[x]['id']).keydown(function(e){
						if(typeof arr[x]['fn'] == 'function')
							return arr[x]['fn'](e);
					});

					$('#'+arr[x]['id']).keyup(function(e){
						if(e.which == SHIFT_CODE)      isPressedShiftKey = false;
						else if(e.which == CTRL_CODE)  isPressedCtrlKey = false;

						if(arr[x]['cm'])
						{
							$(this).toPrice();
						}
					});
				}(i));
			}
		}

			this.bindTextBoxFocusClear = function(arr) {
				if(arr==undefined || !$.isArray(arr)) return;
			var len = arr.length;
			var id = '';
			var fn = null;

			for(var i=0;i<len;i++) {
				(function(x){
					$('#'+arr[x]).focus(function(e){
						$(this).val('');
					});
				}(i));
			}
			}

		var makeIndicator = function()
		{
			$('body').append(model.getLoading());
		}

		this.setInitResult = function()
		{
			var initResultCnt = (this.initResult)?this.initResult.length:0;
			if(initResultCnt>0)
			{
				for(var i=0;i<initResultCnt;i++)
				{
					this._model.addListener($.ModelListener(this.initResult[i],this._view));
				}
			}
		}
		//qook url 설정
		this.setQookUrlConf = function(port) {
			port = view.nvl(port, '');
			var qookUrl = "";
			if (port != "") {
				if (port=="3043" || port=="3044" || port=="3045" || port=="3145" || port=="3143" || port=="3144" || port=="3011" || port=="3014") {//si 프로젝트
					qookUrl = "http://mycsdev.olleh.com";
//				} else if (port=="3011" || port=="3014") {//sm 개발계
//					qookUrl = "http://mycsdev.olleh.com";
				} else {// 80 포트
					qookUrl = "http://mycs.olleh.com";
				}
			} else {
				qookUrl = "http://mycs.olleh.com";
			}
			return qookUrl;
		}

		this.setMy2UrlConf = function(port) {
			port = view.nvl(port, '');
			var qookUrl = "";
			if (port != "") {
				if (port=="3043" || port=="3044" || port=="3045" || port=="3145" || port=="3143" || port=="3144" || port=="3011" || port=="3014") {//si 프로젝트
					qookUrl = "https://test.my2.olleh.com";
//				} else if (port=="3011" || port=="3014") {//sm 개발계
//					qookUrl = "http://mycsdev.olleh.com";
				} else {// 80 포트
					qookUrl = "https://my2.olleh.com";
				}
			} else {
				qookUrl = "https://my2.olleh.com";
			}
			return qookUrl;
		}

		this.targetSystemCode = function(targetSystem) {
			var targetSystemCode = "";
			targetSystem = view.nvl(targetSystem, '');
			if (targetSystem != "") {
				if (targetSystem == "Nstep") {
					targetSystemCode = "N";
				} else if (targetSystem == "Genesis") {
					targetSystemCode = "G";
				} else if (targetSystem == "Icis") {
					targetSystemCode = "I";
				}
			}
			return targetSystemCode;
		}

		this.onCreate = function(){};
		this.validatorInit =function(){};

		this.init = function()
		{
			makeIndicator();
			this.setInitResult();

			this.textboxEnterHandlerInit();
			this.onCreate();
		}
	}
});

jQuery.extend({

	View: function(){

		var that = this;
		var listeners = new Array();
		var $form = null;
		var $body = $('body');
		var formCfg = null;

		var layer_open = function(el,focusID){
			$('.layer').removeClass('off');
			$('.layer').css('display', 'block');
			$('.layer_area').css('display', 'none');

			var temp = $('#' + el);
			temp.css('display', 'block');
			if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
			else temp.css('top', '0px');
			if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
			else temp.css('left', '0px');

			if(focusID != undefined) $('#'+focusID).focus();
		}

		var indicatorOpen = function(el) {
			$('.layer2').removeClass('off');
			$('.layer2').css('display', 'block');

			var temp = $('#' + el);
			temp.css('display', 'block');
			if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
			else temp.css('top', '0px');
			if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
			else temp.css('left', '0px');
		}

		// 숫자에 콤마 넣기
		this.addCom = function(num) {
			if (isNaN(num)) {
				return 0;
			}
			var reg = /(^[+-]?\d+)(\d{3})/;
			num += '';
			while (reg.test(num))
				num = num.replace(reg, '$1' + ',' + '$2');
			return num;
		}

		//숫자 이미지 및 콤마 넣기
		this.addComImg = function(num, ID) {
			var str = num; // <-숫자 데이터
			var len = str.length;
			if (len > 0) {
				for(i=1; i<=len; i++) {
					$('#'+ID).prepend('<img src="/kt12/images/num/rwon'+str.charAt(len-i)+'.gif" alt="'+str.charAt(len-i)+'" />');
					if((i%3 == 0)&&(len-i != 0)) {
						$('#'+ID).prepend('<img src="/kt12/images/num/rwon.gif" alt="," />');
					}
				}
			}
		}

		this.addComImg2 = function(num, ID) {
		var str = new Array();
			num = String(num);
			for(var i=1;i<=num.length;i++){
				if(i % 3){
				str[num.length-i] = '<img src="/kt12/images/num/rwon'+num.charAt(num.length-i)+'.gif" alt="'+num.charAt(num.length-i)+'" />';
				}else{
					if(num.length-i==0){
						str[num.length-i] = '<img src="/kt12/images/num/rwon'+num.charAt(num.length-i)+'.gif" alt="'+num.charAt(num.length-i)+'" />';
					}else{
						str[num.length-i] = '<img src="/kt12/images/num/rwon.gif" alt="," /><img src="/kt12/images/num/rwon'+num.charAt(num.length-i)+'.gif" alt="'+num.charAt(num.length-i)+'" />';
					}
				}
			}

			return str.join('').replace(/^,/,'');
		}


		this.addComImgUrl	=	function(num) {
			var str = new Array();
			num = String(num);
			for(var i=1;i<=num.length;i++){
				if(i % 3){
				str[num.length-i] = '<img src="/kt12/images/num/rm'+num.charAt(num.length-i)+'.gif" alt="'+num.charAt(num.length-i)+'" />';
				}else{
					if(num.length-i==0){
						str[num.length-i] = '<img src="/kt12/images/num/rm'+num.charAt(num.length-i)+'.gif" alt="'+num.charAt(num.length-i)+'" />';
					}else{
						str[num.length-i] = '<img src="/kt12/images/num/rm.gif" alt="," /><img src="/kt12/images/num/rm'+num.charAt(num.length-i)+'.gif" alt="'+num.charAt(num.length-i)+'" />';
					}
				}
			}

			return str.join('').replace(/^,/,'');
		}

		this.addCntImgUrl	=	function(num) {
			var str = new Array();
			num = String(num);
			for(var i=1;i<=num.length;i++){
				str[num.length-i] = '<img src="/kt12/images/num/rm'+num.charAt(num.length-i)+'.gif" alt="'+num.charAt(num.length-i)+'" />';
			}
			return str.join('').replace(/^,/,'');
		}


		this.addMonthImg	=	function(num,ID) {
			$('#'+ID).prepend('<img src="/kt12/images/num/month_'+num+'.gif" alt="'+num+'월">');
		}

		//null check
		this.nvl = function(s, s2) {
			var retStr = "";
			s = $.trim( s );
			if (s != null && s !== "") {
				retStr = s;
			} else {
				retStr = s2;
			}

			return retStr;
		}

		this.showLayer = function(layerID,focusID) {
			layer_open(layerID,focusID);
		}

		this.hideLayer = function()	{
			$('.layer').fadeOut();
		}

		this.layerInit = function()	{
			$('.layer').addClass('off');
		}

		this.addListener = function(list){
			listeners.push(list);
		}

		this.showIndicator = function()	{
			$('#viewLoading').css('display','block');
			//$('#viewOverLayer').css('display','block');
		}

		this.hideIndicator=function() {
			$('#viewLoading').css('display','none');
			//$('#viewOverLayer').css('display','none');
		}
		this.isLostSuspend=function(rsnCode) {
			var LOST_SUSP_CODE = new Array ("LP01", "LP03", "LP04", "LP07", "LP08", "LP09", "LP10", "LP11");

					for (var i=0; i < LOST_SUSP_CODE.length; i++) {
							//if (rsnCode.equals(LOST_SUSP_CODE[i])) {
				if (rsnCode == LOST_SUSP_CODE[i]) {
									return true;
							}
					}

					return false;
		}

		this.attachHiddenElement=function(name,value) {
			if(formCfg == null) {
				alert('formInit must be called');
				return;
			}

			$form.attr('method',formCfg['method']);
			$form.attr('action',formCfg['action']);
			$form.attr('target',formCfg['target']);

			var $hdnEl = $('<input type="hidden"></input>');
			$hdnEl.attr('name',name);
			$hdnEl.attr('value',value);
			$form.append($hdnEl);
		}

		this.formSubmit = function() {
			if($form != null) {
				$form.submit();
			}
		}

		this.formInit = function(cfg) {
			if($form == null) {
				$form = $('<form></form>');
				$body.append($form);
			} else {
				$form.empty();
			}
			formCfg = cfg;
		}

		this.toFormattedTel = function(tel) {
			if (tel == null || tel == "") {
							return "";
					}
			if (tel.length == 11) {
							return tel.substring(0, 3) + "-" + tel.substring(3, 7)  + "-" + tel.substring(7);
					}
					else if (tel.length  == 10) {
							return tel.substring(0, 3) + "-" + tel.substring(3, 6) + "-" + tel.substring(6);
					}
					return tel;
		}

		this.replaceAll_svcNo = function (str, befChar, aftChar) {
			while(str.indexOf(befChar) != -1) {
				str = str.replace(befChar, aftChar);
			}
			return str;
		}

		this.formatTelNumber = function (unFormat) {
			unFormat = this.replaceAll_svcNo(unFormat, "-", "");
			if (unFormat.length < 12 ) {
				var tmp = unFormat.substring(0,3);
				if (tmp=="010" || tmp=="011" || tmp=="016" || tmp=="017" || tmp=="018" || tmp=="019") {
					unFormat = "0" + unFormat;
					if (unFormat.length == 11) {
						unFormat = unFormat.substring(0,4)+"0"+unFormat.substring(4,11);
					} else if(unFormat.length > 12 || unFormat.length < 11) {
						return unFormat;
					}
				} else {
					return unFormat;
				}
			}

			if (unFormat.substring(0,1) != "0" ) {
				return unFormat;
			}

			var first,middle,last;
			first = unFormat.substring(0,4);
			middle = unFormat.substring(4,8);
			last = unFormat.substring(8,12);

			if (first.substring(0,3) == "001" ){
				first = first.substring(1,4);
			} else if(first.substring(0,3) == "000" ){
				first = first.substring(2,4);
			} else {
				first = first.substring(1,4);
			}

			if (middle.substring(0,1) == "0" ) {
				middle = middle.substring(1,4);
			}
			return first + "-" + middle + "-" + last;
		}

		this.toFormattedDate = function(strDate,type) {
			if (strDate == null || strDate == "") {
							return "";
					}

			if(isNaN(strDate) ) {
				return strDate;
			}
			if (type == 1){
				return strDate.substring(0, 4) + "." + strDate.substring(4, 6)+ "." + strDate.substring(6, 8);
			} else if (type == 2) {
				return strDate.substring(0, 4) + "년 " + strDate.substring(4, 6)+ "월 " + strDate.substring(6, 8) + "일";
			}
					return strDate;
		}

		this.toFormattedZipCode = function(zipCode) {
			if (zipCode == null || zipCode == "") {
							return "";
					}

			if(isNaN(zipCode) ) {
				return zipCode;
			}
			return zipCode.substring(0, 3) + "-" + zipCode.substring(3);
		}

		this.toFormattedCardNo = function(cardNo) {
			if (cardNo == null || cardNo == "") {
							return "";
					}

			if(isNaN(cardNo) ) {
				return cardNo;
			}
			if (cardNo.length == 16) {
				return cardNo.substring(0, 4) + "-" + cardNo.substring(4, 8) + "-" + cardNo.substring(8, 12) + "-" + cardNo.substring(12, 16);
			} else {
				return cardNo;
			}

		}
		
		//서비스 번호 마스킹
		this.getMaskedSvcNo = function(svcNo, svcType) {	
			
			if (svcNo != null) {
				svcNo = $.trim( svcNo );
			}
			
			var maskSvcNo = svcNo.replace(/-/g,'');		
			var maskIndex = 3; // 뒤3자리 마스킹
			
			//svcNo 숫자체크
			var dorSvcNoTmp = escape(svcNo.replace(/-/g,''));
			var dorSvcNoTmp = escape(dorSvcNoTmp.replace(/\*/g,'9'));
			if(dorSvcNoTmp.match(/^\d+$/ig) != null){
				svcType = "KT_PSTN";
			} else {
				svcType = "";
			}	
			
			if (svcType == "KT_MOBILE" || svcType == "KT_PSTN" || svcType == "KT_SOIP" || svcType == "KT_NONTEL") { // 전화번호 포멧 마스킹(모바일, 집전화, 인터넷전화, 홈상품)				
			
				var aaaa = "";
				var bbbb = "";
				var cccc = "";
				var dddd = "";
				var tel = "";
				// 박정웅부장님 요청
				if (maskSvcNo != null && maskSvcNo.length == 12) {
					aaaa = maskSvcNo.substring(0, 4);
					if (aaaa == "0002") {
						aaaa = "02";
						bbbb = maskSvcNo.substring(4, 8);
						cccc = maskSvcNo.substring(9);
					} else {
						aaaa = maskSvcNo.substring(1, 4);
						bbbb = maskSvcNo.substring(4, 8);
						cccc = maskSvcNo.substring(9);
					}
					maskSvcNo = aaaa + "-" + bbbb + "-*" + cccc;
					return maskSvcNo;
					//'00-000-0000'인 경우
				}//' 000-000-0000'와 '000-0000-0000' 형식인 경우(이동전화.지역전화)
				else if (maskSvcNo != null && maskSvcNo.length == 11) {
					if (maskSvcNo.substring(0, 1) == " ") {
						aaaa = maskSvcNo.substring(0, 4);
						bbbb = maskSvcNo.substring(4, 7);
						cccc = maskSvcNo.substring(7);
					} else {
						aaaa = maskSvcNo.substring(0, 3);
						bbbb = maskSvcNo.substring(3, 7);
						if (bbbb.substring(0,1) == "0") {
							bbbb = bbbb.substring(1);
						}						
						cccc = maskSvcNo.substring(8);
					}
					if (aaaa == "002")
						aaaa = "02";
					maskSvcNo = aaaa + "-" + bbbb + "-*" + cccc;
					return maskSvcNo;
					//'00-0000-0000'와 '000-000-0000' 형식인 경우(이동전화.지역전화)
				} else if (maskSvcNo != null && maskSvcNo.length == 10) {
					aaaa = maskSvcNo.substring(0, 2);
					if (aaaa == "02") {
						bbbb = maskSvcNo.substring(2, 6);
						cccc = maskSvcNo.substring(7);
					} else {
						aaaa = maskSvcNo.substring(0, 3);
						bbbb = maskSvcNo.substring(3, 6);
						cccc = maskSvcNo.substring(7);
					}				
					maskSvcNo = aaaa + "-" + bbbb + "-*" + cccc;
					return maskSvcNo;
					//'00-000-0000'인 경우
				} else if (maskSvcNo != null && maskSvcNo.length == 9) {
					aaaa = maskSvcNo.substring(0, 2);
					if (aaaa == "02") {
						bbbb = maskSvcNo.substring(2, 5);
						cccc = maskSvcNo.substring(6);
						maskSvcNo = aaaa + "-" + bbbb + "-*" + cccc;
					} 
					
					return maskSvcNo;
					
				// 후불 전화 카드	
				} else if (maskSvcNo != null && maskSvcNo.length == 16) {
					aaaa = maskSvcNo.substring(0, 3);
					bbbb = maskSvcNo.substring(3, 5);
					cccc = maskSvcNo.substring(8, 12);
					dddd = maskSvcNo.substring(12, 16);
					
					maskSvcNo = aaaa+'-'+bbbb+'***'+cccc+'-'+dddd;
					
					return maskSvcNo;
				}	
				//기타 경우
				else if (maskSvcNo != null) {
					return maskSvcNo;
				} 
				
			} else {				
				if (maskSvcNo.length > maskIndex) {					
					maskSvcNo = maskSvcNo.substring(0,maskSvcNo.length - maskIndex) + "***";
				} 	
			}			
			return maskSvcNo;
		}
	}
});

