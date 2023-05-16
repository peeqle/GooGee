export enum ServerLinks {
  TOKEN_REFRESH_REQUEST = "auth/refresh",
  LOGIN_REQUEST = "auth/authenticate",
  LOGOUT_REQUEST = "auth/logout",
  REGISTER_REQUEST = "auth/register",
  CHATS_REQUEST = "chat",
  CHAT_CREATE_REQUEST = "chat/create",
  ROOMS_REQUEST = "room",
  ROOMS_USER_FETCH_REQUEST = "room/fetch",
  SEARCH_REQUEST = "search",
  USER_REQUEST = "user",
  USER_POST_REQUEST = "user/posts/save",
  USER_CURRENT_REQUEST = "user/fetch/current",
  USER_FETCH_REQUEST = "user/fetch",
  USER_FETCH_FRIENDS_REQUEST = "user/fetch/friends",
  ROOM_CREATE_REQUEST = "room/create",
  APPLICATION_AUTH_PREFIX = "auth"
}
