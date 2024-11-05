/** ----- admin ----- */
// const ADMIN_ROOT = `/admin`;

/** ----- api ----- */
const API_ROOT = `/api`;

// authenticate
const API_AUTHENTICATE = `${API_ROOT}/auth`;
const API_PROFILE = `${API_ROOT}/profile`;
const API_GAME = `${API_ROOT}/game`;

const RouterConfig = {
  auth: '/auth',
  admin: {},
  api: {
    authenticate: {
      register: `${API_AUTHENTICATE}/register`,
      firebase: `${API_AUTHENTICATE}/firebase`,
      service: {
        token: `${API_AUTHENTICATE}/service/token`,
      },
    },
    profile: {
      root: `${API_PROFILE}`,
    },
    game: {
      root: `${API_GAME}`,
    },
  },
};

export default RouterConfig;
