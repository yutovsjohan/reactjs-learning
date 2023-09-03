import Form from "./Form";
import RequiredFieldTip from "./RequiredFieldTip";

interface Props {
  name: string;
  label: string;
  value: string;
  required?: boolean;
  onChange: (event: any) => void;
}

export default class InputText extends Form<Props> {
  handleChange = (e: any) => {
    this.props.onChange(e);
  };

  render() {
    let { name, label, value, required } = this.props;

    return (
      <>
        <label htmlFor={name}>
          {label}
          <> {required && <RequiredFieldTip />}</>
        </label>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={(e) => {
            this.handleChange(e);
          }}
        />
      </>
    );
  }
}
