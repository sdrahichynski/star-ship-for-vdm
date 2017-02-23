(function($){

	var partnersSelector = '.partners';
	var morePartnersButtonSelector = '.more-button';
	var morePartnersListSelector = '.more-list';


	var View = {

		scrollTo: function($el, offset , callback) {
			var scrollContainer = $('html, body');
			var value = $el.offset().top + (offset || 0);

			var deltaTime = Math.abs($(window).scrollTop() - value) * 1;
			if (deltaTime < 60) { callback; return; }
			deltaTime = deltaTime > 400 ? 400 : deltaTime;
			scrollContainer.animate({'scrollTop': value}, deltaTime , callback);

		},

		checkAutoHeight: function($el){
			var height;

			$el.css({
				height: 'auto',
			});

			height = $el.height();

			$el.css({
				height: '0',
			});

			return height;

		},

		partners: {

			close: function($el, $button) {

				View.scrollTo( $el.closest(partnersSelector), $('nav.main-nav').height() * -1, function(){

					$el.removeClass('opened');

					$el.css({
						'height': 0,
						'opacity': 0,
					});

					$button.text($button.data('closed-text'));

				});

			},

			open: function($el, $button) {

				var height = View.checkAutoHeight($el);

				View.scrollTo( $el.closest(partnersSelector), $('nav.main-nav').height() * -1);

				$el.addClass('opened');

				setTimeout(function(){
					$el.css({
						'height': height + 'px',
						'opacity' : 1,
					});
				}, 0);

				$button.text($button.data('opened-text'));

			},

			showMore: function($button) {
				var self = this;
				var $morePartnersList = $button.siblings(morePartnersListSelector);

				$morePartnersList.hasClass('opened') ? self.close($morePartnersList, $button) : self.open($morePartnersList, $button);
			},


		}

	};


	var Controller = {

		partnersClick: function(e){

			var $target = $(e.target);
			var $moreButton = $target.closest(morePartnersButtonSelector);
			var isMoreButton = $moreButton.is(morePartnersButtonSelector);

			if (!isMoreButton) return;
			e.preventDefault();

			View.partners.showMore($moreButton);
		},

		partnersTransitionEnd: function(e) {
			var prop = e.originalEvent.propertyName;
			if (prop !== 'height') return false;
			// else
			var morePartners = $(this).closest(morePartnersListSelector);

			if (morePartners.height() === 0) return;
			View.scrollTo( morePartners.closest(partnersSelector), $('nav.main-nav').height() * -1);
		}

	};

	(function(){

		var app = {
			init: function(){

				this.events();
				this.main();

			},

			main: function(){

			},

			events: function(){

				$(document).on('click', partnersSelector, Controller.partnersClick);
				// $(document).on('transitionend', morePartnersListSelector, Controller.partnersTransitionEnd);

			}

		}

		app.init();

	}());


}(jQuery));