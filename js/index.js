var members = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", 'cohhcarnage', 'c9sneaky', 'akawonder', 'comster404', 'arnthegreat'];
var memberData = [];
var newName = '';

$.each(members, function(index, member) {
	$.getJSON('https://api.twitch.tv/kraken/users/' + member, function(d) {
		if(d.status == 404) {
      $('#player').append(d.message)
    }
			// Member does not exist
		else {
			var data = [];
			data[0] = member;
			data[1] = d.display_name;
     
			$.getJSON('https://api.twitch.tv/kraken/streams/' + data[0], function(d) {
        
       
			if(d.stream != null) {
        //Establishes a Short-Hand for Status
        streamStat = d.stream.channel.status;
             
var maxLength = 40; // maximum number of characters to extract

//trim the string to the maximum length
var trimmedStat = streamStat.substr(0, maxLength);

//Ensures the short-hand is a full word.
trimmedStat = trimmedStat.substr(0, Math.min(trimmedStat.length, trimmedStat.lastIndexOf(" "))) + "...";
        //Ends Status Editing
        
		 	// user is online
			memberData.push(data[0]);
			$( "#player" ).append( "<img src='"+d.stream.channel.logo+"' id='twitchBio'>" + "<div class='caption'><a target='_blank' href='http://www.twitch.tv/" + data[0] + "'>" + data[1] + "</a>" + " - Viewers: " + d.stream.viewers + "</div><div class='game'> Playing:"+d.stream.game+" </div><div class='status'>"+trimmedStat+"</div>" );
      
      }
			  else {
      //user is offline
				  $( "#offline" ).append( "<img src='http://www.pencilkiller.com/forum/styles/Prototype/imageset/en/icon_user_offline.png' class='detailer'>" + "<a target='_blank' href='http://www.twitch.tv/" + data[0] + "'>" + data[1] + "</a> - Offline<br>" );

				  }
			})
		}
	})
 })
// WIP AREA


   /* function(searchTest){ 
   $('.search').click(function(){
var searcher = $('.search').val

$.getJSON('https://api.twitch.tv/kraken/users/' + searcher + '?callback=?', function(e){
          if (e.status == 404) {}
  else {
            $('#results').append("No one by that name exists");
          }; })})} */
 //End WIP
  
      //Handles the Search functionality. Fully responsive, but 404 isn't responding.
      function search() {
        $('#results').html("");
    var newName = ''
    newName = $('#trialnerror').val();
  $.getJSON('https://api.twitch.tv/kraken/streams/' + newName, function(e){
   if (e.status == 404) {
      console.log(e)
      $('#results').html(e.message)
    }
    
    else if (e.stream == null) {
     $('#results').html("Sorry " + newName + " appears to be offline")
   } else {
     $('#results').html("<img src='"+e.stream.channel.logo+"' id='twitchBio'>  - Viewers: " + e.stream.viewers + "</div><div class='game'> Playing:"+e.stream.game+" </div>" )
   }
    
   }
      
  )};
//Allows 'Enter' to work in search field
$("#trialnerror").keyup(function (e) {
    if (e.keyCode == 13) {
        search();
    }
});   

//End Search