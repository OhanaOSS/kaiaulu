
const { urlBuilder } = require('./contentHelper');

it('urlBuilder can correctly process options', () => {
  expect(urlBuilder({
    parent_id: 1,
    parent_type: "comments",
    request_type: "comment_reply"
  })).toBe("/v1/comments/1/comment_replys")
});

it('urlBuilder can correctly process options with id', () => {
  expect(urlBuilder({
    parent_id: 1,
    parent_type: "comments",
    request_type: "comment_reply",
    request_id: "1"
  })).toBe("/v1/comments/1/comment_replys/1")
});