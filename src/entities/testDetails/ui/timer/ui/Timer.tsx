import { Box, SxProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface TimerProps {
	timeTest: number;
	isPlay: boolean;
	interval?: number;
	endTime: () => void;
	sx?: SxProps;
}

export const Timer = ({ timeTest, interval = 1000, isPlay, endTime, sx }: TimerProps) => {
	const [startTimeTest, setStartTimeTest] = useState(Date.now());
	const [curTimeTest, setCurTimeTest] = useState(Date.now());
	const [isRunning, setIsRunning] = useState(false);

	const ms = Math.max(timeTest - (curTimeTest - startTimeTest), 0);
	const seconds = Math.ceil(ms / 1000);

	const minutesString = Math.floor(seconds / 60)
		.toString()
		.padStart(2, "0");

	const secondsString = (seconds % 60).toString().padStart(2, "0");

	useEffect(() => {
		if (!isPlay) return;
		setIsRunning(true);
		setStartTimeTest(Date.now());
		setCurTimeTest(Date.now());
		const timeInterval = setInterval(() => {
			setCurTimeTest(Date.now());
		}, interval);

		return () => clearInterval(timeInterval);
	}, [interval, isPlay]);

	useEffect(() => {
		if (isRunning && ms <= 0) {
			setIsRunning(false);
			endTime();
		}
	}, [endTime, isRunning, ms]);

	return (
		<Box sx={{ p: "4px 10px", border: "1px solid black", borderRadius: "4px", ...sx }}>
			<Typography noWrap={true}>{`${minutesString} : ${secondsString}`}</Typography>
		</Box>
	);
};
