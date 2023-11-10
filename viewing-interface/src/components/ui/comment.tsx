
type CommentProps = {
  author: string;
  content: string;
};

export function Comment({ author, content }: CommentProps) {
  return (
    <div>
      <h1>{author}</h1>
      <h2>{content}</h2>
    </div>
  );
}