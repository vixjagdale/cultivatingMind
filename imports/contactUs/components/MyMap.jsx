import React, { Component } from 'react';
import { Session } from 'meteor/session';
import GoogleMap from './lib/GoogleMap';

if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load({ v: '3', key: 'AIzaSyCJqwWlbj_vSx57CgmCslM-zm04VkpwSa8', libraries: 'geometry,places' });
  });
}

class MyMap extends Component {
  constructor() {
    super();
    this.handleOnReady = this.handleOnReady.bind(this);
  }

  handleMapOptions() {
    return {
      center: new google.maps.LatLng(18.6337715,73.8034543),
      zoom: 12,
    };
  }

  handleOnReady(name) {
    GoogleMaps.ready(name, map => {
      Tracker.autorun(c => {

        marker1 = new google.maps.Marker({

          draggable             : false,
          animation             : google.maps.Animation.DROP,
          position              : new google.maps.LatLng(18.6337715,73.8034543),
          map                   : map.instance,
          id                    : '123',
          title                 : "ECSystems",
          icon                  : '../images/mappin.png',
          navigationControl     : true,
          mapTypeControl        : true,
          mapTypeControlOptions : {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
          mapTypeId             : google.maps.MapTypeId.ROADMAP,
        });

        this.computation = c;
      });
    });
  }

  componentWillUnmount() {
    this.computation.stop();
  }

  render() {
    return (
      <GoogleMap
        onReady={this.handleOnReady}
        mapOptions={this.handleMapOptions}
      >
        Loading!
      </GoogleMap>
    );
  }
}

export default MyMap;