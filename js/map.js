import {completeAdvertisement} from './card.js';
import {changeFromStateEnabled, adFormChildrens} from './form.js';

const MAP_SIZE = 13;
const SRC_MAIN_PIN = 'img/main-pin.svg';
const SRC_PIN = 'img/pin.svg';
const NUMBERS_AFTER_POINT = 5;

const Tokio = {
  LAT: 35.68172,
  LNG: 139.75392,
};

const MainMarkerDetails = {
  SIZE: [52, 52],
  ANCOR: [26, 52],
};

const IconDetails = {
  SIZE: [40, 40],
  ANCOR: [20, 40],
};

const adressInput = document.querySelector('#address');

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: SRC_MAIN_PIN,
  iconSize: MainMarkerDetails.SIZE,
  iconAnchor: MainMarkerDetails.ANCOR,
});

const mainPinMarker = L.marker(
  {
    lat: Tokio.LAT,
    lng: Tokio.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const coordinates = Object.values(evt.target.getLatLng());
  adressInput.value = `${coordinates[0].toFixed(NUMBERS_AFTER_POINT)}, ${coordinates[1].toFixed(NUMBERS_AFTER_POINT)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const renderMarkers = (advertisements) => {
  markerGroup.clearLayers();
  advertisements
    .forEach((advertisement) => {
      const {lat, lng} = advertisement.location;
      const icon = L.icon({
        iconUrl: SRC_PIN,
        iconSize: IconDetails.SIZE,
        iconAnchor: IconDetails.ANCOR,
      });

      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon: icon,
        },
      );
      marker
        .addTo(markerGroup)
        .bindPopup(completeAdvertisement(advertisement));
    });
};

const resetMapAndMarker = () => {
  mainPinMarker.setLatLng({
    lat: Tokio.LAT,
    lng: Tokio.LNG,
  });
  map.setView({
    lat: Tokio.LAT,
    lng: Tokio.LNG,
  }, MAP_SIZE,
  );
  map.closePopup();
};

const onMapLoad = (cb) => {
  map
    .on('load', () => {
      changeFromStateEnabled(false, adFormChildrens);
      cb;
    })
    .setView({
      lat: Tokio.LAT,
      lng: Tokio.LNG,
    }, MAP_SIZE,
    );

};

export {resetMapAndMarker, renderMarkers, onMapLoad};
