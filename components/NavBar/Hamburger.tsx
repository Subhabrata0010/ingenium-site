
interface AnimatedHamburgerButtonProps {
  onToggle: () => void;
  toggled: boolean;
  className?: string;
}

const AnimatedHamburgerButton = ({ onToggle, toggled, className = "" }: AnimatedHamburgerButtonProps) => {

  return (
    <button
      className={`group inline-flex w-12 h-12 text-slate-800 bg-transparent text-center items-center justify-center transition ${className}`}
      aria-pressed={toggled}
      onClick={onToggle}
    >
      <span className="sr-only">Menu</span>
      <svg className="w-6 h-6 fill-current pointer-events-none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <rect
          className="origin-center -translate-y-1.25 translate-x-1.75 transition-all duration-300  group-aria-pressed:translate-x-0 group-aria-pressed:translate-y-0 group-aria-pressed:rotate-315"
          y="7"
          width="9"
          height="2"
          rx="1"
        ></rect>
        <rect
          className="origin-center transition-all duration-300 group-aria-pressed:rotate-45"
          y="7"
          width="16"
          height="2"
          rx="1"
        ></rect>
        <rect
          className="origin-center translate-y-1.25 transition-all duration-300  group-aria-pressed:translate-y-0 group-aria-pressed:rotate-135"
          y="7"
          width="9"
          height="2"
          rx="1"
        ></rect>
      </svg>
    </button>
  )
}

export default AnimatedHamburgerButton

