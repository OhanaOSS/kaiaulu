
import { urlBuilder } from './contentHelper';
it('urlBuilder can correctly process options', () => {
  expect(urlBuilder({
    parent_id: 1,
    parent_type: "comments",
    request_type: "comment_replys"
  })).toBe("/v1/comments/1/comment_replys")
});