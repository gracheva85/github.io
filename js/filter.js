import {filterForm} from './form.js';
import {renderMarkers} from './map.js';

const RENTS_MAX = 10;
const DEFAULT_VALUE = 'any';

const PriceLevel = {
  LOW: {
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
  },
};

const filterType = (advertisement) => {
  const typeValue = filterForm.querySelector('#housing-type').value;
  return typeValue === advertisement.offer.type || typeValue === DEFAULT_VALUE;
};

const filterPrice = (advertisement) => {
  const priceValue = filterForm.querySelector('#housing-price').value;
  switch (priceValue) {
    case 'low': return advertisement.offer.price < PriceLevel.LOW.MAX;
    case 'middle': return advertisement.offer.price >= PriceLevel.MIDDLE.MIN && advertisement.offer.price < PriceLevel.MIDDLE.MAX;
    case 'high': return advertisement.offer.price >= PriceLevel.HIGH.MIN;
    case 'any': return true;
    default: return false;
  }
};

const filterRooms = (advertisement) => {
  const roomsValue = filterForm.querySelector('#housing-rooms').value;
  return roomsValue === advertisement.offer.rooms.toString() || roomsValue === DEFAULT_VALUE;
};

const filterGuests = (advertisement) => {
  const guestsValue = filterForm.querySelector('#housing-guests').value;
  return guestsValue === advertisement.offer.guests.toString() || guestsValue === DEFAULT_VALUE;
};

const filterFeatures = (advertisement) => {
  const selectedFeatures = Array.from(filterForm.querySelectorAll('#housing-features input:checked'));
  if (!advertisement.offer.features) {
    return false;
  }
  const featuresValues = selectedFeatures.map((element) => element.value);
  const filter = featuresValues.filter((item) => advertisement.offer.features.includes(item));
  return featuresValues.length === filter.length;
};

const filterAndRender = (advertisements) => {
  const getAllFilterInput = (advertisement) => {
    const inputFiltres = [
      filterType,
      filterPrice,
      filterRooms,
      filterGuests,
      filterFeatures,
    ];
    return inputFiltres.every((input) => input(advertisement));
  };

  const filteredRents = [];
  for (const element of advertisements) {
    if (getAllFilterInput(element)) {
      filteredRents.push(element);
    }
    if (filteredRents.length >= RENTS_MAX) {
      break;
    }
  }

  renderMarkers(filteredRents);
};

const onFilterChange = (cb) => filterForm.addEventListener('change', () => {
  cb();
});

const onFilterReset = (cb) => filterForm.addEventListener('reset', () => {
  cb();
});

export {filterAndRender, onFilterChange, onFilterReset};

