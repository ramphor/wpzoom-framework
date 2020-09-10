(function (wp, $) {
    var api = wp.customize;

    var options = _.mapObject(wpzoom_customize_fonts_dropdown_choices, (function (val, key) {
        return new Option(val, key);
    }));

    /**
     * A zoomSelect control.
     *
     * @class
     * @augments wp.customize.Control
     * @augments wp.customize.Class
     */
    api.fontsDropdown = api.Control.extend({

        ready: function () {
            var control = this,
                select = this.container.find('.zoom-fonts-dropdown-control');

            select.on('change', function () {
                control.setting.set($(this).val());
            });

            api.section(control.section()).container.on('expanded', function () {

                if ($(this).is('li')) {

                    if (select.children().length === 0) {
                        var frag = document.createDocumentFragment();
                        _.each(options, function (val, key) {
                            frag.appendChild(val);
                        });
                        select.append(frag);

                    }

                    select.find('[value="' + control.setting.get() + '"]').prop('selected', 'selected');
                }
            });

            this.setting.bind(function (value) {
                select.val(value);
            });
        }
    });

    api.controlConstructor['zoom-fonts-dropdown'] = api.fontsDropdown;
})(wp, jQuery);