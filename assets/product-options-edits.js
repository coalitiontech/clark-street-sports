BOLD.options.app.on('options_loaded', function (data) {
  if (!document.querySelector("[data-template-type='multiple-products'] .product-form")) {
    console.log(data);
    $('input[type="text"]#Quantity').parent().hide();
    $('#AddToCart-product-template').hide();

    var variantNames = [];
    var variantIDs = [];
    var optionData = [];
    var options = data.data.option_product.productOptionSet[0].options;
    $.each(options, function (index, option) {
      optionData[index] = option.optionData;
    });

    $('.bold_option_dropdown').each(function (index) {
      $(this).find('select').hide();
      if ($(this).find('.bold_option_title').text().indexOf('(Custom)') > 0) {
        $(this).find('.bold_option_title').text($(this).find('.bold_option_title').text().replace('(Custom)', ''));
        $(this).append('<table class="custom_option option-' + index + ' product-option-table"></table>');
      } else
        $(this).append('<table class="option-' + index + ' product-option-table"></table>');
      var sizeArray = [];
      var colorArray = [];

      $(this).find('option').each(function () {
        if ($(this).val() != '') {
          var values = $(this).val().split('/');
          var color = values[0];
          var size = values[1];
          if (!(colorArray.indexOf(color) > -1)) {
            colorArray.push(color);
          }
          if (!(sizeArray.indexOf(size) > -1)) {
            sizeArray.push(size);
          }
        }
      });
      $('.option-' + index).append('<thead><tr></tr></thead><tbody></tbody>');
      for (var i = -1; i < sizeArray.length; i++) {
        if (i == -1)
          $('table.option-' + index).find('thead tr').eq(0).append('<th><strong>Color</strong></th>');
        else
          $('table.option-' + index).find('thead tr').eq(0).append('<th><strong>' + sizeArray[i] + '</strong></th>');
      }
      for (var i = 0; i < colorArray.length; i++) {
        $('table.option-' + index).find('tbody').append('<tr class="' + colorArray[i] + '"></tr>');
        for (var x = -1; x < sizeArray.length; x++) {

          if (x == -1)
            $('table.option-' + index).find('tr').eq((i + 1)).append('<td><strong>' + colorArray[i] + '</strong></td>');
          else if ($(this).find('select').text().indexOf(colorArray[i] + '/' + sizeArray[x]) > -1) {
            $('table.option-' + index).find('tr').eq((i + 1)).append('<td><input class="color-size-quantity enabled" "type="number" min="0" value="0" data-value="' + colorArray[i] + '/' + sizeArray[x] + '"/></td>');
          } else {
            $('table.option-' + index).find('tr').eq((i + 1)).append('<td><input class="color-size-quantity disabled" disabled "type="number" min="0" data-value="' + colorArray[i] + '/' + sizeArray[x] + '"/></td>');
          }
        }
      }
    });

    $('.option-0 input.color-size-quantity').on('keyup', function (e) {
      var option0 = 0;
      var option1 = 0;
      var characterFound = false;
      $('.option-0 input.color-size-quantity.enabled').each(function () {
        if (/^\d+$/.test($(this).val()))
          option0 = option0 + parseInt($(this).val());
        else
          characterFound = true;
      });
      $('.option-1 input.color-size-quantity.enabled').each(function () {
        if (/^\d+$/.test($(this).val()))
          option1 = option1 + parseInt($(this).val());
        else
          characterFound = true;
      });
      if (option0 != option1) {
        $('.dummy-atc').attr('disabled', '');
        console.log("Product 1 and 2 quantities not similar.  Disabling Add To Cart");
      } else {
        $('input[type="text"]#Quantity').val(option0);
        $('.dummy-atc').removeAttr('disabled');
        console.log("Product 1 and 2 quantities similar.  Enabling Add To Cart");
      }
      if (characterFound) {
        $('.dummy-atc').attr('disabled', '');
        console.log("Product 1 and quantity contains unallowed character.  Disabling Add To Cart");
      }
    });
    $('.option-1 input.color-size-quantity').on('keyup', function (e) {
      var option1 = 0;
      var option0 = 0;
      var characterFound = false;
      $('.option-0 input.color-size-quantity.enabled').each(function () {
        if (/^\d+$/.test($(this).val()))
          option0 = option0 + parseInt($(this).val());
        else
          characterFound = true;
      });
      $('.option-1 input.color-size-quantity.enabled').each(function () {
        if (/^\d+$/.test($(this).val()))
          option1 = option1 + parseInt($(this).val());
        else
          characterFound = true;
      });
      if (option0 != option1) {
        $('.dummy-atc').attr('disabled', '');
        console.log("Product 1 and 2 quantities not similar.  Disabling Add To Cart");
      } else {
        $('input[type="text"]#Quantity').val(option1);
        $('.dummy-atc').removeAttr('disabled');
        console.log("Product 1 and 2 quantities similar.  Enabling Add To Cart");
      }
      if (characterFound) {
        $('.dummy-atc').attr('disabled', '');
        console.log("Product 2 and quantity contains unallowed character.  Disabling Add To Cart");
      }
    });

    $('.dummy-atc').on('click', function () {
      $('#customization-table tbody').empty();
      var length = parseInt($('input[type="text"]#Quantity').val());
      var product1 = [];
      var p1Name = $('.option-0').parent().find('.bold_option_title').text();
      var product2 = [];
      var p2Name = $('.option-1').parent().find('.bold_option_title').text();

      if ($('.custom_option').length > 0) {
        var type = '<select class="type-selector">' +
          '<option value="None">None</option>' +
          '<option value="Current">Current</option>' +
          '<option value="Retired">Retired</option>' +
          '<option value="Personalize">Personalize</option>' +
          '</select>';

        var retired = '';
        var current = '';
        var currentSelect = '<select class="current-select">';
        var retiredSelect = '<select class="retired-select">';

        var pathname = window.location.pathname;
        pathname = pathname.slice((pathname.indexOf('/collections/') + 13), pathname.indexOf('/products'));
        //console.log(pathname);

        var retiredUrl = '//cdn.shopify.com/s/files/1/2242/6395/t/254/assets/team_name%20-%20retired.txt?82481';
        retiredUrl = retiredUrl.split('team_name');
        retiredUrl = retiredUrl[0] + pathname + retiredUrl[1];
        //console.log(retiredUrl);

        var currentUrl = '//cdn.shopify.com/s/files/1/2242/6395/t/254/assets/team_name%20-%20current.txt?82481';
        currentUrl = currentUrl.split('team_name');
        currentUrl = currentUrl[0] + pathname + currentUrl[1];

        $.ajax({
          url: retiredUrl,
          dataType: "text",
          async: false,
          success: function (data) {
            retired = data.split('\n');
          },
          complete: function () {
            for (var i = 0; i < retired.length; i++) {
              retiredSelect = retiredSelect + '<option value="' + retired[i] + '">' + retired[i] + '</option>'
            }
            retiredSelect = retiredSelect + '</select>';
          }
        });


        $.ajax({
          url: currentUrl,
          dataType: "text",
          async: false,
          success: function (data) {
            current = data.split('\n');
          },
          complete: function () {
            for (var i = 0; i < current.length; i++) {
              currentSelect = currentSelect + '<option value="' + current[i] + '">' + current[i] + '</option>'
            }
            currentSelect = currentSelect + '</select>';
          }
        });


        $('.product-option-table').each(function (index) {
          if (!$(this).hasClass('custom_option'))
            return;
          else {
            var product = [];
            var pName = $('.option-' + index).parent().find('.bold_option_title').text();
            $('.option-' + index + ' input.color-size-quantity:enabled').each(function () {
              if (parseInt($(this).val()) > 0)
                for (var x = 0; x < parseInt($(this).val()); x++)
                  product.push($(this).data('value'));
            });
            for (var i = 0; i < length; i++) {
              $('#customization-table tbody').append('<tr id="custom-' + i + '"><td>' + pName + ' - ' + product[i] + '</td><td>' + type + '</td><td class="custom-product-info none" data-name="' + pName + '" data-value="' + product[i] + '"><input class="personal-name" placeholder="Name" id="custom-name-' + i + '" type="text" value=""><input class="personal-number" placeholder="Number" id="custom-number-' + i + '" type="text" value="">' + retiredSelect + currentSelect + '</td></tr>');
            }
          }
        });

        $('.type-selector').on('change', function () {
          if ($(this).val() == 'Personalize') {
            $(this).parent().next('td').addClass('personalize').removeClass('current').removeClass('retired').removeClass('none');
          } else if ($(this).val() == 'Current') {
            $(this).parent().next('td').addClass('current').removeClass('personalize').removeClass('retired').removeClass('none');
          } else if ($(this).val() == 'Retired') {
            $(this).parent().next('td').addClass('retired').removeClass('personalize').removeClass('current').removeClass('none');
          } else {
            $(this).parent().next('td').removeClass('personalize').removeClass('current').removeClass('retired').addClass('none');
          }
        });
      } else {
        $('.real-atc').click();

        $.fancybox.close();
      }
    });

    $('.real-atc').on('click', function () {
      var product_names = [];
      var product_values = [];
      var pNames = []
      $('.product-option-table').each(function (index) {
        if ($(this).hasClass('custom_option'))
          return;
        else {
          var product = []
          var pName = $('.option-' + index).parent().find('.bold_option_title').text();
          $('.option-' + index + ' input.color-size-quantity:enabled').each(function () {
            if (parseInt($(this).val()) > 0)
              for (var x = 0; x < parseInt($(this).val()); x++)
                product.push($(this).data('value'));
          });
          for (var i = 0; i < product.length; i++)
            $('.bold_options.bold_options_loaded').append('<input type="hidden" name="properties[' + pName + ' - ' + product[i] + ' - #' + (i + 1) + ']" value="' + product[i] + '"/>');
        }
      });

      $('.custom-product-info').each(function (index) {
        product_names.push($(this).data('value'));
        pNames.push($(this).data('name'));
        if ($(this).hasClass('none')) {
          product_values[index] = 'N/A';
        } else if ($(this).hasClass('current')) {
          product_values[index] = $(this).find('.current-select').val();
        } else if ($(this).hasClass('retired')) {
          product_values[index] = $(this).find('.retired-select').val();
        } else if ($(this).hasClass('personalize')) {
          product_values[index] = $(this).find('.personal-name').val() + ' - ' + $(this).find('.personal-number').val();
        }
        $('.bold_options.bold_options_loaded').append('<input type="hidden" name="properties[' + pNames[index] + ' - ' + product_names[index] + ' - #' + (index + 1) + ']" value="' + product_values[index] + '"/>');
      });

      var _boldVariantNames = [];
      var _boldVariantIds = [];
      var _boldProductIds = [];
      var _boldVariantPrices = [];
      var _boldVariantQtys = [];
      var _boldBuilderId = Date.now();

      for (var i = 0; i < optionData.length; i++) {
        $('.option-' + i + ' input.color-size-quantity:enabled').each(function () {
          if (parseInt($(this).val()) > 0) {
            _boldVariantNames.push($(this).data('value'));
            for (var x = 0; x < optionData[i].options_values.length; x++) {
              var value = $(this).data('value').split('/');
              if ((value[0] + '/' + value[1]) == optionData[i].options_values[x].value || (value[1] + '/' + value[0]) == optionData[i].options_values[x].value) {
                _boldVariantIds.push(optionData[i].options_values[x].variant);

                _boldProductIds.push(optionData[i].options_values[x].product_id);
              }
            }
            _boldVariantPrices.push(0);
            _boldVariantQtys.push($(this).val() + '*');

          }
        });

      }

      $('input[type="hidden"][name="properties[_boldVariantNames]"]').val(_boldVariantNames);
      console.log($('input[type="hidden"][name="properties[_boldVariantNames]"]').val());
      $('input[type="hidden"][name="properties[_boldVariantIds]"]').val(_boldVariantIds);
      console.log($('input[type="hidden"][name="properties[_boldVariantIds]"]').val());
      $('input[type="hidden"][name="properties[_boldProductIds]"]').val(_boldProductIds);
      console.log($('input[type="hidden"][name="properties[_boldProductIds]"]').val());
      $('input[type="hidden"][name="properties[_boldVariantPrices]"]').val(_boldVariantPrices);
      console.log($('input[type="hidden"][name="properties[_boldVariantPrices]"]').val());
      $('input[type="hidden"][name="properties[_boldVariantQtys]"]').val(_boldVariantQtys);
      console.log($('input[type="hidden"][name="properties[_boldVariantQtys]"]').val());
      $('input[type="hidden"][name="properties[_boldBuilderId]"]').val(_boldBuilderId);
      console.log($('input[type="hidden"][name="properties[_boldBuilderId]"]').val());


      var data = $('.bold_options.bold_options_loaded').closest('form').serialize();

      $.ajax({
        url: '/cart/add.js',
        type: 'POST',
        async: false,
        data: data,
        success: function (cart) {
          $.fancybox.close();
          $('.cart-link').click();
        }
      });
    });


    jQuery(document).fancybox({
      selector: '[data-fancybox]',
      iframe: {
        preload: false,
        css: {
          width: '300px',
          height: '300px'
        }
      },
      beforeLoad: function () {
        if ($('.custom-product-info').length < 1) {
          $.fancybox.close();
        }
      },
      afterLoad: function (instance, slide) {
        if ($('.custom-product-info').length < 1) {
          $.fancybox.close();
        }
      }
    });
  }
});