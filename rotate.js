function RotateChart (images, root) {
    this.images = images;
    this.root = root;
    this.imgId = [];

    // this.init();
};
RotateChart.prototype = {
    init: function () {
        this.createRotateChart();
        this.createRotateIcon();
        this.createRotateDirectionBtn();

        this.setInt = setInterval(this.rotateFunc.bind(this, 'right'), 2000);
        $('.rotationChart').mouseenter(() => {
            clearInterval(this.setInt);
        }).mouseleave(() => {
            this.setInt = setInterval(this.rotateFunc.bind(this, 'right'), 2000);
        });

        $('.leftSpan').click(this.rotateFunc.bind(this, 'left'));
        $('.rightSpan').click(this.rotateFunc.bind(this, 'right'));

        // change rotate chat by choosed icon
        $('.rotationIcon span').click(this.handleClickIcon.bind(this));
        this.updateActiveIcon(); // update active icon
    },
    createRotateChart: function () {
        $(this.root).append("<div class='rotationChart'></div>");
        $('.rotationChart').append("<div class='rotationChartWrapper'></div>")
        this.images.map((item) => {
            var arr = item.split('/')[item.split('/').length - 1].split('.');
            var name = arr.slice(0, arr.length - 1).join();
            $('.rotationChartWrapper').append('<img id='+name+' src='+item+' alt='+name +'></img>');
            this.imgId.push(name);
        });
    },
    createRotateIcon: function () {
        $('.rotationChart').append("<div class='rotationIcon'></div>");
        this.imgId.map(() => {
            $('.rotationIcon').append("<span></span>");
        });
    },
    createRotateDirectionBtn: function () {
        $('.rotationChart').append("<span class='leftSpan'>left</span>");
        $('.rotationChart').append("<span class='rightSpan'>right</span>");
    },
    rotateFunc: function (direction, step) {
		var stepLen = isNaN(step) ? 1 : step;
		var left = $(".rotationChartWrapper").finish().css('left');
		var animateLeft = parseInt(left);
		if (direction === 'left') {
			animateLeft = parseInt(left) + 1300 * stepLen + 'px';
		} else {
			animateLeft = parseInt(left) - 1300 * stepLen + 'px';
        };
        var that = this;
		$(".rotationChartWrapper").animate({ 
			left: animateLeft
		}, 1000, function () {
			if (direction === 'left') {
				$(".rotationChartWrapper").find('img').last().detach().prependTo($(".rotationChartWrapper")).parent().css({left: left});
			} else {
				while (stepLen --) {
					$(".rotationChartWrapper").find('img').first().detach().appendTo($(".rotationChartWrapper")).parent().css({left: left});
				};
			};
			that.updateActiveIcon();
		} );
    },
    updateActiveIcon: function () {
		var activeId = $(".rotationChartWrapper").find('img').eq(1).attr('id');
        $('.rotationIcon span').eq(this.imgId.indexOf(activeId)).addClass('rotationActive').siblings().removeClass('rotationActive');
    },
    handleClickIcon: function (e){
		var activeIconIndex = $(e.target).index();
		var activeImgIndex = $("#" + this.imgId[activeIconIndex]).index();
		var value = activeImgIndex - 1;
		if (value < 0) {
			this.rotateFunc('left');
		} else if (value > 0) {
			this.rotateFunc ('right', value);
		}
	}
};