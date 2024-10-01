const noOutlinePath =
  "M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z";
const outlinePath =
  "M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z";

export default function IconO(props: {
  width: number;
  outline?: boolean;
  silver?: boolean;
}) {
  return (
    <svg
      width={props.width}
      height={props.width}
      viewBox={props.outline ? "0 0 66 66" : "0 0 64 64"}
      xmlns="http://www.w3.org/2000/svg"
      classList={{
        "fill-[#F2B137]": !props.outline && !props.silver,
        "stroke-2 stroke-[#F2B137] fill-none": props.outline,
        "fill-[#A8BFC9] stroke-0": props.silver,
      }}
    >
      <path d={props.outline ? outlinePath : noOutlinePath} />
    </svg>
  );
}
