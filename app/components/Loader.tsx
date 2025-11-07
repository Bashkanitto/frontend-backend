function Loader() {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 50 50"
      className="flex justify-center items-center h-screen"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="var(--foreground)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="60 120"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
    </svg>
  );
}
export default Loader;
