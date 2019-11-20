(function (instantsearch) {
    window.compatibilityVariants = [];
    function compatibityFilter(options) {
    if (!options.container) {
        throw new Error('vesaAlgoliaWidget: usage: vesaFilter({container, attributeName, options})');
    }
    var $container = $(options.container);
    var $template = $(options.template);
    if ($container.length === 0) {
        throw new Error('vesaAlgoliaWidget: cannot select \'' + options.container + '\'');
    }

    return {
      isLoading: false,
      monitor: undefined,
      adaptersOnly: 'no',

      defaultFilter: function() {
        return window.algoliaDefaultFilter;
      },

      getConfiguration: function() {
        return {};
      },

      init: function(args) {
        var helper = args.helper;
        try {
            this.monitor = JSON.parse($.cookie('mountsForMonitor'));
        } catch(e) {}
        $template.find('[type="checkbox"]').on('change', this.submitChange.bind(this, helper));
        $(document).on('click', '.ais-hit-empty--clear-filters', function() {
          this.adaptersOnly = 'no';
          this.monitor = undefined;
          window.compatibilityVariants = [];
          $template.addClass('hidden');
          $template.find('.ais-refinement-list--item').removeClass('ais-refinement-list--item__active ais-facet--active');
        }.bind(this));
      },

      hasCompatibility: function(results) {
        if(typeof this.monitor === 'undefined') { return false; }
        for(var i = 0; i < results.facets.length; i++) {
          if(typeof this.monitor !== 'undefined') {
            return true;
          }
        }
        return false;
      },

      submitChange: function(helper) {
        if($template.find('[type="checkbox"]').is(':checked')) {
          this.adaptersOnly = 'yes';
          $template.find('.ais-refinement-list--item').addClass('ais-refinement-list--item__active ais-facet--active');
        } else {
          this.adaptersOnly = 'no';
          $template.find('.ais-refinement-list--item').removeClass('ais-refinement-list--item__active ais-facet--active');
        }
        this.runHandler(helper);
      },

      runHandler: function(helper) {
        var filterItems = [ this.defaultFilter() ];
        $.ajax({
          url: '/apps/peerless/monitor-finder/search-product',
          method: 'get',
          data: {
            query: this.monitor.display_name,
            adaptersOnly: this.adaptersOnly
          },
          success: function(response) {
            var items = response.items;
            var resultItems = [];
            window.compatibilityVariants = response.items;
            if(response.count > 0) {
              for(var i = 0; i < items.length; i++) {
                resultItems.push('objectID:' + items[i]);
              }
              resultItems = '(' + resultItems.join(' OR ') + ')';
              window.activeCustomFilters.compatibity = resultItems;
              if(window.activeCustomFilters.vesa !== '') {
                resultItems = [window.activeCustomFilters.vesa, resultItems].join(' AND ');
              }
            } else {
              window.activeCustomFilters.compatibity = '';
              resultItems = 'objectID:notexists404';
            }
            filterItems.push(resultItems);
            helper.setQueryParameter('filters', filterItems.join(' AND '));
            helper.search();
            setTimeout(function() {
              $('.ais-results-as-block').removeClass('loading-compatibility');
            }, 300);
          }
        });
      },

      render: function(args) {
        if(this.hasCompatibility(args.results)) {
          $template.removeClass('hidden');
          if($container.find($template).length === 0) {
            $container.append($template);
            this.runHandler(args.helper);
          }
        } else {
          $template.addClass('hidden');
        }
      }
    };
  }

  instantsearch.widgets.compatibityFilter = compatibityFilter;
}(instantsearch));
