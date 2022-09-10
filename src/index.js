function showToast() {

}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function handleClickUploadBtn() {
  const checkerDoms = document.querySelectorAll('.download-slices__scales .ten-checkbox input');
  let targetDom = null
  const checkValues = [];

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

  console.log('finalImageUrl:', finalImageUrl)
  showToast('finalImageUrl:' + finalImageUrl)

  // TODO
  // fetch('url', () => {
  //   // 上传链接写入粘贴板
  //   // 提示上传成功
  // });
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
  uploadBtn.innerHTML = '上传图片'
  uploadBtn.addEventListener('click', handleClickUploadBtn)

  insertAfter(downloadBtn, uploadBtn)
})
