import { TestDetails, TestDetailsI } from "@/entities/testDetails";
import { Box } from "@mui/material";

const testDetailsData: TestDetailsI = {
	name: "Знакомство с миром",
	time: 5 * 60000,
	descriptions:
		"Этот тест состоит из вопросов по разным предметам. Он поможет оценить ваши знания и понимание основных концепций в этих областях. В тесте представлены вопросы с выбором одного или нескольких вариантов ответа, а также вопросы, требующие короткого или развернутого ответа. Это отличная возможность проверить себя и понять, в каких областях вам нужно уделить больше внимания. Удачи!",
	questions: [
		{
			type: "text",
			text: 'Кто написал роман "Анна Каренина"?',
			answerType: "one choise",
			answers: ["Лев Толстой", "Фёдор Достоевский", "Иван Тургенев", "Антон Чехов"],
			rightAnswers: "Лев Толстой",
		},
		{
			type: "text",
			text: "Какие из этих чисел являются простыми?",
			answerType: "multiple choice",
			answers: ["11", "12", "17", "21"],
			rightAnswers: ["11", "17"],
		},
		{
			type: "text",
			text: "Какой химический элемент имеет атомный номер 8?",
			answerType: "short answer",
			answers: "",
			rightAnswers: "Кислород",
		},
		{
			type: "text",
			text: "Что такое фотосинтез?",
			answerType: "detailed answer",
			answers: "",
			rightAnswers:
				"Фотосинтез - это процесс, с помощью которого растения, водоросли и некоторые бактерии преобразуют солнечный свет в энергию, необходимую для производства питательных веществ. При этом углекислый газ и вода превращаются в глюкозу и кислород",
		},
		{
			type: "text",
			text: "Какие планеты входят в состав нашей солнечной системы?",
			answerType: "multiple choice",
			answers: ["Меркурий", "Венера", "Марс", "Юпитер", "Сатурн", "Уран", "Нептун"],
			rightAnswers: ["Меркурий", "Венера", "Марс", "Юпитер", "Сатурн", "Уран"],
		},
	],
};

export const TestDetailsPage = () => {
	return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Box width="80%" height="600px">
				<TestDetails test={testDetailsData} />
			</Box>
		</Box>
	);
};
