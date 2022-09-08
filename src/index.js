function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

window.addEventListener('click', (evt) => {
  const classText = evt.target.getAttribute('class')
  // 可能要异步判断，selected 应该是点击后 codesign 加上去的
  const isClickLayer = classText.includes('selected') && classText.includes('layer')

  if (isClickLayer) {
    const downloadBtn = document.querySelector('.download-slices__confirm-button')
    const uploadBtn = document.createElement('div');
    uploadBtn.style = 'margin-top: 20px;';
    uploadBtn.innerHTML = '上传图片';
    uploadBtn.addEventListener('click', () => {
      const imageThumb = document.querySelector('.node-box__content .thumb img')
      // https://cdn3.codesign.qq.com/dcloud/attachments/2022/04/24/2867be21a0825945b010454984f99409-o.png?imageMogr2/thumbnail/700x650/interlace/1
      const imageSrc = imageThumb.getAttribute('src')
      const rawImageSrc = imageSrc.slice('?imageMogr2')[0]

    })

    insertAfter(downloadBtn, uploadBtn);
  }
})
