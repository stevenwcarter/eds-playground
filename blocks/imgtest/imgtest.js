import { createMultiOptimizedPicture } from '@stevenwcarter/img-optimizer-eds';

const decorate = async (block) => {
  const [images] = block.children;
  const [mobileImageEl, desktopImageEl] = images.children;

  const mobileImageUrl = mobileImageEl.querySelector('img').getAttribute('src');
  const desktopImageUrl = desktopImageEl.querySelector('img').getAttribute('src');
  images.innerHTML = '';

  const p = document.createElement('p');
  p.textContent = 'This image will switch between mobile/desktop version at 900px screen width';
  images.parentElement.prepend(p);

  const pictureEl = createMultiOptimizedPicture([
    { src: mobileImageUrl, breakpoints: [{ width: 900 }] },
    { src: desktopImageUrl, breakpoints: [{ media: '(min-width: 900px)', width: 2000 }] },
  ]);
  images.appendChild(pictureEl);
};

export default decorate;
