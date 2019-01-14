---
---
$(document).ready(function () {
    $.get('{{ site.baseurl }}/VERSION', null, function(data, textStatus) {
        $('#version-number-display').text(data);
    }, 'text');
});
