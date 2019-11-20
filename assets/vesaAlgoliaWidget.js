(function (instantsearch) {
    function vesaFilter(options) {
    if (!options.container) {
        throw new Error('vesaAlgoliaWidget: usage: vesaFilter({container, attributeName, options})');
    }
    var $container = $(options.container);
    var $template = $(options.template);
    if ($container.length === 0) {
        throw new Error('vesaAlgoliaWidget: cannot select \'' + options.container + '\'');
    }

    function intifyValue(value) {
      var parsed = parseInt(value, 10);
      if (isNaN(parsed)) { return 0; }
      return parsed;
    }

    return {
      isLoading: false,

      defaultFilter: function() {
        return window.algoliaDefaultFilter;
      },

      getConfiguration: function() {
        return {};
      },

      init: function(args) {
        var helper = args.helper;
        if(typeof options.min !== 'undefined') {
          helper.addNumericRefinement(lowerBoundAttributeName, '>=', options.min);
        }
        if(typeof options.max !== 'undefined') {
          helper.addNumericRefinement(upperBoundAttributeName, '<=', options.max);
        }
        $template.find('form').on('submit', this.submitHandler.bind(this, helper));
        var _this = this;
        $(document).on('click', '.ais-current-refined-values--item', function() {
          if($(this).find('.current_named_tags_vesa').length > 0) {
            window.activeCustomFilters.vesa = '';
            window.activeCustomFilters.vesaValue = '';
            var filterItems = [ _this.defaultFilter() ];
            if(window.activeCustomFilters.compatibity !== '') {
              filterItems.push();
            }
            $('#vesaSearch').find('input').val('');
            helper.setQueryParameter('filters', filterItems.join(' AND '));
            helper.search();
          }
        });
        if(helper.hasRefinements('named_tags.Vesa') && window.activeCustomFilters.vesaValue === '') {
          helper.removeFacetRefinement('named_tags.Vesa');
          helper.search();
        }
      },

      hasVesa: function(results) {
        for(var i = 0; i < results.facets.length; i++) {
          if(results.facets[i].name.toLowerCase().indexOf('named_tags.vesa') !== -1) {
            return true;
          }
        }
        return false;
      },

      submitHandler: function(helper) {
        var filterItems = [ this.defaultFilter() ];
        var x = intifyValue(
          $template[0].querySelector('.vesa-min-range--input').value
        );
        var y = intifyValue(
          $template[0].querySelector('.vesa-max-range--input').value
        );
        $.ajax({
          url: '/apps/peerless/vesa',
          method: 'get',
          data: {
            x: x,
            y: y
          },
          success: function(response) {
            var resultItems = [];
            if(response.total > 0) {
              var items = response.items;
              for(var i = 0; i < items.length; i++) {
                resultItems.push('objectID:'+items[i]);
              }
              resultItems = '(' + resultItems.join(' OR ') + ')';
              window.activeCustomFilters.vesa = resultItems;
              window.activeCustomFilters.vesaValue = x+'x'+y;
              helper.addFacetRefinement('named_tags.Vesa', 'HasVesa');
              if(window.activeCustomFilters.compatibity !== '') {
                resultItems = [window.activeCustomFilters.compatibity, resultItems].join(' AND ');
              }
            } else {
              resultItems = 'objectID:notexists404';
              helper.removeFacetRefinement('named_tags.Vesa');
              window.activeCustomFilters.vesa = '';
              window.activeCustomFilters.vesaValue = '';
            }
            filterItems.push(resultItems);
            helper.setQueryParameter('filters', filterItems.join(' AND '));
            helper.search();
          }
        });
        return false;
      },

      render: function(args) {
        if(this.hasVesa(args.results)) {
          $template.removeClass('hidden');
          if($container.find($template).length === 0) {
            $container.append($template);
          }
        } else {
          $template.addClass('hidden');
        }
      }
    };
  }

  instantsearch.widgets.vesaFilter = vesaFilter;
}(instantsearch));
