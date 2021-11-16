const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const BASE_IMG_CONTENT = '<img src="img/muffin-grey.svg" alt="Аватар пользователя" width="40" height="44">';

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const imageChooser = document.querySelector('#images');
const imagePreview = document.querySelector('.ad-form__photo');

const getPreview = (fileChooser, preview) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const image = document.createElement('img');
        image.src = reader.result;
        image.width = 40;
        image.height = 44;
        preview.style.padding = '0 15px';
        preview.style.alignItems = 'center';
        preview.style.display = 'flex';
        preview.textContent = '';
        preview.appendChild(image);
      });
      reader.readAsDataURL(file);
    }
  });
};

const resetImages = () => {
  avatarPreview.innerHTML = BASE_IMG_CONTENT;
  imagePreview.textContent = '';
};

getPreview(avatarChooser, avatarPreview);
getPreview(imageChooser, imagePreview);

export {resetImages};
