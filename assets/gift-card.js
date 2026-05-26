(function () {
  function initGiftCard() {
    var qrCodeElement = document.querySelector('.gift-card__qr-code');
    if (qrCodeElement && typeof QRCode !== 'undefined') {
      var qrImageAlt = qrCodeElement.dataset.qrImageAlt || '';
      new QRCode(qrCodeElement, {
        text: qrCodeElement.dataset.identifier,
        width: 72,
        height: 72,
        imageAltText: qrImageAlt
      });
    }

    var copyButton = document.querySelector('.gift-card__copy-button');
    var copySuccess = document.querySelector('.gift-card__copy-success');
    var template = document.getElementsByTagName('template')[0];
    var clonedTemplate = template ? template.content.cloneNode(true) : null;
    var isMessageDisplayed = false;

    if (copyButton && copySuccess && clonedTemplate) {
      copyButton.addEventListener('click', function () {
        navigator.clipboard.writeText(document.getElementById('gift-card-code').innerText).then(function () {
          if (!isMessageDisplayed) {
            copySuccess.appendChild(clonedTemplate.cloneNode(true));
            isMessageDisplayed = true;
          }
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGiftCard, { once: true });
  } else {
    initGiftCard();
  }
})();
