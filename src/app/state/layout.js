const DEFAULT_STATE = {
  burgerMenuHidden: false,
};

const types = {
  BURGER_MENU_HIDE: 'LAYOUT.BURGER_MENU_HIDE',
  BURGER_MENU_SHOW: 'LAYOUT.BURGER_MENU_SHOW',
};

function layoutReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.BURGER_MENU_HIDE:
      return { ...state, burgerMenuHidden: true };
    case types.BURGER_MENU_SHOW:
      return { ...state, burgerMenuHidden: false };
    default:
      return state;
  }
}

const selectors = {
  isBurgerMenuHidden: state => state.layout.burgerMenuHidden,
};

const actions = {
  toggleBurgerMenu: isHidden => {
    if (typeof isHidden === 'boolean') {
      return { type: isHidden ? types.BURGER_MENU_SHOW : types.BURGER_MENU_HIDE };
    }
  },
};

export default { layoutReducer, types, selectors, actions };
