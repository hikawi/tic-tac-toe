export default function IconX(props: {
  width: number;
  outline?: boolean;
  silver?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={props.width}
      height={props.width}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      class={props.className}
      classList={{
        "fill-[#31C3BD]": !props.outline && !props.silver,
        "stroke-2 stroke-[#31C3BD] fill-[#1A2A33]": props.outline,
        "fill-[#A8BFC9] stroke-0": props.silver,
      }}
    >
      <path
        d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
        fill-rule="evenodd"
      />
    </svg>
  );
}
