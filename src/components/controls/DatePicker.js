import React from "react";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {
	const { name, label, value, onChange, className, size, shouldDisableDate } =
		props;

	const convertToDefEventPara = (name, value) => ({
		target: {
			name,
			value,
		},
	});

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				disableToolbar
				inputVariant='outlined'
				label={label}
				format='dd/MM/yyyy'
				shouldDisableDate={shouldDisableDate}
				name={name}
				value={value}
				size={size ? size : "medium"}
				onChange={(date) => onChange(convertToDefEventPara(name, date))}
				style={{ width: "100%" }}
				className={className}
			/>
		</MuiPickersUtilsProvider>
	);
}
