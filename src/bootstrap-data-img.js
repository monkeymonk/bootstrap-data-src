/**
 * Created by monkeymonk on 29/04/14.
 */
(function ($) {
    'use strict';

    var DataImg = function (element, options) {
        this.options = options;
        this.$element = $(element);

        if (this.options.resize) {
            $(window).on('resize', $.proxy(this.show, this));
        }

        this.show();
    }; // DataImg

    DataImg.VERSION = '0.0.1';

    DataImg.DEFAULTS = {
        devices: ['xs', 'sm', 'md', 'lg'],
        resize: false
    };

    DataImg.prototype.breakpoint = function () {
        var breakpoint = '';

        $.each(this.options.devices, function (key, device) {
            if ($('<i class="visible-' + device + '-block dataimg-device"></i>').appendTo('body').is(':visible')) {
                breakpoint = device;
            }
        });

        $('.dataimg-device').remove();

        return breakpoint;
    }; // breakpoint

    DataImg.prototype.show = function (_relatedTarget) {
        var that = this,
            transition = $.support.transition && that.$element.hasClass('fade'),
            e = $.Event('show.bs.dataImg', {relatedTarget: _relatedTarget}),
            device = that.breakpoint(),
            src = that.$element.data(device);

        that.$element.trigger(e);

        if (that.$element.is('img')) {
            if (transition && that.$element.attr('src') !== src) {
                that.$element.removeClass('in')
                .one('load', function () {
                    that.$element.addClass('in');
                });
            }

            that.$element.attr('src', src);
        } else {
            if (transition && that.$element.css('background-image') !== src) {
                that.$element.removeClass('in');

                var img = new Image();

                $(img).one('load', function () {
                    that.$element.addClass('in');
                });

                img.src = src;
            }

            that.$element.css('background-image', 'url(' + src + ')');
        }

        e = $.Event('shown.bs.dataImg', {relatedTarget: _relatedTarget});

        if (transition) {
            that.$element.one('bsTransitionEnd', function () {
                that.$element.trigger(e);
            });
        } else {
            that.$element.trigger(e);
        }
    }; // show

    var old = $.fn.dataImg;

    $.fn.dataImg = function (option, _relatedTarget) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('bs.dataImg'),
                options = $.extend({}, DataImg.DEFAULTS, $this.data(), typeof option == 'object' && option);

            if (!data) {
                $this.data('bs.dataImg', (data = new DataImg(this, options)));
            }

            if (typeof option == 'string') {
                data[option](_relatedTarget)
            } else if (options.show) {
                data.show(_relatedTarget);
            }
        });
    }; // $.fn.dataImg

    $.fn.dataImg.Constructor = DataImg;

    $.fn.dataImg.noConflict = function () {
        $.fn.dataImg = old;

        return this;
    };

}) (window.jQuery);
