import { useState } from "react";

const CommentsSection = ({ post, onCommentSubmit, onReplySubmit }) => {
    const [newComment, setNewComment] = useState("");
    const [reply, setReply] = useState({ commentId: null, text: "" });

    const handleReplyChange = (commentId, text) => {
        setReply({ commentId, text });
    };

    return (
        <div>
            {/* New Comment */}
            <div className="space-y-2">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-2 border rounded"
                />
                <button
                    onClick={() => {
                        if (!newComment.trim()) return;
                        onCommentSubmit(post._id, newComment);
                        setNewComment("");
                    }}
                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Comment
                </button>
            </div>

            {/* Comments */}
            {post.comments && post.comments.length === 0 ? (
                <p className="text-white/90">No comments yet.</p>
            ) : (
                post.comments.map((comment) => (
                    <div key={comment._id} className="space-y-2">
                        <div className="flex items-center gap-2 mt-6">
                            <img
                                className="h-10 w-10 rounded-full"
                                src={`http://localhost:3000/public/images/user-avatars/${comment.userId.avatar}`}
                                alt="Profile Avatar"
                            />
                            <p className="text-white/90">{comment && comment.content}</p>
                        </div>

                        {/* Reply to Comment */}
                        <div className="pl-4 space-y-4">
                            <input
                                type="text"
                                value={reply.commentId === comment._id ? reply.text : ""}
                                onChange={(e) => handleReplyChange(comment._id, e.target.value)}
                                placeholder="Reply..."
                                className="w-full p-2 border rounded"
                            />
                            <button
                                onClick={() => {
                                    if (!reply.text.trim()) return;
                                    onReplySubmit(post._id, comment._id, reply.text);
                                    setReply({ commentId: null, text: "" });
                                }}
                                className="px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                            >
                                Reply
                            </button>

                            {/* List Replies */}
                            {comment.replies && comment.replies.map((reply) => (
                                <div key={reply._id} className="pl-4">
                                    <p>{reply.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CommentsSection;