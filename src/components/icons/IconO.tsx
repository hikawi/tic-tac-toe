export default function IconO(props: {
  className?: string;
  classList?: Record<string, boolean>;
}) {
  return (
    <svg
      viewBox={"0 0 64 64"}
      xmlns="http://www.w3.org/2000/svg"
      class={props.className}
      classList={props.classList}
    >
      <path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" />
    </svg>
  );
}
