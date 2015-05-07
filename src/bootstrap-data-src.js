(function ($) {
    'use strict';

    var DataSrc = function (element, options) {
        var _this = this;

        _this.options = options;
        _this.$element = $(element);

        if (_this.options.inview) {
            _this.$element.on('inview.bs.datasrc', $.proxy(_this.show, _this));

            $(window).on('scroll.bs.datasrc resize.bs.datasrc lookup.bs.datasrc', function () {
                _this.inview();
            });

            _this.inview();
        } else {
            if (_this.options.resize) {
                $(window).on('resize', $.proxy(_this.show, _this));
            }

            _this.show();
        }
    }; // DataSrc

    DataSrc.VERSION = '1.0.0';

    DataSrc.DEFAULTS = {
        devices: ['xs', 'sm', 'md', 'lg'],
        inview: false,
        offset: 0, // used with inview
        resize: false
    };

    DataSrc.prototype.breakpoint = function () {
        var breakpoint = '';

        $.each(this.options.devices, function (key, device) {
            if ($('<i class="visible-' + device + '-block datasrc-device"></i>').appendTo('body').is(':visible')) {
                breakpoint = device;
            }
        });

        $('.datasrc-device').remove();

        return breakpoint;
    }; // breakpoint

    DataSrc.prototype.inview = function (offset) {
        var e = $.Event('inview.bs.datasrc');

        if (this.$element.is(":hidden")) {
            return;
        }

        offset = offset || this.options.offset;

        var wTop = $(window).scrollTop(),
            wBottom = wTop + $(window).height(),
            elTop = this.$element.offset().top,
            elBottom = elTop + this.$element.height();

        if (elBottom >= wTop - offset && elTop <= wBottom + offset) {
            this.$element.trigger(e);
        }
    }; // inview

    DataSrc.prototype.show = function (_relatedTarget) {
        var _this = this,
            transition = $.support.transition && _this.$element.hasClass('fade'),
            e = $.Event('show.bs.dataSrc', {relatedTarget: _relatedTarget}),
            device = _this.breakpoint(),
            src = _this.$element.data(device);

        _this.$element.trigger(e);

        if (_this.$element.is('img')) {
            if (transition && _this.$element.attr('src') !== src) {
                _this.$element.removeClass('in')
                .one('load', function () {
                    _this.$element.addClass('in');
                });
            }

            _this.$element.attr('src', src);
        } else {
            if (transition && _this.$element.css('background-image') !== src) {
                _this.$element.removeClass('in');

                var img = new Image();

                $(img).one('load', function () {
                    _this.$element.addClass('in');
                });

                img.src = src;
            }

            _this.$element.css('background-image', 'url(' + src + ')');
        }

        e = $.Event('shown.bs.dataSrc', {relatedTarget: _relatedTarget});

        if (transition) {
            _this.$element.one('bsTransitionEnd', function () {
                _this.$element.trigger(e);
            });
        } else {
            _this.$element.trigger(e);
        }
    }; // show

    var old = $.fn.dataSrc;

    $.fn.dataSrc = function (option, _relatedTarget) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('bs.dataSrc'),
                options = $.extend({}, DataSrc.DEFAULTS, $this.data(), typeof option == 'object' && option);

            if (!data) {
                $this.data('bs.dataSrc', (data = new DataSrc(this, options)));
            }

            if (typeof option == 'string') {
                data[option](_relatedTarget)
            } else if (options.show) {
                data.show(_relatedTarget);
            }
        });
    }; // $.fn.dataSrc

    $.fn.dataSrc.Constructor = DataSrc;

    $.fn.dataSrc.noConflict = function () {
        $.fn.dataSrc = old;

        return this;
    };

}) (window.jQuery);
