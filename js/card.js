import {changeTitleByNumber} from './utils.js';

const Translator = {
  BUNGALOW: 'Бунгало',
  FLAT: 'Квартира',
  HOTEL: 'Отель',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
};

const contentTemplate = document.querySelector('#card').content;
const cardTemplate = contentTemplate.querySelector('.popup');

const hidden = (content, elementClassName) => {
  if (content === '') {
    elementClassName.style.display = 'none';
  }
};

const completeAdvertisement = (createAdvertisement) =>  {
  const advertisementElement = cardTemplate.cloneNode(true);
  const photoContainer = advertisementElement.querySelector('.popup__photos');
  const photoTemplate = photoContainer.querySelector('.popup__photo');
  const featureList = advertisementElement.querySelectorAll('.popup__feature');
  const featureContainer = advertisementElement.querySelector('.popup__features');

  const getPhotos = () => {
    const photos = createAdvertisement.offer.photos;
    if (!photos) {
      return photoContainer.remove();
    } else {
      photoContainer.innerHTML = '';
      photos.forEach((photo) => {
        const clonePhoto = photoTemplate.cloneNode(true);
        clonePhoto.src = photo;
        photoContainer.appendChild(clonePhoto);
      });
    }
  };

  getPhotos();

  const getFeatures = () => {
    const features = createAdvertisement.offer.features;
    if (!features) {
      return featureContainer.remove();
    } else {
      const modifiers = features.map((feature) => `popup__feature--${feature}`);
      featureList.forEach((featureListItem) => {
        const modifier = featureListItem.classList[1];
        if (!modifiers.includes(modifier)) {
          featureListItem.remove();
        }
      });
    }
  };

  getFeatures();

  const roomAndGuest = `${createAdvertisement.offer.rooms} ${changeTitleByNumber(createAdvertisement.offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${createAdvertisement.offer.guests} ${changeTitleByNumber(createAdvertisement.offer.guests, ['гостя', 'гостей', 'гостей'])}`;

  advertisementElement.querySelector('.popup__avatar').src = createAdvertisement.author.avatar;
  advertisementElement.querySelector('.popup__title').textContent = createAdvertisement.offer.title;
  advertisementElement.querySelector('.popup__text--address').textContent = createAdvertisement.offer.address;
  advertisementElement.querySelector('.popup__text--price').textContent = `${createAdvertisement.offer.price} ₽/ночь`;
  advertisementElement.querySelector('.popup__type').textContent = Translator[createAdvertisement.offer.type.toUpperCase()];
  advertisementElement.querySelector('.popup__text--capacity').textContent = roomAndGuest;
  advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${createAdvertisement.offer.checkin}, выезд до ${createAdvertisement.offer.checkout}`;
  advertisementElement.querySelector('.popup__description').textContent = createAdvertisement.offer.description;

  hidden(createAdvertisement.author.avatar,advertisementElement.querySelector('.popup__avatar'));
  hidden(createAdvertisement.offer.address, advertisementElement.querySelector('.popup__text--address'));
  hidden(createAdvertisement.offer.type, advertisementElement.querySelector('.popup__type'));
  hidden(createAdvertisement.offer.rooms, advertisementElement.querySelector('.popup__text--capacity'));
  hidden(createAdvertisement.offer.guests, advertisementElement.querySelector('.popup__text--capacity'));
  hidden(createAdvertisement.offer.checkin, advertisementElement.querySelector('.popup__text--time'));
  hidden(createAdvertisement.offer.checkout, advertisementElement.querySelector('.popup__text--time'));
  hidden(createAdvertisement.offer.description, advertisementElement.querySelector('.popup__description'));

  return advertisementElement;
};

export {completeAdvertisement};
