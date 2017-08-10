(function (window) {
	function Tmp() {
		// 模板
		this.dom;
		// 数据
		this.data;
		// 边界
		this.confine;
		this.code;
		this.index = 0;
		this.init();
		// this.varDeal = new Function('return this.dom.' + )
	}
	Tmp.prototype.init = function () {
		this.confine = {
			left: '\\{\\%\\=',
			right: '\\%\\}',
			exleft: '\\{\\%',
			exright: '\\%\\}'
		};
		this.code = 'this.str = [];';
		
	}
	
	// 模板
	Tmp.prototype.tmp = function (dom) { 
		this.dom = dom;
		// console.log(dom);
		return this;
	}
	// 信息
	Tmp.prototype.data = function (data) {
		this.data = data;
		// console.log(data)
		for (key in data) {
			this.code +='var '+ key + '=' + JSON.stringify(data[key]) + ';' ;
		}
		return this.rules();
	}

	Tmp.prototype.rules = function () {
		var peg = new RegExp(this.confine['exleft']+ 
			'(.+?)'+ this.confine['exright'],'g');
		var peg1 = new RegExp('^=(.+)$','g');
		var peg2 = new RegExp('^([^=].+)$','g');
		console.log(peg);
 		while (match = peg.exec(this.dom)) {
 			this.addCode( this.dom.slice(this.index, match.index) );
 			while (match1 = peg1.exec(match[1])) {
 				this.addCode(match1[1], 1);
 			}
 			while (match2 = peg2.exec(match[1])) {
 				this.addCode(match2[1], 2);
 			}
 			this.index = match.index + match[0].length; 
 		}
 		this.addCode(this.dom.slice(this.index, this.dom.length));
 		this.code += 'return this.str.join("")';
 		// console.log(this.code.replace(/[\r\t\n]/g,''));
 		
 		return this.parse(this.code.replace(/[\r\t\n]/g,''));
	}

	Tmp.prototype.parse = function (code) {
		var fn = new Function(code).bind(this);
		return fn();
	}
	// addCode 三种情况, 1. 普通字符串,  2. 变量, 3. 语法

	Tmp.prototype.addCode = function (code, type) {
		type = type || 0;
		// code = code.replace(/^\s+|\s+$/g,'');
		this.code += type === 0 ? 'this.str.push("'+ code.replace(/"/g,'\\"') +'");' : 
		(type === 1 ? 'this.str.push('+ code +');' : code);  
	}

	// 边界
	Tmp.prototype.setConfine = function (confine) {
		this.confine = confine;
	}
	window.tmp = new Tmp();
})(window);