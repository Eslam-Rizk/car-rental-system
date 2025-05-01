document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".toggle-sidebar");
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector(".close-sidebar");

    function toggleSidebar() {
        sidebar.classList.toggle("collapsed");
    }

    toggleBtn.addEventListener("click", toggleSidebar);
    closeBtn.addEventListener("click", toggleSidebar);

    // Automatically handle sidebar on resize
    function handleResize() {
        if (window.innerWidth < 992) {
            sidebar.classList.add("collapsed");
            toggleBtn.style.display = "block";
        } else {
            sidebar.classList.remove("collapsed");
            toggleBtn.style.display = "none";
        }
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
        if (window.innerWidth < 992 &&
            !sidebar.contains(e.target) &&
            !toggleBtn.contains(e.target) &&
            !sidebar.classList.contains("collapsed")) {
            toggleSidebar();
        }
    });

    window.addEventListener("resize", handleResize);
    handleResize(); // run initially
});