const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return hash;
};

const intToRGB = (i: number): string => {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
};

const getBrightness = (color: string): number => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  return r * 0.299 + g * 0.587 + b * 0.114;
};

const Avatar = ({ name, size }: { name: string; size: string }) => {
  const hash = hashCode(name);
  const bgColor = `#${intToRGB(hash)}`;
  const textColor = getBrightness(bgColor) > 128 ? "black" : "white";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div
      className={`${size} rounded-full flex items-center justify-center text-sm font-bold shrink-0`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
