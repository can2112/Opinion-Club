// components/CommentSection.tsx
"use client";
import { useEffect, useState } from "react";
import { firestore } from "../../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  increment,
} from "firebase/firestore";

interface Comment {
  id: string;
  text: string;
  likes: number;
  createdAt: any;
}

interface Reply {
  id: string;
  text: string;
  createdAt: any;
}

interface CommentSectionProps {
  marketId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ marketId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    const commentsRef = collection(firestore, "markets", marketId, "comments");
    const q = query(commentsRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setComments([]);
        return;
      }
      const fetchedComments = snapshot?.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setComments(fetchedComments);
    });

    return unsubscribe;
  }, [marketId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const commentsRef = collection(firestore, "markets", marketId, "comments");
    await addDoc(commentsRef, {
      text: newComment,
      createdAt: serverTimestamp(),
      likes: 0,
    });

    setNewComment("");
  };

  const handleLike = async (commentId: string) => {
    const commentRef = doc(
      firestore,
      "markets",
      marketId,
      "comments",
      commentId
    );

    await updateDoc(commentRef, {
      likes: increment(1),
    });
  };

  const handleReply = async (commentId: string, replyText: string) => {
    if (!replyText.trim()) return;

    const repliesRef = collection(
      firestore,
      "markets",
      marketId,
      "comments",
      commentId,
      "replies"
    );

    await addDoc(repliesRef, {
      text: replyText,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <div>
      <h3>Comments</h3>
      <div>
        {comments?.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              marketId={marketId}
              onLike={() => handleLike(comment.id)}
              onReply={(replyText) => handleReply(comment.id, replyText)}
            />
          );
        })}
      </div>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Post Comment</button>
    </div>
  );
};

interface CommentProps {
  comment: Comment;
  marketId: string;
  onLike: () => void;
  onReply: (replyText: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  marketId,
  onLike,
  onReply,
}) => {
  const [replyText, setReplyText] = useState<string>("");
  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    const repliesRef = collection(
      firestore,
      "posts",
      marketId,
      "comments",
      comment.id,
      "replies"
    );
    const q = query(repliesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReplies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Reply[];
      setReplies(fetchedReplies);
    });

    return unsubscribe;
  }, [comment.id, marketId]);

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #ddd",
      }}
    >
      <p>{comment.text}</p>
      <button onClick={onLike}>Like ({comment.likes || 0})</button>
      <div>
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write a reply..."
        />
        <button
          onClick={() => {
            onReply(replyText);
            setReplyText("");
          }}
        >
          Reply
        </button>
      </div>

      <div style={{ marginLeft: "20px" }}>
        {replies.map((reply) => (
          <div
            key={reply.id}
            style={{ padding: "5px", borderBottom: "1px solid #eee" }}
          >
            <p>{reply.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
