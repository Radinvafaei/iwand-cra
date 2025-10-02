export const TabButton = ({ caption, selected, onClick }) => {
  return (
    <button
      className={`font-semibold relative ${selected ? "text-gray-900 after:h-1 after:bg-[#5C59E8] after:left-0 after:right-0 after:rounded-t-md after:block after:absolute after:top-6" : "text-gray-500"}`}
      onClick={onClick}
    >
      {caption}
    </button>
  );
};
