// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.

$(document).ready(function () {
  $("#selected-plays > li").addClass("horizontal");
  $("#selected-plays li:not(.horizontal)").addClass("sub-level");
  $('a[href^="mailto:"]').addClass("mailto");
  $('a[href$=".pdf"]').addClass("pdflink");
  $('a[href^="http"][href*="henry"]').addClass("henrylink");
  $("tr:nth-child(odd)").addClass("alt");

  // $('tr').filter(':even').addClass('alt');
  $("td:contains(Henry)").nextAll().addBack().addClass("highlight"); // next(), nextAll()
  $('a').filter(function () {
    return this.hostname && this.hostname != location.hostname;
  }).addClass('external');

  // $("td:contains('Tragedy')").addClass("special")
  $('a[href$=".pdf"]').parent().parent().addClass('tragedy');
  
 
});
