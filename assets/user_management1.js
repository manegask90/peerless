Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('contains', function(arg1, arg2, options) {
  return arg1.indexOf(arg2) !== -1 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('truncatePin', function(that){
  if (!that.phone || !that.phone_pin) return '';

  return that.phone.replace(that.phone_pin, '');
});

Handlebars.registerHelper('maskPhone', function (that){
  return maskString(that.phone, '+X (XSX) XXX-XXXX', {X: /\d/, S: /[1-9]/});
});

$.fn.serializeObj = function () {
  var serializedArray = $(this).serializeArray();
  var data = {};
  serializedArray.forEach(function(obj){
    data[obj.name] = obj.value;
  });
  return data;
}

function UserManagement () {
  var _this = this;
  this.id                     = customer.id;
  this.company                = customer.company;
  this.industry               = customer.industry;
  this.country                = customer.country;
  this.apiUrl                 = "/apps/peerless/customers-management";
  this.apiUpdateURL           = "/apps/peerless/customers/update";
  this.apiCreateURL           = "/apps/peerless/customers/admin-create";
  this.approveDenyURL         = "/apps/peerless/customers/approve_deny";
  this.enableDisableURL       = "/apps/peerless/customers/enable_disable";
  this.changePermissions      = "/apps/peerless/customers/change-permissions";
  this.resendInviteURL        = "/apps/peerless/customers/resend-invite";
  this.checkUserURL           = "/apps/peerless/customers/check-user";
  this.joinUserURL            = "/apps/peerless/customers/join-existing-user";
  this.shop                   = window.location.host;
  this.customers              = [];
  this.approvalCustomers      = [];
  this.allUsersTable          = "#all-users__table";
  this.approvalUsersTable     = "#approval-needed__table";
  this.searchForm             = '.customer-search';
  this.wrappers               = '.approval-needed, .all-users';
  this.loading                = '.loading';
  this.infoBox                = '.info-box';
  this.editFrom               = '.edit-customer form.edit-account-tab';
  this.editModal              = '.edit-customer';
  this.createModal            = '.create-customer';
  this.createForm             = '.create-form';
  this.permissionForm         = '.edit-customer form.permissions-tab';
  this.addNewCustomer         = '.add-new-customer';
  this.allUsersDataTable      = null;
  this.approvalUsersDataTable = null;
  this.reviewSource           = document.getElementById('review-template').innerHTML;
  this.reviewTemplate         = Handlebars.compile(this.reviewSource);
  this.editSource             = document.getElementById('edit-template').innerHTML;
  this.editTemplate           = Handlebars.compile(this.editSource);
  this.createSource           = document.getElementById('create-template').innerHTML;
  this.createTemplate         = Handlebars.compile(this.createSource);

  this.enableDisableSource    = document.getElementById('enable-disable-template').innerHTML;
  this.enableDisableTemplate  = Handlebars.compile(this.enableDisableSource);

  this.phoneImask             = null;
  this.maskOptions            = {mask: '+1 (000) 000-0000'};
  this.newJoinCutomerId       = null;

  this.handleAjax = function (url, data, method, onSucess = null, onComplete = null, onError = null) {
    $.ajax({
      type: method,
      dataType: 'json',
      crossDomain: true,
      url: url,
      data: data,
      success: function (resp) {
        if (onSucess)
          onSucess(resp)
      },
      error: function (error) {
        if (onError)
          onError(error);
        _this.error = true;
      },
      complete: function () {
        if (onComplete)
          onComplete();
      }
    });
  }

  this.loadUsers = function () {
    var data = {
      userId: this.id,
    }

    this.handleAjax(
      this.apiUrl, 
      data, 
      'GET', 
      _this.handleCustomerRender.bind(this), 
      _this.initDataTable.bind(this),
      function (error) {console.log(error)}
    );
  }

  this.approveDenyCustomer = function (data, btn) {
    this.handleAjax(
      this.approveDenyURL, 
      data, 
      'PUT', 
      this.handleStateUpdateResponse.bind(this),
      function () {
        btn.removeClass('btn-loading');
      }
    );
  }

  this.enableDisableCustomer = function (data, btn) {
    this.handleAjax(
      this.enableDisableURL, 
      data, 
      'PUT', 
      this.handleStateUpdateResponse.bind(this),
      function () {
        btn.removeClass('btn-loading');
      }
    );
  }

  this.editCustomer = function (that) {
    var data = $(that).serializeObj();

    data.phone = "+1" + this.phoneImask.unmaskedValue;
    data.newsletter = $(this.editModal).find('#newsletter').prop('checked') ? 1 : 0;

    var errors = _this.validateEditForm();
    if (errors.length) return;

    $(that).find('button[type="submit"]').addClass('btn-loading');

    this.handleAjax(
      this.apiUpdateURL, 
      data, 
      'POST', 
      this.handleEditResponse.bind(this),
      function () { $(_this.editFrom + ' button[type="submit"]').removeClass('btn-loading'); }
    );
  }

  this.editCustomerPermission = function (that) {
    var data = $(that).serializeObj();

    this.handleAjax(
      this.changePermissions, 
      data, 
      'POST', 
      this.handlePermissionResponse.bind(this), 
      function () { $(_this.permissionForm + ' button[type="submit"]').removeClass('btn-loading'); }
    );
  }

  this.creteNewCustomer = function (form) {
    var data = $(this.createForm).serializeObj();

    data['company']  = this.company;
    data['industry'] = this.industry;
    data['country']  = this.country;
    data['tags']     = data['account_type'];
    data['tags']    += data['newsletter'] ? ', newsletter' : '';
    data['phone']    = "+1" + this.phoneImask.unmaskedValue;

    form.find('.permissions-tab button[type="submit"]').addClass('btn-loading');

    this.handleAjax(
      this.apiCreateURL,
      data,
      "POST",
      this.handleNewCustomerResponse.bind(this),
      function () {
        form.find('.permissions-tab button[type="submit"]').removeClass('btn-loading');
      }
    );
  }

  this.checkUser = function (data, that) {
    this.handleAjax(
      this.checkUserURL, 
      data, 
      'GET', 
      this.handleUserCheckResponse.bind(this), 
      function () {
        that.removeClass('btn-loading');
      }
    );
  }

  this.joinUser = function () {
    this.handleAjax(
      this.joinUserURL, 
      {
        newCustomerId: this.newJoinCutomerId,
        companyName: this.company,
      }, 
      'POST', 
      function (response) {
        this.renderInfoMessage(response, this.infoBox );
        $.colorbox.close();
      }.bind(this), 
      function () {
        that.removeClass('btn-loading');
      }
    );
  }

  this.resendInvite = function (data) {
    this.handleAjax(
      this.resendInviteURL, 
      data, 
      'POST', 
      function(response) { this.renderInfoMessage(response, this.infoBox) }.bind(this), 
      function() { $('.actionList-oppened').removeClass('actionList-oppened'); }, 
    );
  }

  this.handleNewCustomerResponse = function (response) {
    if (response.success) {
      displaySuccess('User was successfully created', this.infoBox);
      $.colorbox.close();
      
      /// add Customers to list and rende table again
      if (response.appCustomer) {
        this.customers.unshift(response.appCustomer);

        this.destroyDataTables();
        this.handleCustomerRender({
          customers: this.customers
        }, false);
        this.initDataTable();
      }
    } else {
      if (response.error.email) {
        $(this.createModal).find('.tab.active').removeClass('active');
        $(this.createModal).find('.email-tab').addClass('active');
        displayErrors("Email " + response.error.email, this.createModal + ' .email-info-box');
      } else if (response.error.phone) {
        $(this.createModal).find('.tab.active').removeClass('active');
        $(this.createModal).find('.user-data-tab').addClass('active');
        displayErrors("Phone " + response.error.phone, this.createModal + ' .user-info-box');
      }
      $.colorbox.resize();
    }
  }

  this.handleEditResponse = function (response) {
    if (response.success) {
      // change customer state
      var newCustomers = this.customers.map(function (customer) {
        if (customer.id == +response.id) {
          customer.first_name      = response.first_name ? response.first_name : customer.first_name;
          customer.last_name       = response.last_name ? response.last_name : customer.last_name;
          customer.email           = response.email ? response.email : customer.email;
          // customer.phone_pin       = response.phone_pin;
          customer.phone           = response.phone ? response.phone : customer.phone;
          customer.language        = response.language ? response.language : customer.language;
          customer.tags            = response.tags ? response.tags : customer.tags;
        }
        return customer;
      });

      this.destroyDataTables();

      this.handleCustomerRender({
        customers: newCustomers
      }, false);

      this.initDataTable();
    }
    this.renderInfoMessage(response, this.infoBox);
    $.colorbox.close();
    $('#cboxOverlay').fadeOut();
  }

  this.handleUserCheckResponse = function (response) {
    if (response.success) {
      // Customer already exist
      if (response.customers.length) {
        $(this.createModal + ' .email-wrap').hide();
        $(this.createModal + ' .join-user').show();

        if (response.join) {
          $(this.createModal + ' .join-user .add-user').show();
          _this.newJoinCutomerId = response.user_id;
        } else {
          $(this.createModal + ' .join-user .add-user').hide();
        }
        
        $(this.createModal + ' .join-user .join-message').html(response.join_message);
      } else {
        $(this.createModal + ' .email-tab').removeClass('active');
        $(this.createModal + ' .user-data-tab').addClass('active');
        $(this.createModal + ' .user-data-tab .email-wrap .email').text(response.email);
      }
    } else {
      this.renderInfoMessage(response, $(this.createModal + ' .email-info-box'));
    }
    $.colorbox.resize();
  }

  this.handlePermissionResponse = function (response) {
    if (response.success) {
      // change customer state
      var newCustomers = this.customers.map(function (customer) {
        if (customer.id == +response.customer_id) {
          customer.invoices        = response.invoices;
          customer.order_history   = response.order_history;
          // customer.pricing         = response.pricing;
          customer.purchasing      = +response.purchasing;
          customer.reviews         = +response.reviews;
          customer.user_management = +response.user_management;
          customer.company_admin   = +response.company_admin;
        }
        return customer;
      });

      this.destroyDataTables();

      this.handleCustomerRender({
        customers: newCustomers
      }, false);

      this.initDataTable();
    }
    this.renderInfoMessage(response, this.infoBox);
    $.colorbox.close();
    $('#cboxOverlay').fadeOut();
  }

  this.handleCustomerRender = function (resp, onLoad = true) {
    if (onLoad) {
      $(this.wrappers).show();
      $(this.loading).hide();
    }
    if (resp.customers) {
      this.customers = resp.customers;
      this.renderAllCustomers();
      // this.fillApprovalCustomers();
      // this.renderApprovalCustomers()
      if (onLoad) {
        this.initActionEvents();
        this.initReviewAction();
      }
      this.initSearch();
    }
  }

  this.handleStateUpdateResponse = function (response) {
    if (response.success) {
      // change customer state
      var newCustomers = this.customers.map(function (customer) {
        customer.tags = customer.id == +response.id ? response.tags : customer.tags;
        return customer;
      });

      this.destroyDataTables();

      this.handleCustomerRender({
        customers: newCustomers
      }, false);

      this.initDataTable();
    }
    this.renderInfoMessage(response, this.infoBox);
    $.colorbox.close();
  }

  this.renderInfoMessage = function (response, wrap) {
    if (response.success) {
      displaySuccess(response.message, wrap);
    } else {
      displayErrors(response.errors ? response.errors : response.error, wrap);
    }
  }

  this.fillApprovalCustomers = function () {
    this.approvalCustomers = this.customers.filter(function (customer) {
      return _this.getStateFromTags(customer.tags) == 'invited';
    });
  }

  this.renderApprovalCustomers = function () {
    if (!this.approvalCustomers.length) {
      $(this.approvalUsersTable + ' tbody').html('');
      return;
    }

    var approvalCustomersHTML = this.approvalCustomers.map(function (customer) {
      return _this.createApprovalCustomersRow(customer);
    });

    $(this.approvalUsersTable + ' tbody').html('').append(approvalCustomersHTML);
    $('.approval-needed .section-title .count').text('('+this.approvalCustomers.length+')');
  }

  this.renderAllCustomers = function () {
    if (!this.customers.length) return;

    var allCustomersHTML = this.customers.map(function (customer) {
      return _this.createAllCustomersRow(customer);
    });

    $(this.allUsersTable + ' tbody').html('').append(allCustomersHTML);
  }

  this.createAllCustomersRow = function (customer) {
    var tr = document.createElement('tr');
    var rowContent = '';
    var state = this.getStateFromTags(customer.tags);


    tr.classList.add(state);
    tr.setAttribute('data-id', customer.id);
    tr.setAttribute('data-customer', JSON.stringify(customer));

    rowContent += '<td><span class="name">'+customer.first_name + ' '+ customer.last_name +'</span>' 
      +'<div class="mail">'+customer.email+'</div></td>';
    rowContent += '<td>'+this.getPermissions(customer)+'</td>';
    rowContent += '<td>'+customer.formated_updated_at+'</td>';
    rowContent += '<td>'+currentLanguage[state]+'</td>';
    rowContent += '<td>'+this.createActionList(customer)+'</td>';
    tr.innerHTML = rowContent;

    return tr;
  }

  this.createApprovalCustomersRow = function (customer) {
    var tr         = document.createElement('tr');
    var rowContent = '';
    var state      = this.getStateFromTags(customer.tags);

    tr.classList.add(state);
    tr.setAttribute('data-id', customer.id);
    tr.setAttribute('data-customer', JSON.stringify(customer));

    rowContent += '<td><span class="name">'+customer.first_name + ' '+ customer.last_name +'</span>' 
      +'<div class="requested">Requested on: '+customer.formated_created_at+'</div><button class="review-btn mobile">Review</button></td>';
    rowContent += '<td>'+customer.email+'</td>';
    rowContent += '<td><button class="review-btn descktop">Review</button></td>';
    tr.innerHTML = rowContent;

    return tr;
  }

  this.createActionList = function (customer) {
    var div = '<div class="actionList"><button><span></span><span></span><span></span></button>';
        div +=  '<ul><li class="edit">'+currentLanguage.edit_account+'</li>'+
                '<li class="editPermission">'+currentLanguage.edit_permissions+'</li>'; //+
                //'<li class="reset">Reset Password</li>';

    if (customer.tags.indexOf('invited') != -1) {
      div += '<li class="invite">'+currentLanguage.resend_invite+'</li>';
    }
    if (customer.tags.indexOf('disabled') != -1 || customer.tags.indexOf('declined') != -1) {
      div += '<li class="enable">'+currentLanguage.enable_user+'</li>';
    }
    if (customer.tags.indexOf('enabled') != -1) {
      div += '<li class="disable">'+currentLanguage.disable_user+'</li>';
    }

    div += '</ul></div>'
    return div;
  }

  this.getStateFromTags = function (tags) {
    if (tags.indexOf('invited') != -1) {
      return 'invited';
    }
    if (tags.indexOf('disabled') != -1) {
      return 'disabled';
    }
    if (tags.indexOf('enabled') != -1) {
      return 'enabled';
    }
    if (tags.indexOf('declined') != -1) {
      return 'declined';
    }
  }

  this.getStatusText = function (state) {
    switch (state) {
      case 'disabled':
        return 'Disabled';

      case 'enabled':
        return 'Enabled';

      case 'invited':
        return 'Invited';

      case 'declined':
        return 'Declined';
    }
    return state;
  }

  this.getPermissions = function (customer) {
    var order_history_text = customer.order_history;
    var invoices_text = customer.invoices;

    var permissionList = "<ul>";
    if (customer.company_admin) {
      permissionList += '<li>'+currentLanguage.company_admin+'</li>';
    }
    if (customer.purchasing) {
      permissionList += '<li>'+currentLanguage.purchasing+'</li>';
    }
    if (customer.reviews) {
      permissionList += '<li>'+currentLanguage.reviews+'</li>';
    }

    // permissionList += '<li>Pricing: '+ jsUcfirst(customer.pricing.split('_').join(' ')) +'</li>';
    permissionList += '<li>'+currentLanguage.order + currentLanguage[order_history_text] +'</li>';
    permissionList += '<li>'+currentLanguage.invoices + currentLanguage[invoices_text] +'</li>';
    
    if (customer.user_management) {
      permissionList += '<li>'+currentLanguage.user_management+'</li>';
    }

    permissionList += "</ul>";
    return permissionList;
  }

  this.closeActionList = function () {
    $('.actionList-oppened').removeClass('actionList-oppened');
  }

  this.validateEditForm = function () {
    var errors = [];
    $(this.editFrom).find('[required]').each(function () {
      if ($(this).val() == '') {
        errors.push(this);
        $(this).addClass('email_err_msg');
      } else {
        $(this).removeClass('email_err_msg');
      }
    });
    return errors;
  }

  this.destroyDataTables = function () {
    this.allUsersDataTable.destroy();
    this.approvalUsersDataTable.destroy();
  }

  this.searchUsers = function (searchValue) {
    this.approvalUsersDataTable.search(searchValue).draw();
    this.allUsersDataTable.search(searchValue).draw();
  }

  this.initMask = function () {
    var element = document.getElementById('phone');
    _this.phoneImask = new IMask(element, _this.maskOptions);
  }

  this.hideColorbox = function () {
    $('#cboxOverlay, #colorbox').addClass('hidden');
  }

  this.showColorbox = function () {
    $('#cboxOverlay, #colorbox').removeClass('hidden');
  }

  this.showUnsavedChangesPopup = function () {
    $('.unsavedChanges').addClass('visible');
  }

  this.hideUnsavedChangesPopup = function () {
    $('.unsavedChanges').removeClass('visible');
  }

  this.initActionEvents = function () {
    var lang  = langify.helper.getSelectedLanguage();

    $(document).on('click', '.actionList button', function () {
      $('.actionList-oppened').not($(this).closest('td')).removeClass('actionList-oppened');
      if ($(this).closest('td').hasClass('actionList-oppened')) {
        $(this).closest('td').removeClass('actionList-oppened');
      } else {
        $(this).closest('td').addClass('actionList-oppened');
      }
    });

    $(document).on('click', function (e) {
      if (!$(e.target).hasClass('actionList') && 
        $(e.target).closest('.actionList').length == 0
        && $('.actionList-oppened').length) {
        $('.actionList-oppened').removeClass('actionList-oppened');
      }
    });

    $(document).on('click', '.actionList .edit', function () {
      var customer = $(this).closest('tr').data('customer');
      customer.permissions = false;
      var html = _this.editTemplate(customer);
      $.colorbox({
        title: false,
        html: html,
        closeButton: false,
        width: '110%',
        maxWidth: '560px',
        onOpen: function () {
          setTimeout(function () {
            var oldOverlay = document.getElementById("cboxOverlay");
            var newOverlay = oldOverlay.cloneNode(true);
            newOverlay.addEventListener('click', function (e) {
              e.preventDefault();
              e.stopPropagation();
            });
            oldOverlay.parentNode.replaceChild(newOverlay, oldOverlay);
            $("#cboxOverlay").show();
            _this.initCloseOverlay();
          });
        },
        onClosed: function () {
          $("#cboxOverlay").fadeOut();
        }
      });
      _this.closeActionList();

      _this.initMask();
    });

    $(document).on('click', '.actionList .editPermission', function () {
      var customer = $(this).closest('tr').data('customer');
      customer.permissions = true;
      var html = _this.editTemplate(customer);
      $.colorbox({
        title: false,
        html: html,
        closeButton: false,
        width: '110%',
        maxWidth: '717px',
        onOpen: function () {
          setTimeout(function () {
            var oldOverlay = document.getElementById("cboxOverlay");
            var newOverlay = oldOverlay.cloneNode(true);
            newOverlay.addEventListener('click', function (e) {
              e.preventDefault();
              e.stopPropagation();
            });
            oldOverlay.parentNode.replaceChild(newOverlay, oldOverlay);
            $("#cboxOverlay").show();
            _this.initCloseOverlay();
          });
        },
        onClosed: function () {
          $("#cboxOverlay").fadeOut();
        }
      });
      _this.closeActionList();

      _this.initMask();
    });

    $(document).on('click', '.actionList .enable', function () {
      var customer = $(this).closest('tr').data('customer');
      var trans_text = currentLanguage.enabled;
      var enableObj = {
        state: 'enabled',
        title: trans_text + ' ' + customer.first_name +' '+ customer.last_name +'?',
        message: 'Are you sure you want to re-enable '+ customer.first_name +' '+ customer.last_name +' and restore login access for this user?',
        btn_text: currentLanguage.enable_account,
        id: customer.id
      }
      
      switch (lang) {
        case 'ly73952':
        enableObj.message = 'Möchten Sie wirklich '+ customer.first_name +' '+ customer.last_name +' aktivieren und den Login-Zugriff für dieses Konto wiederherstellen?';
          break;
      }
      var html = _this.enableDisableTemplate(enableObj);

      $.colorbox({
        title: false,
        html: html,
        closeButton: false,
        width: '110%',
        maxWidth: '560px',
        onOpen: function () {
          _this.initCloseOverlay();
          $("#cboxOverlay").fadeIn();
        },
        onClosed: function () {
          $("#cboxOverlay").fadeOut();
        }
      });
    });

    $(document).on('click', '.actionList .disable', function () {
      var customer = $(this).closest('tr').data('customer');
      var trans_text = currentLanguage.disabled;
      var disableObj = {
        state: 'disabled',
        title: trans_text + ' ' + customer.first_name +' '+ customer.last_name +'?',
        message: 'Are you sure you want to disable '+ customer.first_name +' '+ customer.last_name +' and remove login access for this account?',
        btn_text: currentLanguage.disable_account,
        id: customer.id
      }

      switch (lang) {
        case 'ly73952':
        disableObj.message = 'Möchten Sie '+ customer.first_name +' '+ customer.last_name +' wirklich deaktivieren und den Login-Zugriff für dieses Konto entfernen?';
          break;
      }
      var html = _this.enableDisableTemplate(disableObj);

      $.colorbox({
        title: false,
        html: html,
        width: '110%',
        maxWidth: '560px',
        onOpen: function () {
          _this.initCloseOverlay();
          $("#cboxOverlay").fadeIn();
        },
        onClosed: function () {
          $("#cboxOverlay").fadeOut();
        },
        closeButton: false,
      });
    });

    $(document).on('click', '.enable-disable-modal button', function () {
      $(this).addClass('btn-loading');
      var data = $(this).closest('.enable-disable-modal').data()
      _this.enableDisableCustomer(data, $(this));
    });

    $(document).on('click', '.actionList .invite', function () {
      var invite = confirm('Are you sure you want send invite?');
      if (!invite) {
        $('.actionList-oppened').removeClass('actionList-oppened');
        return;
      }

      var data = {
        'id': $(this).closest('tr').data('id'),
      };
      _this.resendInvite(data);
    });

    $(document).on('click', this.editModal + ' .nav-wrap a', function (e) {
      e.preventDefault();
      if (!$(this).hasClass('active')) {
        var tab = $(this).data('tab');
        $(_this.editModal).find('.nav-wrap a.active').removeClass('active');
        $(_this.editModal).find('.tab.active').removeClass('active');

        $(_this.editModal).find('.'+tab).addClass('active')
        $(this).addClass('active');
        $.colorbox.resize({width: tab == 'edit-account-tab' ? 560 : 717});
      }
    });

    $(document).on('click', this.addNewCustomer, function (e) {
      e.preventDefault();
      var html = _this.createTemplate();
      $.colorbox({
        title: false,
        html: html,
        escKey: false, //escape key will not close
        closeButton: false, // hide the close button
        overlayClose: false,
        width: '110%',
        maxWidth: '560px',
        onOpen: function () {
          setTimeout(function () {
            var oldOverlay = document.getElementById("cboxOverlay");
            var newOverlay = oldOverlay.cloneNode(true);
            newOverlay.addEventListener('click', function (e) {
              e.preventDefault();
              e.stopPropagation();
            });
            oldOverlay.parentNode.replaceChild(newOverlay, oldOverlay);
            $("#cboxOverlay").show();
            _this.initCloseOverlay();
          });
        },
        onClosed: function () {
          $("#cboxOverlay").fadeOut();
        }
      });
      _this.initMask();
    });

    $(document).on('submit', _this.editFrom, function (e) {
      e.preventDefault();
      _this.editCustomer(this);
    });

    $(document).on('submit', _this.permissionForm, function (e) {
      e.preventDefault();
      $(this).find('button[type="submit"]').addClass('btn-loading');
      _this.editCustomerPermission(this);
    });

    $(document).on('click', '#colorbox .close', function () {
      // if it is create modal and we have changed fields ask for confirmation to close close window
      if ($(_this.createModal + ' .changed,' + _this.editModal + ' .changed').length) {
        _this.showUnsavedChangesPopup();
        _this.hideColorbox();
        return;
      }
      $.colorbox.close();
      $("#cboxOverlay").fadeOut();
    });
  }

  this.initDataTable = function () {
    var allUsersOptions = {
      searching: true,
      dom: "<'row'<'col-sm-6'l><'col-sm-6'i>><'row'<'col-sm-122r'tr>><'row'<'col-sm-12'pf>>",
      language: {
        processing: "Processing...",
        zeroRecords: 'No Results',
        emptyTable: 'No Results',
        // info: "Showing _START_ έως _END_ of _TOTAL_ users",
        info: "Showing _START_ of _TOTAL_ users",
        infoFiltered: "",
        paginate: {
          previous: '<',
          next: '>',
        }
      },
      order: [[2, 'desc']],
      pageLength: 20,
    };

    var language = this.getLanguage();
    
    switch (language) {
      case 'DE':
        allUsersOptions.language.info = " _START_ von _TOTAL_ Benutzer anzeigen";
        break;
    }
    
    this.allUsersDataTable = $(this.allUsersTable).DataTable(allUsersOptions);

    this.approvalUsersDataTable = $(this.approvalUsersTable).DataTable({
      searching: true,
      dom: "<'row'<'col-sm-12'tr>>",
      language: {
        processing: "Processing...",
        zeroRecords: 'No Results',
        emptyTable: 'No Results',
        paginate: {
          previous: '<',
          next: '>',
        }
      },
      pageLength: 1000,
    });
  }

  this.getLanguage = function () {
    var language = 'US';
    var langObj = {
      ly73951: 'US',
      ly73952: 'DE',
      ly73954: 'ES',
      ly77552: 'FR'
    };
    if (globalCart && globalCart.attributes && globalCart.attributes.language && langObj[globalCart.attributes.language]) {
      language = langObj[globalCart.attributes.language];
    }
    return language;
  }

  this.initReviewAction = function () {
    $(document).on('click', '#approval-needed__table .review-btn', function () {
      var customer = $(this).closest('tr').data('customer');
      var html = _this.reviewTemplate(customer);
      $.colorbox({
        title: false,
        html: html,
        closeButton: false, // hide the close button
        width: '110%',
        maxWidth: '560px',
        onOpen: function () {
          _this.initCloseOverlay();
          $("#cboxOverlay").fadeIn();
        },
        onClosed: function () {
          $("#cboxOverlay").fadeOut();
        }
      });
    });

    $(document).on('click', '.review-customer .open_deny', function () {
      $(this).closest('.review-customer').addClass('deny');
      $.colorbox.resize();
    });

    $(document).on('click', '.review-customer .deny', function () {
      var data = {
        'id': $(this).data('id'),
        'state': 'disabled', 
        'company': _this.company,
        'reason': $(this).closest('.review-customer').find('#denial_reason_message').val(),
      };
      $(this).addClass('btn-loading');
      _this.approveDenyCustomer(data, $(this));
    });

    $(document).on('click', '.review-customer .approve', function () {
      var data = {
        'id': $(this).data('id'),
        'company': _this.company,
        'state': 'enabled'
      };
      $(this).addClass('btn-loading');
      _this.approveDenyCustomer(data, $(this));
    });
  }

  this.initSearch = function () {
    $(this.searchForm).on('submit', function (e) {
      e.preventDefault();
      var searchValue = $(this).find('input').val();
      _this.searchUsers(searchValue);
    });

    $(this.searchForm + ' input').on('input', function () {        
      var searchValue = $(this).val();
      _this.searchUsers(searchValue);
    });
  }

  this.initAddNewUser = function () {
    $(document).on('click', this.createModal + ' .check-email', function () {
      var that = $(this);
          emailWrap = that.closest('.email-wrap');
          emailField = emailWrap.find('#email'),
          emailFieldValue = emailField.val();

      if (emailFieldValue.length == 0 || !validateEmail(emailFieldValue)) {
        emailField.addClass('error');
        return;
      } else {
        emailField.removeClass('error');
        that.removeClass('btn-loading');
      }
      that.addClass('btn-loading');

      var data = {
        email: emailFieldValue,
        company: _this.company
      };

      _this.checkUser(data, that);
    });

    $(document).on('click', this.createModal + ' .enter-different-email', function () {
      var that      = $(this),
          emailTab  = that.closest('.email-tab'),
          emailWrap = emailTab.find('.email-wrap'),
          joinUser  = emailTab.find('.join-user');

      emailWrap.show();
      joinUser.hide();
      $.colorbox.resize();
    });

    $(document).on('click', this.createModal + ' .add-user', function () {
      $(this).addClass('btn-loading');
      _this.joinUser();
    });

    $(document).on('click', this.createModal + ' .user-data-tab button', function () {
      var that           = $(this),
          tab            = that.closest('.tab'),
          requiredFields = tab.find('input[required]'),
          errors         = [],
          resizeWidth    = window.innerWidth > 800 ? 680 : window.innerWidth - 50;

      requiredFields.each(function () {
        if ($(this).val() == '') {
          $(this).addClass('error');
          errors.push(this);
        } else {
          $(this).removeClass('error');
        }
      });
      if (errors.length) return;
      $(this).addClass('btn-loading');

      tab.removeClass('active');
      $(_this.createModal + ' .permissions-tab').addClass('active');

      $.colorbox.resize({width: resizeWidth});
      $(this).removeClass('btn-loading');


    });

    $(document).on('input', 
      this.createModal + ' input, '+ 
      this.editModal + ' input, '+ 
      this.editModal + ' select', 
      function () {
      $(this).addClass('changed');
    });

    $(document).on('submit', this.createForm, function (e) {
      e.preventDefault();
      var form = $(this);

      _this.creteNewCustomer(form);
    });

    $('.unsavedChanges .btn').on('click', function () {
      var btn = $(this);
      if (btn.hasClass('leave')) {
        _this.hideUnsavedChangesPopup();
        $.colorbox.close();
        _this.showColorbox();
      } else if (btn.hasClass('stay')) {
        _this.hideUnsavedChangesPopup();
        _this.showColorbox();
      }
    });
  }

  this.initCloseOverlay = function () {
    $('#cboxOverlay').on('click', function () {
      // if it is create modal and we have changed fields ask for confirmation to close close window
      if ($(_this.createModal + ' .changed, '+ _this.editModal + ' .changed').length) {
        _this.showUnsavedChangesPopup();
        _this.hideColorbox();
        return;
      }
      $.colorbox.close();
      $(this).fadeOut();
    });
  }

  this.initPagination = function() {
    $(document).on('click', '.paginate_button a', function() {
      $('html, body').animate({scrollTop: 0}, 300);
    })
  }

  this.init = function () {
    this.loadUsers();
    this.initAddNewUser();
    this.initPagination();
    window.currentLanguage = getCurrentLanguageTranslations();
  }
}
  
$(document).ready(function () {
  var userManagement = new UserManagement();
  userManagement.init();
});

function maskString(value, mask, maskPatterns) {
  value = value || ''
  mask = mask || '';
  maskPatterns = maskPatterns || {};

  var maskedValue = '';
  // array representation of string under test
  var valueParts = value.split('');
  // array representation of the mask
  var maskParts = mask.split('');

  // as long as there are still characters left in
  // the original string, one must try to mask them
  while (valueParts.length > 0) {
    // take the first character and remove
    // it from the original string
    var unmaskedChar = valueParts.shift()

    // as long as the character has not been masked
    // one must try to find a mask
    while (unmaskedChar !== null) {
      // take the first mask character from
      // the mask string
      var maskChar = maskParts.shift();

      // make sure the masking character exists
      // otherwise this means that the original string
      // exceeds the masking pattern length
      if (maskChar !== undefined) {
        // try to find a pattern for the particular
        // mask character
        var maskPattern = maskPatterns[maskChar.toUpperCase()];

        // if there is no pattern configured for
        // this particular mask character, assume
        // the mask character is a placeholder / formatting
        // value that must be added to the string
        if (maskPattern !== undefined) {
          var check = false;

          // mask pattern can be either a function
          if (typeof maskPattern === 'function') {
            check = maskPattern(unmaskedChar);
          }
          // or a regex string
          else if (maskPattern instanceof RegExp) {
            check = maskPattern.test(unmaskedChar);
          }

          // if character has passed the mask check,
          // it can bee added to the final masked value
          if (check) {
            maskedValue += unmaskedChar;
          }
          // otherwise one must put the pattern back into
          // the array so the next character can try to
          // pass the mask check
          else {
            maskParts.unshift(maskChar);
          }

          unmaskedChar = null;
        }
        // mask character is a placeholder / formatting value
        // and must be added to the masked string
        else {
          maskedValue += maskChar;
        }
      }
      // no masking character could be found,
      // the original string is probably longer
      // then the mask pattern and therefore
      // the leftovers can be cut off
      else {
        // reset current character to continue the loop
        unmaskedChar = null;
      }
    }
  }

  return maskedValue;
}