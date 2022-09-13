const container = document.getElementById('uploadImageChecker')
const uploadImageCheckerInput = document.getElementById('uploadImageCheckerInput')

container.addEventListener('click', () => {
  uploadImageCheckerInput.checked = !uploadImageCheckerInput.checked
  chrome.storage.sync.set({ ZA_CODESIGN_COMPRESS: uploadImageCheckerInput.checked ? '1' : '0' })
});

uploadImageCheckerInput.addEventListener('click', (evt) => {
  evt.stopPropagation()
  chrome.storage.sync.set({ ZA_CODESIGN_COMPRESS: evt.target.checked ? '1' : '0' })
})
