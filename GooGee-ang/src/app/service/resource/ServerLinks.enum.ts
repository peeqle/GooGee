export enum ServerLinks {
  TOKEN_REFRESH_REQUEST = "/api/v1/auth/refresh",
  LOGIN_REQUEST = "/api/v1/auth/authenticate",
  REGISTER_REQUEST = "/api/v1/auth/register",
  CHATS_REQUEST = "/api/v1/chat",
  ROOMS_REQUEST = "/api/v1/room",
  SEARCH_REQUEST = "/api/v1/search",
  USER_REQUEST = "/api/v1/user",
  USER_POST_REQUEST = "/api/v1/user/posts/save",
  USER_CURRENT_REQUEST = "/api/v1/user/fetch/current",
  APPLICATION_AUTH_PREFIX = "/api/v1/auth"
}
