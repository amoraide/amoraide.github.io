function launchTab(url){
    var newWindow = window.open(url,'_blank');
    newWindow.focus();
}
//$(document).ready(function () {
function loadSite(url){
    $.ajax({
        type: "GET",
        url: url,
        cache: false,
        dataType: "xml",
        success: function(xml) {
            var current_site = $(xml).find("ref").text();
            $(xml).find('links').each( function(){
                $(this).find('link').each( function(){
                var popup = false;
                var options = $(this).find("options")
                if(options.text() != "")
                {
                        options.children().each(function(){
                            var key = $(this)[0].nodeName;
                            var value = $(this)[0].textContent;
                            switch(key){
                            case "popup":
                                popup = value;
                                break;
                            default:
                                break;
                            }
                        });
                    }
                    var row = $("#link-table")[0].insertRow(-1);
                    var link_name = $(this).find("text").text();
                    var insertTarget;
                    if(popup){
                        insertTarget = "<a target='_top' href='' onclick='launchTab(\""+$(this).find("url").text()+"\")';>"+link_name+"</a>";
                    } else {
                        insertTarget = "<a target='_top' href='"+$(this).find("url").text()+"'>"+link_name+"</a>";
                    }
                    row.insertCell(0).innerHTML = insertTarget;
                    if($(this).find("id").text() == current_site){
                        $(".current-link").each(function() { 
                            $(this).text(link_name);
                        });
                    }
                }); // applies link stuff
            }); // iterates through each link
        } // xml read success
    });
}
  //      });

