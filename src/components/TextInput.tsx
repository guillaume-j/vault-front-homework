import { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes } from 'react';

type Props = Omit<
DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
'onChange'
> & {
  onChange: (value: string) => void;
};

function TextInput(props: Props) {
  const { onChange, ...p } = props;
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => onChange(e.target.value);
  return <input className="border-4 p-2" type="text" onChange={handleChange} {...p} />;
}

export default TextInput;
