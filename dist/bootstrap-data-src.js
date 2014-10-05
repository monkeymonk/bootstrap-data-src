/** * bootstrap-data-img - v1.0.0 - 2014-10-05 *  * Copyright (c) 2014 Cherry Pulp */
/**
 * Created by monkeymonk on 29/04/14.
<<<<<<< HEAD
 *
 * @denpency jQuery, Bootstrap 3.2.x
=======
>>>>>>> 04695283bf714250baad3723e07c7284d3003d81
 */
(function ($) {
    'use strict';

    var DataSrc = function (element, options) {
        var that = this;

        that.options = options;
        that.$element = $(element);

        if (that.options.inview) {
            that.$element.on('inview.bs.datasrc', $.proxy(that.show, that));

            $(window).on('scroll.bs.datasrc resize.bs.datasrc lookup.bs.datasrc', function () {
                that.inview();
            });

            that.inview();
        } else {
            if (that.options.resize) {
                $(window).on('resize', $.proxy(that.show, that));
            }

            that.show();
        }
    }; // DataSrc

    DataSrc.VERSION = '0.0.1';

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
        var that = this,
            transition = $.support.transition && that.$element.hasClass('fade'),
            e = $.Event('show.bs.dataSrc', {relatedTarget: _relatedTarget}),
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

        e = $.Event('shown.bs.dataSrc', {relatedTarget: _relatedTarget});

        if (transition) {
            that.$element.one('bsTransitionEnd', function () {
                that.$element.trigger(e);
            });
        } else {
            that.$element.trigger(e);
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
