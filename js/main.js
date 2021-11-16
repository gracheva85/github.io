import './form.js';
import './map.js';
import './avatar.js';
import {onMapLoad} from './map.js';
import {getData} from './api.js';
import {changeFromStateEnabled, filterChildrens} from './form.js';
import {filterAndRender, onFilterChange, onFilterReset} from './filter.js';
import {debounce} from './utils.js';
import {createDownloadMessage} from './popups.js';

const URL_GET_DATA = 'https://24.javascript.pages.academy/keksobooking/data';

onMapLoad(
  getData(
    URL_GET_DATA,
    (data) => {
      filterAndRender(data);
      changeFromStateEnabled(false, filterChildrens);
      onFilterChange(debounce(
        () => filterAndRender(data),
      ));
      onFilterReset(debounce(
        () => filterAndRender(data),
      ));
    },
    createDownloadMessage,
  ));
