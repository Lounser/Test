document.getElementById('abuseTest').addEventListener('submit', function(event) {
    event.preventDefault();

    let totalScore = 0;
    const questions = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13', 'question14'];
    const maxScore = questions.length * 5; // Максимальный балл

    questions.forEach((question) => {
        const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
        if (selectedOption) {
            totalScore += parseInt(selectedOption.value);
        }
    });

    // Проверка, что все вопросы пройдены
    const unansweredQuestions = questions.filter(q => !document.querySelector(`input[name="${q}"]:checked`));

    if (unansweredQuestions.length > 0) {
        const firstUnanswered = unansweredQuestions[0];
        document.getElementById(firstUnanswered).scrollIntoView({ behavior: 'smooth' });
        alert(`Пожалуйста, ответьте на вопрос ${firstUnanswered.replace('question', '')}.`);
        return;
    }

    // Расчет процента
    const percentage = (totalScore / maxScore) * 100;

    displayResult(totalScore, percentage);
});

function displayResult(score, percentage) {
    const resultDiv = document.getElementById('result');
    const myChart = document.getElementById('myChart');
    const percentageDiv = document.getElementById('percentage');
    let resultText = '';

    if (percentage <= 10) {
        resultText = 'Я не проявляю абьюзивное поведение.';
    } else if (percentage <= 30) {
        resultText = 'Некоторые мои действия могут вызывать беспокойство.';
    } else {
        resultText = 'Я проявляю абьюзивное поведение. Это может оказать негативное влияние на мои отношения.';
    }

    resultDiv.innerHTML = resultText + "<br><br>";
    resultDiv.style.opacity = 1; // Показать результат

    percentageDiv.textContent = `Ваш результат: ${percentage.toFixed(2)}%`;
    percentageDiv.style.display = 'block'; // Показать процент

    // Построение графика
    buildChart(questions.map(q => parseInt(document.querySelector(`input[name="${q}"]:checked`).value)), score);
}

function buildChart(data, score) {
    const myChart = document.getElementById('myChart');

    // Отображаем график
    myChart.style.display = 'block';

    const chartData = {
        labels: ['Вопрос 1', 'Вопрос 2', 'Вопрос 3', 'Вопрос 4', 'Вопрос 5', 'Вопрос 6', 'Вопрос 7', 'Вопрос 8', 'Вопрос 9', 'Вопрос 10', 'Вопрос 11', 'Вопрос 12', 'Вопрос 13', 'Вопрос 14'],
        datasets: [{
            label: 'Оценка',
            data: data,
            backgroundColor: 'rgba(76, 175, 80, 0.5)',
            borderColor: 'rgba(76, 175, 80, 1)',
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Оценка'
                    }
                }
            }
        }
    };

    new Chart(myChart, config);
}