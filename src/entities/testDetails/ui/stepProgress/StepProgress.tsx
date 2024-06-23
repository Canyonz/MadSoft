import { Box, Paper } from "@mui/material";

interface StepProgressProps {
	activeStep: number;
	length: number;
}

export const StepProgress = ({ activeStep, length }: StepProgressProps) => {
	return (
		<Box display="flex" gap="4px">
			{new Array(length).fill("").map((_, index) => (
				<Paper
					key={index}
					elevation={0}
					square
					sx={{
						width: "50px",
						height: "8px",
						bgcolor:
							activeStep === index
								? "var(--bgColorStepsActive)"
								: activeStep > index
								? "var(--bgColorStepsAnswereds)"
								: "var(--bgColorSteps)",
						transition: "background-color 0.3s",
					}}
				/>
			))}
		</Box>
	);
};
