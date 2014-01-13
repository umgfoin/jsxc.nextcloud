/**
 * Copyright (c) 2013 Klaus Herberth <klaus@jsxc.org> <br>
 * Released under the MIT license
 * 
 * @file WebRTC Plugin for the javascript xmpp client
 * @author Klaus Herberth
 * @version 0.4.4
 */

$(document).ready(function() {
   $('#ojsxc').submit(function(event) {
      event.preventDefault();

      //clear area
      $('#ojsxc .msg').html(' ');
      
      var post = $(this).serialize();
      var status =  $('<div/>').html('<img src="' + jsxc.options.root +'/img/loading.gif" alt="wait" width="16px" height="16px" />');
      
      var statusBosh = status.clone().html(status.html() + " Testing BOSH Server...");
      $('#ojsxc .msg').append(statusBosh);
      
      $.post($('#boshUrl').val(), "<body rid='1234567' xmlns='http://jabber.org/protocol/httpbind' to='localhost' xml:lang='en' wait='60' hold='1' content='text/xml; charset=utf-8' ver='1.6' xmpp:version='1.0' xmlns:xmpp='urn:xmpp:xbosh'/>").done(function() {
         statusBosh.addClass('jsxc_success').text('BOSH Server reachable.');
      }).fail(function() {
         statusBosh.addClass('jsxc_fail').text('BOSH server NOT reachable. Please beware of the SOP. If your XMPP server doesn\'t reside on the same host as your OwnCloud, use the Apache ProxyRequest or modify the CSP by defining "custom_csp_policy" in OwnCloud\'s config.php.');
      });

      var statusSet = status.clone().html(status.html() + " Saving...");
      $('#ojsxc .msg').append(statusSet);
      
      $.post(OC.filePath('ojsxc', 'ajax', 'setsettings.php'), post, function(data) {
         if (data)
            statusSet.addClass('jsxc_success').text('Settings saved.');
         else
            statusSet.addClass('jsxc_fail').text('Error!');
      });

   });
});