// textExtractor.js

(function (window) {
  var TextExtractor = {
    extractAndPrint: function () {
      var elements = document.querySelectorAll(
        "p:not([data-extracted]), div:not([data-extracted]), span:not([data-extracted])"
      );
      elements.forEach(function (element) {
        console.log(element.textContent.trim());
        element.setAttribute("data-extracted", "true"); // Mark as processed
      });
    },

    observeDOMChanges: function () {
      var observer = new MutationObserver((mutations) => {
        // Use debounce to limit how often extractAndPrint is called
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          this.extractAndPrint();
        }, 500); // Adjust the timeout as needed
      });

      var config = { childList: true, subtree: true };
      observer.observe(document.body, config);
    },

    init: function () {
      this.extractAndPrint();
      this.observeDOMChanges();
    },
  };

  // Initialize when DOM is fully loaded
  window.addEventListener("DOMContentLoaded", function () {
    if (window.TextExtractor === undefined) {
      window.TextExtractor = TextExtractor;
      TextExtractor.init();
    }
  });
})(window);
