const UPLOAD_BTN_NORMAL_TEXT = '上传当前切图'
const UPLOAD_BTN_LOADING_TEXT = '上传中...'
const UPLOAD_API = 'http://localhost:8083/api/uploadCosPic'

function showToast(text) {
  const toastDom = document.createElement('div')
  toastDom.setAttribute('class', 'zhenai__toast')
  toastDom.innerHTML = text
  document.body.appendChild(toastDom)

  setTimeout(() => {
    toastDom.classList.add('zhenai-animate__fadein')
  }, 0)

  setTimeout(() => {
    toastDom.classList.remove('zhenai-animate__fadein')
    toastDom.classList.add('zhenai-animate__fadeout')
    setTimeout(() => {
      document.body.removeChild(toastDom)
    }, 1000)
  }, 3000)
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function handleClickUploadBtn(evt) {
  const btn = evt.target
  const checkerDoms = document.querySelectorAll('.download-slices__scales .ten-checkbox input');
  let targetDom = null
  const checkValues = []

  checkerDoms.forEach((item) => {
    if (item.checked) {
      targetDom = item
      checkValues.push(item.value);
    }
  })

  if (!checkValues.length) {
    alert('请勾选上传图片');
    return;
  }

  if (checkValues.length > 1) {
    alert('一次只能上传一张图片');
    return;
  }

  // https://cdn3.codesign.qq.com/dcloud/attachments/2022/04/24/2867be21a0825945b010454984f99409-o.png?imageMogr2/thumbnail/700x650/interlace/1
  const imageSrc = document.querySelector('.node-box__content .thumb img').getAttribute('src')
  const rawImageSrc = imageSrc.split('?imageMogr2')[0]

  // https://cdn3.codesign.qq.com/dcloud/attachments/2022/04/24/feb9a55daeb3a6ce77df056e370967f1-o.png?imageMogr2/thumbnail/200x200/quality/40/format/webp
  const thumbnail = targetDom.parentElement.parentElement.querySelector('small')
    .innerText
    .replace(/px|\s+/g, '')
  const qualityMatcher = document.querySelector('.download-slices .download-slices__quality .ten-input__input-input')
    .value
    .match(/\d+/g, '')
  const quality = qualityMatcher ? qualityMatcher[0] : 100;
  const format = document.querySelector('.download-slices .download-slices__format .ten-input__input-input')
    .value
    .toLowerCase()

  const imageParams = [
    `thumbnail/${ thumbnail }`,
    `quality/${ quality }`,
    `format/${ format }`,
  ].join('/')

  const finalImageUrl = `${ rawImageSrc }?imageMogr2/${ imageParams }`

  btn.classList.add('zhenai__upload-btn--disable')
  btn.innerHTML = UPLOAD_BTN_LOADING_TEXT

  chrome.storage.sync.get('ZA_CODESIGN_COMPRESS', ({ ZA_CODESIGN_COMPRESS }) => {
    fetch(UPLOAD_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: finalImageUrl,
        compress: ZA_CODESIGN_COMPRESS !== '0',
      }),
    }).then(response => response.json())
      .then(({ data }) => {
        return navigator.clipboard.writeText(data.picUrl)
      })
      .then(() => {
        showToast('切图上传成功，链接已保存到剪贴板')
      })
      .catch((error) => {
        alert(`上传失败：${JSON.stringify(error)}`)
      })
      .finally(() => {
        btn.classList.remove('zhenai__upload-btn--disable')
        btn.innerHTML = UPLOAD_BTN_NORMAL_TEXT
      })
  });
}

window.addEventListener('click', function handleClickLayer(evt) {
  const uploadBtnDom = document.querySelector('#zaUploadBtn')

  if (uploadBtnDom) {
    return
  }

  const downloadBtn = document.querySelector('.download-slices__confirm-button')

  if (!downloadBtn) {
    return
  }

  const uploadBtn = document.createElement('div')

  uploadBtn.id = 'zaUploadBtn'
  uploadBtn.setAttribute('class', 'zhenai__upload-btn')
  uploadBtn.innerHTML = UPLOAD_BTN_NORMAL_TEXT
  uploadBtn.addEventListener('click', handleClickUploadBtn)

  insertAfter(downloadBtn, uploadBtn)
})
