/*
--------------------------------------------------------------------
 MOBILE NAVIGATION
--------------------------------------------------------------------
*/
$(document).ready(function () {
  const $navToggleOpen = $(".nav-toggle-open");
  const $navToggleClose = $(".nav-toggle-close");
  const $mobileNavContainer = $(".mobile-nav-container");

  const hideCloseBtn = () => $navToggleClose.addClass("displayNone");
  const hideOpenBtn = () => $navToggleOpen.addClass("displayNone");
  const showCloseBtn = () => $navToggleClose.removeClass("displayNone");
  const showOpenBtn = () => $navToggleOpen.removeClass("displayNone");

  $mobileNavContainer.on("keydown", (event) => {
    if (event.key === "Esc") {
      closeMobileNav();
      $navToggle.show().focus();
    }
  });

  $navToggleOpen.on("keydown", (event) => {
    if (event.key === "Enter") {
      openMobileNav();
    }
  });

  /**
   * Close the mobile nav and call an optional callback
   * @param {Function} callback
   */
  function closeMobileNav(callback) {
    showOpenBtn();
    hideCloseBtn();
    $mobileNavContainer.fadeOut(200, function () {
      releaseFocusTrap($mobileNavContainer);
      $("body").removeClass("lock-scroll");
      if (typeof callback === "function") callback();
    });
  }

  /**
   * Set a trap focus on the supplied container element, where only the container element's focusable elements can be tabbed between in a loop.
   * @param {JQueryElement} $container
   * @returns
   */
  function trapFocus($container) {
    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      'input[type="text"]:not([disabled])',
      'input[type="radio"]:not([disabled])',
      'input[type="checkbox"]:not([disabled])',
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
      '[role="button"]',
    ];

    const focusableElements = $container
      .find(focusableSelectors.join(","))
      .toArray();

    if (focusableElements.length === 0) return;

    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    $container.on("keydown.focusTrap", function (e) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      } else if (e.key === "Escape") {
        closeMobileNav();
      }
    });

    // restart the tab-loop back at the first element
    firstEl.focus();
  }

  /**
   * Remove the focus trap logic from a container
   * @param {JQueryElement} $container
   */
  function releaseFocusTrap($container) {
    $container.off("keydown.focusTrap");
  }

  // Get a copy of the existing nav element on the page to use for the mobile nav
  const $mobileNav = $(".nav").clone().addClass("mobile-nav-clone");

  // Set acessibility atttributes on the mobile nav
  $mobileNav.attr({
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Mobile navigation menu",
  });

  // Adjust the styles on the copied nav item so that they work better on mobile
  $mobileNav.css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10001,
    display: "block",
    overflowY: "auto",
    padding: "45px",
  });

  $mobileNavContainer.css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10000,
    overflowY: "auto",
    padding: "45px",
    backgroundColor: "#273538",
  });

  // Inject the copied nav menu into the mobile-nav-container
  $mobileNavContainer.append($mobileNav);

  /**
   * Open the mobile navigation
   */
  function openMobileNav() {
    hideOpenBtn();
    showCloseBtn();
    $("body").addClass("lock-scroll");
    $mobileNavContainer.fadeIn(200, function () {
      trapFocus($mobileNavContainer);
    });
  }

  $navToggleOpen.on("click", function () {
    openMobileNav();
  });
  $navToggleClose.on("click", function () {
    closeMobileNav();
  });

  $navToggleClose.on("keydown", function (e) {
    if (["Enter"].includes(e.key)) {
      closeMobileNav();
      $navToggleOpen.focus();
    }
  });

  /**
   * Handle the navigation event (e.g., clicking/tapping on a nav menu item)
   * @param {Event} event
   */
  function handleNavigation(event) {
    const target = $(event.target).attr("href");
    if (target.startsWith("#")) {
      event.preventDefault();
      closeMobileNav(() => {
        $("html, body").animate(
          {
            scrollTop: $(target).offset().top,
          },
          500
        );
      });
    }
  }

  // When an item on with an href value that starts with a "#" close the navigation and scroll to that section
  $mobileNavContainer.on("click", handleNavigation);
  $mobileNavContainer.on("keydown", function (event) {
    if (["Enter"].includes(event.key)) {
      handleNavigation(event);
    }
  });
});
