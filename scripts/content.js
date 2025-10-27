// Initialize the extension
(function () {
  let sidebarInitialized = false;

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleSidebar") {
      let sidebar = document.getElementById("extension-sidebar");

      if (!sidebarInitialized) {
        sidebar = createSidebar();
        sidebarInitialized = true;
      }

      sidebar.classList.toggle("sidebar-open");

      if (!document.body.contains(sidebar)) {
        document.body.appendChild(sidebar);
      }

      sendResponse({ status: "success" });
    }
    return true; // Will respond asynchronously
  });
})(); // Create and inject sidebar when needed
function createSidebar() {
  const sidebar = document.createElement("div");
  sidebar.id = "extension-sidebar";
  sidebar.innerHTML = `
    <div class="sidebar-header">
      <h2>Quản lý Kết nối MCP</h2>
      <button class="close-btn">&times;</button>
    </div>
    <div class="sidebar-content">
      <div class="card">
        <div class="card-header">
          <div class="card-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3 class="card-title">Local Files</h3>
        </div>
        <p class="card-description">Desktop & Documents</p>
        <div class="card-footer">
          <span class="status-indicator">
            <span class="status-dot"></span>
            Connected
          </span>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 2H3v16h5v4l4-4h5l4-4V2zM11 11V7M16 11V7"></path>
            </svg>
          </div>
          <h3 class="card-title">SharePoint</h3>
        </div>
        <p class="card-description">Corporate Documents</p>
        <div class="card-footer">
          <span class="status-indicator">
            <span class="status-dot"></span>
            Connected
          </span>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8v8M8 12h8"></path>
            </svg>
          </div>
          <h3 class="card-title">Confluence</h3>
        </div>
        <p class="card-description">Wiki & Knowledge Base</p>
        <div class="card-footer">
          <span class="status-indicator">
            <span class="status-dot"></span>
            Connected
          </span>
        </div>
      </div>

      <button class="add-feature">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12h14"></path>
        </svg>
        Thêm kết nối
      </button>
    </div>
  `;
  sidebar.querySelector(".close-btn").addEventListener("click", () => {
    sidebar.classList.remove("sidebar-open");
  });
  return sidebar;
}
