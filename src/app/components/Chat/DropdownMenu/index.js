import React from 'react';

function DropdownMenu({ children }) {
  return (
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <button class="dropdown-item disabled" aria-disabled="true" id="changePassword">
        Keisti slaptažodį
      </button>
      <button class="dropdown-item" id="logoutButton">
        Atsijungti
      </button>
    </div>
  );
}

export default DropdownMenu;
