 
var ViewModel = function () { 
  var self = this;
  this.locations = ko.observableArray([ { name: 'King Fahd University of Petroleum and Minerals' , city: 'Dammam' ,type: 'Public'} ,
                                        { name: 'Imam Abdulrahman Bin Faisal university' , city: 'Dammam' ,type: 'Public'} ,
                                        { name: 'Arab Open University', city: 'Dammam' , type: 'Private'} , 
                                        { name: 'Alasala University', city: 'Dammam' , type: 'Private'} ,
                                        { name: 'Prince Mohammad bin Fahd University', city: 'Dammam' , type: 'Private'} ,
                                        { name: 'King Saud bin Abdulaziz University for Health Sciences', city: 'Riyadh' , type: 'Public'},
                                        { name: 'Princess Nora bint Abdul Rahman University', city: 'Riyadh' , type: 'Public'},
                                        { name: 'King Saud University', city: 'Riyadh' , type: 'Public'},
                                        { name: 'Imam Muhammad ibn Saud Islamic University', city: 'Riyadh' , type: 'Public'},
                                        { name: 'Dar Al Uloom University' , city: 'Riyadh' , type: 'Private'} , 
                                        { name: 'Al Yamamah University' , city: 'Riyadh' , type: 'Private'} , 
                                        { name: 'Alfaisal University' , city: 'Riyadh', type: 'Private'} , 
                                        { name: 'Arab Open University' , city: 'Riyadh' , type: 'Private'},
                                        { name: 'Prince Sultan University', city: 'Riyadh' , type: 'Private'},
                                        { name: 'King Abdulaziz University', city: 'Jeddah' , type: 'Public'},
                                        { name: 'Effat University', city: 'Jeddah' , type: 'Private'},
                                        { name: 'Dar Al-Hekma University', city: 'Jeddah' , type: 'Private'},
                                      ]);

  this.cities = ko.observableArray(['Any','Riyadh','Dammam','Jeddah']);
  //this.selectedCity = ko.observable('Riyadh');
  this.selectedCity = ko.observable();
  this.types = ko.observableArray(['Any','Public','Private']);
  //this.selectedType = ko.observable('Private');
  this.selectedType = ko.observable();
  this.selectedUni = ko.observable();

  // open the info box when user click on the item
  self.openInfobox = function(data,event) {
    var place = event.target.getAttribute('name');
    openInfobox(place ,self.selectedType());
  };

  //update markers on the map when user change the dropdown filters
  self.updateMarkers = function () {
    updateMarkers(self.selectedCity(),self.selectedType());
  };

};

ko.applyBindings(new ViewModel());

var map;
var infowindow;
var markers = [];

var places =  [ { position: { lat:26.3070876 ,  lng:50.075902  }, name: 'King Fahd University of Petroleum and Minerals' , city: 'Dammam' ,type: 'Public'} ,
                { position: { lat:26.3855486 ,  lng:50.1829696  }, name: 'Imam Abdulrahman Bin Faisal university' , city: 'Dammam' ,type: 'Public'} ,
                { position: { lat:26.4505516 ,  lng:50.0794869  }, name: 'Arab Open University', city: 'Dammam' , type: 'Private'} , 
                { position: { lat:26.373156 ,  lng:49.973539 }, name: 'Alasala University', city: 'Dammam' , type: 'Private'} ,
                { position: { lat:26.144497 ,   lng:50.0887723  }, name: 'Prince Mohammad bin Fahd University', city: 'Dammam' , type: 'Private'} ,
                { position: { lat:24.7545024 ,  lng:46.8511286  }, name: 'King Saud bin Abdulaziz University for Health Sciences', city: 'Riyadh' , type: 'Public'},
                { position: { lat:24.8464613 ,  lng:46.7225421  }, name: 'Princess Nora bint Abdul Rahman University', city: 'Riyadh' , type: 'Public'},
                { position: { lat:24.716241 ,   lng:46.6169191  }, name: 'King Saud University', city: 'Riyadh' , type: 'Public'},
                { position: { lat:24.8159067 ,  lng:46.6871576  }, name: 'Imam Muhammad ibn Saud Islamic University', city: 'Riyadh' , type: 'Public'},
                { position: { lat:24.7958037 ,  lng:46.7091022  }, name: 'Dar Al Uloom University' , city: 'Riyadh' , type: 'Private'} , 
                { position: { lat:24.8625975 ,  lng:46.5896516  }, name: 'Al Yamamah University' , city: 'Riyadh' , type: 'Private'} , 
                { position: { lat:24.6643015 ,  lng:46.6737777  }, name: 'Alfaisal University' , city: 'Riyadh', type: 'Private'} , 
                { position: { lat:24.7683076 ,  lng:46.5882697  }, name: 'Arab Open University' , city: 'Riyadh' , type: 'Private'},
                { position: { lat:24.7347419 ,  lng:46.6953868  }, name: 'Prince Sultan University', city: 'Riyadh' , type: 'Private'},
                { position: { lat:21.497678 ,   lng:39.2378814 }, name: 'King Abdulaziz University', city: 'Jeddah' , type: 'Public'},
                { position: { lat:21.4784724 ,  lng:39.2087293  }, name: 'Effat University', city: 'Jeddah' , type: 'Private'},
                { position: { lat:21.4886907 ,  lng:39.2283801  }, name: 'Dar Al-Hekma University', city: 'Jeddah' , type: 'Private'},
               ];


function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), { center: {lat: 26.357640,  lng:  50.149741}, zoom: 11 });
  // initlize markers on page load:
  initMarkers();
}

function initMarkers() {
  var intiPlaces = [  { position: { lat:26.3070876 ,  lng:50.075902  }, name: 'King Fahd University of Petroleum and Minerals' , city: 'Dammam' ,type: 'Public'} ,
                { position: { lat:26.3855486 ,  lng:50.1829696  }, name: 'Imam Abdulrahman Bin Faisal university' , city: 'Dammam' ,type: 'Public'} ,
                { position: { lat:26.4505516 ,  lng:50.0794869  }, name: 'Arab Open University', city: 'Dammam' , type: 'Private'} , 
                { position: { lat:26.373156 ,  lng:49.973539 }, name: 'Alasala University', city: 'Dammam' , type: 'Private'} ,
                { position: { lat:26.144497 ,   lng:50.0887723  }, name: 'Prince Mohammad bin Fahd University', city: 'Dammam' , type: 'Private'} ,
                { position: { lat:24.7545024 ,  lng:46.8511286  }, name: 'King Saud bin Abdulaziz University for Health Sciences', city: 'Riyadh' , type: 'Public'},
                { position: { lat:24.8464613 ,  lng:46.7225421  }, name: 'Princess Nora bint Abdul Rahman University', city: 'Riyadh' , type: 'Public'},
                { position: { lat:24.716241 ,   lng:46.6169191  }, name: 'King Saud University', city: 'Riyadh' , type: 'Public'},
                { position: { lat:24.8159067 ,  lng:46.6871576  }, name: 'Imam Muhammad ibn Saud Islamic University', city: 'Riyadh' , type: 'Public'},
                { position: { lat:24.7958037 ,  lng:46.7091022  }, name: 'Dar Al Uloom University' , city: 'Riyadh' , type: 'Private'} , 
                { position: { lat:24.8625975 ,  lng:46.5896516  }, name: 'Al Yamamah University' , city: 'Riyadh' , type: 'Private'} , 
                { position: { lat:24.6643015 ,  lng:46.6737777  }, name: 'Alfaisal University' , city: 'Riyadh', type: 'Private'} , 
                { position: { lat:24.7683076 ,  lng:46.5882697  }, name: 'Arab Open University' , city: 'Riyadh' , type: 'Private'},
                { position: { lat:24.7347419 ,  lng:46.6953868  }, name: 'Prince Sultan University', city: 'Riyadh' , type: 'Private'},
                { position: { lat:21.497678 ,   lng:39.2378814 }, name: 'King Abdulaziz University', city: 'Jeddah' , type: 'Public'},
                { position: { lat:21.4784724 ,  lng:39.2087293  }, name: 'Effat University', city: 'Jeddah' , type: 'Private'},
                { position: { lat:21.4886907 ,  lng:39.2283801  }, name: 'Dar Al-Hekma University', city: 'Jeddah' , type: 'Private'}
                    ];
  infowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  var type;
  var i = 0;
  while ( i < intiPlaces.length) {
    intiPlaces[i].type == 'Private' ? markerLabel = 'orange_MarkerU.png' : markerLabel = 'blue_MarkerU.png';
    //create marker for each palce
    markers[i] = new google.maps.Marker({
      position: intiPlaces[i].position,
      map: map,
      title: intiPlaces[i].name,
      type: intiPlaces[i].type,
      animation: google.maps.Animation.DROP,
      icon: 'markers/' +  markerLabel,  
    });
     
    bounds.extend(markers[i].position);
    addInfowindow(markers[i]);
    i++;
  }
  // to auto center map based on the current markers
   map.fitBounds(bounds);
}

function updateMarkers(city,type) { 

  //remove the current markers on the map
  clearMarkers(); 

  infowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  var i = 0;
  var index = 0;
  var content , markerLabel;

  while (i< places.length) {
    //skip the place if it dose not matche the filteration
    if((places[i].type !== type &&  type !== 'Any') ||  ( places[i].city !== city && city !== 'Any')) { i++ ; continue; }
    // set the marker icon base on the place type
    places[i].type == 'Private' ? markerLabel = 'orange_MarkerU.png' : markerLabel = 'blue_MarkerU.png';
    //create marker for each palce
    markers[index] = new google.maps.Marker({
      position: places[i].position,
      map: map,
      title: places[i].name,
      type: places[i].type,
      animation: google.maps.Animation.DROP,
      icon: 'markers/' + markerLabel,  
    });

    bounds.extend(markers[index].position);
    addInfowindow(markers[index]);
    index++;
    i++;     
  }
  // to auto center map based on the current markers
  map.fitBounds(bounds);
  // map.setZoom(11);
}

function addInfowindow(marker) {
  var name = marker.title;
  var type = marker.type;
  moreInfo(name , function(list){
    // content of the info window 
    content = '<div class="infobox">' +
                '<div class="infobox-type">' + type + ' University</div>' +
                '<div class="infobox-name">' + name + '</div>' +
                '<div class="articles">Read More: <br><ul class="list">'+ list +'</ul></div>' +
                '</div>';
    (function(marker, content) {
      google.maps.event.addListener(marker, "click", function(e) {
      infowindow.setContent(content);
      infowindow.open(marker.get('map'), marker);
      });
    })(marker, content);
  });
}

function clearMarkers() {
  while(markers.length){
    markers.pop().setMap(null);
  }
}

function openInfobox(university, type){

  moreInfo(university , function(list){
    content = '<div class="infobox">' +
            '<div class="infobox-type">' + type + ' University</div>' +
            '<div class="infobox-name">' + university + '</div>' +
            '<div class="articles">Read More: <br><ul class="list">'+ list +'</ul></div>' +
            '</div>';
    for(var i = 0 ; i < markers.length; i++) {
      // to avoid open multiple info window for the same marker
      if(markers[i].title == university) {

        if (markers[i].getAnimation() !== null) {
          markers[i].setAnimation(null);
        } else {
          markers[i].setAnimation(google.maps.Animation.DROP);
        }
        infowindow.setContent(content);
        infowindow.open(map, markers[i]);
      }
    }  
  });
}


function moreInfo(name, callback) {
  var articleStr;
  var url;
  var wikiRequestTimeout = setTimeout(function(){
     list = "faild to get article about " + name;
     if(typeof callback === "function") callback(list);
    },3000);

  var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ name +'&fromat=json&callback=wikiCallback';
    $.ajax({
      url: wikiUrl,
      dataType: "jsonp",
      success: function(response) {
        var articleList = response[1];
        var list = "";
        for ( var i = 0 ; i < articleList.length; i++) {
          articleStr = articleList[i];
          articleStr = articleStr.replace(/ /g, "_");
          url = 'http://en.wikipedia.org/wiki/' + articleStr ;
          list += '<li><a href="'+ url +'">'+ articleStr + '</a></li>';
        }
        if( list === "" ) {
          list = "no article about " + name ;
        }
        clearTimeout(wikiRequestTimeout);
        if(typeof callback === "function") callback(list);
      }
    });  
}


function mapError() {
  alert("Google Maps has failed to load. Please check your internet connection.");
}
    

