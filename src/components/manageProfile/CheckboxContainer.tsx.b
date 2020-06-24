//import checkboxes from './checkboxes';
// Checkbox from './Checkbox';
import React, {useState, useEffect} from "react";

interface IProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange(value: boolean): void;
}

const CheckboxContainer: React.FC = ({  }) => {
  const [checkedItems, setCheckedItems] = useState(new Map());
/*
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: new Map(),
    }

    this.handleChange = this.handleChange.bind(this);
  }
*//*
  const handleChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
   // setCheckedItems(prevState => ({  prevState.checkedItems.setCheckedItems(item, isChecked) }));
  }*/
    return (
      <React.Fragment>
        {
          /** checkboxes.map(item => (
            <label key={item.key}>
              {item.name}
              <Checkbox name={item.name} checked={checkedItems.get(item.name)} onChange={handleChange} />
            </label>
          ))
          **/
        }
      </React.Fragment>
    );
  }

export default CheckboxContainer;