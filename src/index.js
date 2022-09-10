function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function handleClickUploadBtn() {
  const doms = document.querySelectorAll('.download-slices__scales .ten-checkbox input');
  let targetDom = null
  const checkValues = [];

  doms.forEach((item) => {
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
  const rawImageSrc = imageSrc.slice('?imageMogr2')[0]

  // https://cdn3.codesign.qq.com/dcloud/attachments/2022/04/24/feb9a55daeb3a6ce77df056e370967f1-o.png?imageMogr2/thumbnail/200x200/quality/40/format/webp
  const thumbnail = targetDom.parentElement.parentElement.querySelector('small').innerText.replace(/px|\s+/g, '')
  const qualityText = document.querySelector('.download-slices .download-slices__item .ten-input__input-input').value
  const matcher = qualityText.match(/\d+/g, '')
  const format = document.querySelector('.download-slices .download-slices__type .ten-input__input-input').value.trim()

  const imageParams = [
    `thumbnail/${ thumbnail }`,
    `matcher/${ matcher ? matcher[0] : 100 }`,
    `format/${ format }`,
  ].join('/')

  const finalImageUrl = `${ rawImageSrc }?imageMogr2/${ imageParams }`

  console.log('finalImageUrl:', finalImageUrl)

  // TODO
  // fetch('url', () => {
  //   // 上传链接写入粘贴板
  //   // 提示上传成功
  // });
}

window.addEventListener('click', function handleClickLayer(evt) {
  const classText = evt.target.getAttribute('class')
  // 可能要异步判断，selected 应该是点击后 codesign 加上去的
  const isClickLayer = classText.includes('selected') && classText.includes('layer')

  if (isClickLayer) {
    const uploadBtnDom = document.querySelector('#zaUploadBtn')

    if (uploadBtnDom) {
      return
    }

    const downloadBtn = document.querySelector('.download-slices__confirm-button')
    const uploadBtn = document.createElement('div')

    uploadBtn.id = 'zaUploadBtn'
    uploadBtn.style = 'margin-top: 20px;'
    uploadBtn.innerHTML = '上传图片'
    uploadBtn.addEventListener('click', handleClickUploadBtn)

    insertAfter(downloadBtn, uploadBtn)
  }
})
