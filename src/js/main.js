(function($){

	var partnersSelector = '.partners';
	var morePartnersButtonSelector = '.more-button';
	var morePartnersListSelector = '.more-list';


	var View = {

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

				$el.removeClass('opened');
				$el.css({
					'height': 0,
					'opacity': 0,
				});

				$button.text($button.data('closed-text'));

			},

			open: function($el, $button) {

				var height = View.checkAutoHeight($el);

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

	};

	(function(){

		var app = {
			init: function(){

				this.events();
				this.main();

			},

			main: function(){

				// Partners.init(partnersSelector);

			},

			events: function(){

				$(document).on('click', partnersSelector, Controller.partnersClick);

			}

		}

		app.init();

	}());


}(jQuery));