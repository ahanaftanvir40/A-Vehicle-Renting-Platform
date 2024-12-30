import { useEffect, useState } from "react";
import CommentsSection from "../components/CommentsSection";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../store/auth";


const WheelHub = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const { user } = useAuth()








    // Fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/getposts", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                setPosts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, [posts]);

    const handlePostSubmit = async () => {
        if (!newPost.trim()) return;
        try {
            const response = await axios.post("http://localhost:3000/api/posts", { content: newPost }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            setPosts([
                ...posts,
                { ...response.data, comments: [] } // Initialize comments as an empty array
            ]);
            setNewPost(""); // Clear input
            toast.success("Post created successfully!");
        } catch (error) {
            console.error(error);
        }
    };

    const handleCommentSubmit = async (postId, comment) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/posts/${postId}/comments`, { content: comment }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            const newComment = response.data.comments;

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? { ...post, comments: [...post.comments, newComment] }
                        : post
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleReplySubmit = (postId, commentId, reply) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId
                    ? {
                        ...post,
                        comments: post.comments.map((comment) =>
                            comment._id === commentId
                                ? { ...comment, replies: [...comment.replies, { _id: Date.now(), content: reply }] }
                                : comment
                        ),
                    }
                    : post
            )
        );
    };


    return (
        <div className="p-4 max-w-4xl mx-auto space-y-4 min-h-screen">
            {/* New Post */}
            <div className="bg-[#252728] p-4 shadow space-y-2 border-blue-400 rounded-lg max-w-4xl mx-auto">
                <div className="flex gap-2 items-start">
                    <img
                        className="h-12 w-12 rounded-full"
                        src={`http://localhost:3000/public/images/user-avatars/${user.avatar}`}
                        alt="Profile Avatar"
                    />
                    <div className="flex-grow">
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="w-full bg-[#333334] p-4 rounded mb-2 outline-none resize-none text-white/80"
                        />
                        <button
                            onClick={handlePostSubmit}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
                <div key={post._id} className="bg-[#252728] p-4 rounded shadow space-y-4">
                    {/* Post Content */}
                    <div className="flex gap-2 flex-col">
                        <div className="flex gap-2">

                            <img
                                className="h-12 w-12 rounded-full"
                                src={`http://localhost:3000/public/images/user-avatars/${post.userId.avatar}`}
                                alt="Profile Avatar"
                            />
                            <div className="flex flex-col">

                                <h1 className="text-white/90">{user.name}</h1>
                                <h1 className="text-white/90">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at {new Date(post.createdAt).toLocaleTimeString('en-US', { hour: 'numeric' })}</h1>
                            </div>

                        </div>
                        <p className="text-white/90">{post.content}</p>
                    </div>

                    {/* Comments */}
                    <CommentsSection post={post} onCommentSubmit={handleCommentSubmit} onReplySubmit={handleReplySubmit} />
                </div>
            ))}
        </div>
    );
};

export default WheelHub;