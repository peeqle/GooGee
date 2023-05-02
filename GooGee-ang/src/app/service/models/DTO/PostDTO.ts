export interface PostDTO {
  content: string,
  createdAt: number | null,
  creatorUser: number | null,
  targetUser: number | null,
  parentPost: number | null;
}
