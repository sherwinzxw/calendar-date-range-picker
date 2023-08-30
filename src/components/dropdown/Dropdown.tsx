import { useEffect, useRef, useState } from "react";
import "./Dropdown.scss";
import classNames from "classnames";
import useComponentVisible from "hooks/useComponentVisible";
import listenForOutsideClicks from "utils/misc/Listener";

const Dropdown = (props: any, ...rest: any) => {
  const { id, label, options, defaultValue = "Please select" } = props;

  const { ref, isComponentVisible } = useComponentVisible(true);
  const [value, setValue] = useState<any>(defaultValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = (isOpen: boolean) => {
    return setIsOpen(!isOpen);
  };

  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  useEffect(
    listenForOutsideClicks(listening, setListening, menuRef, setIsOpen)
  );
  return (
    <div id={id} className="nsw-custom-dropdown" ref={menuRef}>
      <div
        className={classNames({
          "nsw-custom-dropdown__label": true,
          active: isOpen,
        })}
        onClick={() => {
          toggle(isOpen);
        }}
      >
        {value}
      </div>
      <div
        className={classNames({
          "nsw-custom-dropdown__options": true,
          active: isOpen,
        })}
      >
        {options.map((option: any, index: number) => {
          return (
            <span
              key={index}
              className={classNames({
                selected: option.value === value,
                disabled: option.disabled,
              })}
              data-value={option.value}
              onClick={(e) => {
                setValue(e.currentTarget.getAttribute("data-value"));
                props.handleSelectionCallback(e.currentTarget.getAttribute("data-value"));
                setIsOpen(false);
              }}
            >
              {option.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
