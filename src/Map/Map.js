import * as React from 'react';

export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null
  };

  componentDidMount() {

    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "6los3ML8hKHA5pNUGCzIJRt6Zl3KYlqrY8kxxy8YG6o"
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Bangladesh
        center: { lat: 23.6850, lng: 90.3563 },
        zoom: 6,
        pixelRatio: window.devicePixelRatio || 1
      }
    );
 
    this.setState({ map });
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }

  render() {
    return (
      // Set a height on the map so it will display
      <div ref={this.mapRef} style={{ height: "500px" }} />
    );
  }
}