$(document).ready(function () {
  // Elements
  const promptContainer = $(".install-prompt");
  const skipButton = promptContainer.find(".install-prompt__button--skip");
  const installButton = promptContainer.find(".install-prompt__button--install");
  const iosInstructions = $("#iosInstructions");
  const closeModal = $(".ios-modal__close");

  // Initialize deferredPrompt for use later to show browser install prompt.
  let deferredPrompt;

  // Check if iOS Safari
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  if (isIOS && isSafari) {
    if (!navigator.standalone) {
        showInstallPromotion();

        // Show instructions on Install button click
        installButton.on("click", () => {
            iosInstructions.removeClass("instructions--hidden");
        });

        // Hide instructions on Close button click
        closeModal.on("click", () => {
            iosInstructions.addClass("instructions--hidden");
        });

        // Listen for app installed event on iOS
        window.addEventListener("hashchange", () => {
            if (navigator.standalone) {
                hideInstallPromotion();
            }
        });
    }
} else {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      showInstallPromotion();
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);

      listenToUserAction();
    });

    // Listen for appinstalled event
    window.addEventListener('appinstalled', () => {
        // Hide the app-provided install promotion
        hideInstallPromotion();
        // Clear the deferredPrompt so it can be garbage collected
        deferredPrompt = null;
        // Optionally, send analytics event to indicate successful install
        console.log('PWA was installed');
    });

    // Listen for user action
    function listenToUserAction() {
      installButton.on("click", async (e) => {
        e.preventDefault();
        // Hide the app provided install promotion
        hideInstallPromotion();
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
      });
    }

    // Check if running in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      hideInstallPromotion();
    }
  }

  // Listen for skip button click
  skipButton.on("click", () => {
    hideInstallPromotion();
  });

  // Show install promotion
  function showInstallPromotion() {
    promptContainer.removeClass("prompt--hidden");

    // Adjust other elements when install prompt is present
    $(".sidebar .logo").css({marginBottom: 0})
    $(".sidebar .nav").css({marginTop: 0})
  }

  // Hide install promotion
  function hideInstallPromotion() {
    promptContainer.addClass("prompt--hidden");
  }
});
