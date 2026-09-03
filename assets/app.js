    const body = document.body;
    const themeButton = document.getElementById("themeButton");
    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigation");
    const navigationLinks = navigation.querySelectorAll("a");

    const savedTheme = localStorage.getItem("wasi-theme");

    if (savedTheme === "light") {
      body.classList.add("light-mode");
      themeButton.textContent = "☀️";
    }

    themeButton.addEventListener("click", () => {
      body.classList.toggle("light-mode");

      const isLightMode = body.classList.contains("light-mode");

      themeButton.textContent = isLightMode ? "☀️" : "🌙";

      localStorage.setItem(
        "wasi-theme",
        isLightMode ? "light" : "dark"
      );
    });

    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      body.classList.toggle("menu-open", isOpen);
      menuButton.textContent = isOpen ? "✕" : "☰";
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigationLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        body.classList.remove("menu-open");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu = navigation.contains(event.target);
      const clickedMenuButton = menuButton.contains(event.target);

      if (!clickedInsideMenu && !clickedMenuButton) {
        navigation.classList.remove("open");
        body.classList.remove("menu-open");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
      }
    });

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.13
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

    const sections = document.querySelectorAll("main section");

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          navigationLinks.forEach((link) => {
            const targetId = link
              .getAttribute("href")
              .replace("#", "");

            link.classList.toggle(
              "active",
              targetId === entry.target.id
            );
          });
        });
      },
      {
        rootMargin: "-42% 0px -48% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

    document.getElementById("currentYear").textContent =
      new Date().getFullYear();
