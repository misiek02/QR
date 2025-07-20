const styleOptions = {
  classic: {
    dotsOptions: { color: '#000', type: 'square' },
    backgroundOptions: { color: '#fff' },
    cornersSquareOptions: { color: '#000', type: 'square' },
    cornersDotOptions: { color: '#000', type: 'square' }
  },
  rounded: {
    dotsOptions: { color: '#0097a7', type: 'rounded' },
    backgroundOptions: { color: '#fff' },
    cornersSquareOptions: { color: '#0097a7', type: 'extra-rounded' },
    cornersDotOptions: { color: '#0097a7', type: 'dot' }
  },
  dots: {
    dotsOptions: { color: '#4dd0e1', type: 'dots' },
    backgroundOptions: { color: '#fff' },
    cornersSquareOptions: { color: '#0097a7', type: 'dot' },
    cornersDotOptions: { color: '#4dd0e1', type: 'dot' }
  }
};

function getStyleOptions() {
  return {
    classic: {
      dotsOptions: { color: '#000', type: 'square' },
      backgroundOptions: { color: '#fff' },
      cornersSquareOptions: { color: '#000', type: 'square' },
      cornersDotOptions: { color: '#000', type: 'square' }
    },
    rounded: {
      dotsOptions: { color: '#0097a7', type: 'rounded' },
      backgroundOptions: { color: '#fff' },
      cornersSquareOptions: { color: '#0097a7', type: 'extra-rounded' },
      cornersDotOptions: { color: '#0097a7', type: 'dot' }
    },
    dots: {
      dotsOptions: { color: '#4dd0e1', type: 'dots' },
      backgroundOptions: { color: '#fff' },
      cornersSquareOptions: { color: '#0097a7', type: 'dot' },
      cornersDotOptions: { color: '#4dd0e1', type: 'dot' }
    },
    classy: {
      dotsOptions: { color: '#3be8b0', type: 'classy' },
      backgroundOptions: { color: '#fff' },
      cornersSquareOptions: { color: '#00cfc1', type: 'classy' },
      cornersDotOptions: { color: '#3be8b0', type: 'classy' }
    },
    'classy-rounded': {
      dotsOptions: { color: '#00cfc1', type: 'classy-rounded' },
      backgroundOptions: { color: '#fff' },
      cornersSquareOptions: { color: '#3be8b0', type: 'classy-rounded' },
      cornersDotOptions: { color: '#00cfc1', type: 'classy-rounded' }
    },
    'extra-rounded': {
      dotsOptions: { color: '#0097a7', type: 'extra-rounded' },
      backgroundOptions: { color: '#fff' },
      cornersSquareOptions: { color: '#4dd0e1', type: 'extra-rounded' },
      cornersDotOptions: { color: '#0097a7', type: 'extra-rounded' }
    },
    'extra-dots': {
      dotsOptions: { color: '#0097a7', type: 'extra-dots' },
      backgroundOptions: { color: '#fff' },
      cornersSquareOptions: { color: '#4dd0e1', type: 'dot' },
      cornersDotOptions: { color: '#0097a7', type: 'dot' }
    }
  };
}

let currentStyle = 'classic';

const qr = new QRCodeStyling({
  width: 220,
  height: 220,
  type: 'canvas',
  data: '',
  ...getStyleOptions()[currentStyle],
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 8
  }
});

const form = document.getElementById('qr-form');
const input = document.getElementById('qr-input');
const qrCanvas = document.getElementById('qr-canvas');
const styleSelect = document.getElementById('qr-style');
const downloadBtn = document.getElementById('download-btn');
const themeBtn = document.getElementById('toggle-theme');
const colorBg = document.getElementById('color-bg');
const colorDots = document.getElementById('color-dots');
const colorCorners = document.getElementById('color-corners');
const toggleCustomize = document.getElementById('toggle-customize');
const customizeSection = document.getElementById('customize-section');
let customizeOpen = false;
const langSwitch = document.getElementById('lang-switch');
const texts = {
  en: {
    title: 'QR Code Generator',
    input: 'Enter text or URL',
    generate: 'Generate',
    download: 'Download as PNG',
    style: {
      classic: 'Classic (black & white)',
      rounded: 'Rounded',
      dots: 'Dots',
      classy: 'Classy',
      'classy-rounded': 'Classy Rounded',
      'extra-rounded': 'Extra Rounded',
      'extra-dots': 'Extra Dots'
    },
    extra: 'Additional options',
    bg: 'QR background color:',
    dots: 'Dots color:',
    corners: 'Corners color:'
  },
  pl: {
    title: 'Generator Kodów QR',
    input: 'Wpisz tekst lub URL',
    generate: 'Generuj',
    download: 'Pobierz jako PNG',
    style: {
      classic: 'Klasyczny (czarno-biały)',
      rounded: 'Zaokrąglony',
      dots: 'Kropki',
      classy: 'Elegancki',
      'classy-rounded': 'Elegancki zaokrąglony',
      'extra-rounded': 'Bardzo zaokrąglony',
      'extra-dots': 'Bardzo kropkowany'
    },
    extra: 'Dodatkowe opcje',
    bg: 'Kolor tła QR:',
    dots: 'Kolor kropek:',
    corners: 'Kolor rogów:'
  }
};

function animateQR() {
  qrCanvas.style.opacity = 0;
  setTimeout(() => {
    qrCanvas.style.animation = 'none';
    void qrCanvas.offsetWidth;
    qrCanvas.style.animation = null;
    qrCanvas.style.opacity = 1;
  }, 100);
}

function getCustomColors() {
  return {
    backgroundOptions: { color: colorBg.value },
    dotsOptions: { color: colorDots.value },
    cornersSquareOptions: { color: colorCorners.value },
    cornersDotOptions: { color: colorCorners.value }
  };
}

const qrSize = document.getElementById('qr-size');
const qrEC = document.getElementById('qr-ec');
const qrMask = document.getElementById('qr-mask');

function updateQR() {
  const value = input.value.trim();
  if (!value) return;
  qrCanvas.innerHTML = '';
  const style = { ...getStyleOptions()[currentStyle], ...getCustomColors() };
  style.dotsOptions = { ...getStyleOptions()[currentStyle].dotsOptions, color: colorDots.value };
  style.backgroundOptions = { ...getStyleOptions()[currentStyle].backgroundOptions, color: colorBg.value };
  style.cornersSquareOptions = { ...getStyleOptions()[currentStyle].cornersSquareOptions, color: colorCorners.value };
  style.cornersDotOptions = { ...getStyleOptions()[currentStyle].cornersDotOptions, color: colorCorners.value };
  const size = parseInt(qrSize.value, 10);
  const errorCorrectionLevel = qrEC.value;
  qr.update({
    data: value,
    width: size,
    height: size,
    ...style,
    qrOptions: {
      errorCorrectionLevel
    }
  });
  qr.append(qrCanvas);
  animateQR();
}

function setTheme(light) {
  document.body.classList.toggle('light', light);
  themeBtn.textContent = light ? '☀ Tryb ciemny' : '☾ Tryb jasny';
}
let isLight = false;
themeBtn.addEventListener('click', () => {
  isLight = !isLight;
  setTheme(isLight);
  updateQR();
});
setTheme(false);

toggleCustomize.addEventListener('click', () => {
  customizeOpen = !customizeOpen;
  customizeSection.style.display = customizeOpen ? 'flex' : 'none';
  toggleCustomize.textContent = customizeOpen ? 'Dodatkowe opcje ▲' : 'Dodatkowe opcje ▼';
});

function setLang(lang) {
  document.getElementById('title').textContent = texts[lang].title;
  document.getElementById('qr-input').placeholder = texts[lang].input;
  document.getElementById('generate-btn').textContent = texts[lang].generate;
  document.getElementById('download-btn').textContent = texts[lang].download;
  document.getElementById('toggle-customize').textContent = customizeOpen ? texts[lang].extra + ' ▲' : texts[lang].extra + ' ▼';
  document.getElementById('label-bg').childNodes[0].textContent = texts[lang].bg + ' ';
  document.getElementById('label-dots').childNodes[0].textContent = texts[lang].dots + ' ';
  document.getElementById('label-corners').childNodes[0].textContent = texts[lang].corners + ' ';
  // style select
  const styleOptions = document.getElementById('qr-style').options;
  const styleKeys = ['classic','rounded','dots','classy','classy-rounded','extra-rounded','extra-dots'];
  styleKeys.forEach((key, i) => {
    styleOptions[i].textContent = texts[lang].style[key];
  });
}
langSwitch.addEventListener('change', e => {
  setLang(e.target.value);
});
setLang('en');

form.addEventListener('submit', e => {
  e.preventDefault();
  updateQR();
});

input.addEventListener('input', () => {
  qrCanvas.style.opacity = 0.3;
});

styleSelect.addEventListener('change', e => {
  currentStyle = e.target.value;
  // domyślne kolory dla stylu
  if(currentStyle === 'classic') {
    colorBg.value = '#ffffff';
    colorDots.value = '#000000';
    colorCorners.value = '#000000';
  } else if(currentStyle === 'rounded') {
    colorBg.value = '#ffffff';
    colorDots.value = '#0097a7';
    colorCorners.value = '#0097a7';
  } else if(currentStyle === 'dots') {
    colorBg.value = '#ffffff';
    colorDots.value = '#4dd0e1';
    colorCorners.value = '#0097a7';
  } else if(currentStyle === 'classy') {
    colorBg.value = '#ffffff';
    colorDots.value = '#3be8b0';
    colorCorners.value = '#00cfc1';
  } else if(currentStyle === 'classy-rounded') {
    colorBg.value = '#ffffff';
    colorDots.value = '#00cfc1';
    colorCorners.value = '#3be8b0';
  } else if(currentStyle === 'extra-rounded') {
    colorBg.value = '#ffffff';
    colorDots.value = '#0097a7';
    colorCorners.value = '#4dd0e1';
  } else if(currentStyle === 'extra-dots') {
    colorBg.value = '#ffffff';
    colorDots.value = '#0097a7';
    colorCorners.value = '#4dd0e1';
  }
  updateQR();
});

colorBg.addEventListener('input', updateQR);
colorDots.addEventListener('input', updateQR);
colorCorners.addEventListener('input', updateQR);
qrSize.addEventListener('change', updateQR);
qrEC.addEventListener('change', updateQR);
qrMask.addEventListener('change', updateQR);

downloadBtn.addEventListener('click', () => {
  qr.download({ name: 'qr-code', extension: 'png' });
}); 