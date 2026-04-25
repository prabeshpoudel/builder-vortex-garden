interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormInput({ label, ...props }: Props) {
  return (
    <label className="space-y-1 block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-600 focus:outline-none"
        {...props}
      />
    </label>
  );
}
