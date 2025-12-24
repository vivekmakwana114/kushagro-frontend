export const ToggleSwitch = (props) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" {...props} />
      <div className="w-11 h-6 bg-white border border-[var(--color-placeholder-color)] rounded-full peer-checked:bg-[var(--color-primary1)] transition-colors duration-300"></div>
      <div className="absolute left-1 top-1 w-4 h-4 bg-[var(--color-placeholder-color)] peer-checked:bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
    </label>
  );
};
