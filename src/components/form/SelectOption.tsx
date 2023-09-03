import Form from "./Form";
import RequiredFieldTip from "./RequiredFieldTip";

interface Props {
  name: string;
  label: string;
  value: string;
  options: any;
  required?: boolean;
  onChange: (event: any) => void;
}

export default class SelectOption extends Form<Props> {
  handleChange = (e: any) => {
    this.props.onChange(e);
  };

  render() {
    let { name, label, value, options, required } = this.props;

    return (
      <>
        <label htmlFor={name}>
          {label}
          <> {required && <RequiredFieldTip />}</>
        </label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => {
            this.handleChange(e);
          }}
        >
          {Object.values(options).map((item: any) => (
            <option
              className="select-option-item"
              key={item.value}
              value={item.value}
            >
              {item.text}
            </option>
          ))}
        </select>
      </>
    );
  }
}
