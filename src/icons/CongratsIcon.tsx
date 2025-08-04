import type {ISvgIconProps} from './interface';

const CongratsIcon = (props: ISvgIconProps) => {
  return (
    <svg
      {...props}
      width="80"
      height="78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="26.882" cy="75.914" fill="#252424" r="1.505" />
      <circle cx="52.473" cy="73.549" fill="#252424" r=".43" />
      <circle cx="4.301" cy="57.204" fill="#252424" r="2.151" />
      <circle cx="41.075" cy="39.355" r="30.323" fill="#252424" />
      <path
        d="M38.25 43.667a2.668 2.668 0 00-1.916-1.916l-8.18-2.11a.668.668 0 010-1.282l8.18-2.111a2.667 2.667 0 001.916-1.915l2.109-8.18a.666.666 0 011.284 0l2.108 8.18a2.666 2.666 0 001.916 1.916l8.18 2.108a.666.666 0 010 1.286l-8.18 2.108a2.666 2.666 0 00-1.916 1.916l-2.11 8.18a.667.667 0 01-1.283 0l-2.108-8.18zM51.667 27v5.333M54.333 29.667H49M30.333 45.667v2.666M31.667 47H29"
        stroke="#FFA8DB"
        stroke-width="2.667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="71.183" cy="69.032" fill="#252424" r="1.075" />
      <circle cx="73.333" cy="47.527" r="1.075" fill="#252424" />
      <circle cx=".43" cy="32.258" fill="#252424" r=".43" />
      <circle cx="76.775" cy="11.828" fill="#252424" r="3.226" />
      <circle cx="45.807" cy="1.936" fill="#252424" r="1.075" />
      <circle cx="8.602" cy="4.301" fill="#252424" r="4.301" />
    </svg>
  );
};

export default CongratsIcon;
