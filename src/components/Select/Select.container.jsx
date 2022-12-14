import { Select as Component } from "./Select.component";
import "./Select.styles.css";

export function Select(props) {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <Component
      label="Sort by:"
      name="sortBy"
      onChange={handleChange}
      options={[
        { value: "id", label: "Choose one" },
        { value: "energyLevel", label: "energy-level" },
      ]}
    />
  );
}
