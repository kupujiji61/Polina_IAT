define(['questAPI'], function (Quest) {
    let API = new Quest();

    /********* Страница *********/
    API.addPagesSet('resultsPage', {
        noSubmit: false,
        header: 'Результаты теста скрытых ассоциаций',
        decline: false,
        autoFocus: true,
        progressBar: 'Страница <%= pagesMeta.number %> из 1',
        submitText: 'Далее'
    });

    /********* Блок с результатами *********/
    API.addQuestionsSet('resultsInfo', {
        type: 'info',
        name: 'iat_results_info',
        autoSubmit: false,
        decline: false,

        stem: function () {
            // 1. Достаём глобальные данные, которые мы записали в iat10_ru.js
            let g = API.getGlobal() || {};
            let r = g.raceiat || {};

            // Пробуем привести D-score к числу
            let dNum = Number(r.d);
            let fb   = r.feedback || '';

            let hasNumeric = !isNaN(dNum);
            let dDisplay   = hasNumeric ? dNum.toFixed(2) : '—';
            let absD       = hasNumeric ? Math.abs(dNum) : NaN;

            // 2. Определяем силу эффекта
            let magnitude;
            if (!hasNumeric) {
                magnitude = 'нельзя надёжно определить (результат не был корректно рассчитан)';
            } else if (absD < 0.15) {
                magnitude = 'почти нет эффекта';
            } else if (absD < 0.35) {
                magnitude = 'слабый эффект';
            } else if (absD < 0.65) {
                magnitude = 'умеренный эффект';
            } else {
                magnitude = 'сильный эффект';
            }

            // 3. Собираем HTML-текст
            let html = '';

            html += '<p class="lead"><b>Ваш результат по тесту скрытых ассоциаций</b></p>';
            html += '<p><b>D-score:</b> ' + dDisplay + '</p>';
            html += '<p><b>Сила эффекта:</b> ' + magnitude + '</p>';

            if (fb) {
                html += '<p>' + fb + '</p>';
            } else {
                html += '<p>Интерпретация результата отсутствует или не была рассчитана.</p>';
            }

            html += '<hr>';

            // 4. Объяснение сути IAT
            html += '<p><b>Что измеряет этот тест?</b></p>';
            html += '<p>Тест имплицитных ассоциаций (Implicit Association Test, IAT) измеряет скорость, с которой человек ' +
                    'соотносит разные категории (например, Полину и «хорошее») со словами и картинками.</p>';

            html += '<p>Предполагается, что чем быстрее вы реагируете, когда вместе появляются «согласующиеся» для вас ' +
                    'сочетания (например, Полина + приятные слова), тем сильнее автоматическая связь между ними.</p>';

            html += '<p>Положительное значение D-score означает более быструю реакцию при сочетании Полины с «хорошим» ' +
                    'по сравнению с альтернативными сочетаниями. Отрицательное значение — наоборот.</p>';

            html += '<p>Чем больше по модулю значение D-score, тем сильнее выражена ассоциация. Значения, близкие к 0, ' +
                    'говорят о том, что заметного перекоса в скорости реакций между сравниваемыми парами нет.</p>';

            // 5. Шкала интерпретации по модулю D
            html += '<p><b>Как интерпретировать величину D-score?</b></p>';
            html += '<ul>';
            html += '<li>|D| &lt; 0.15 — почти нет эффекта</li>';
            html += '<li>0.15 ≤ |D| &lt; 0.35 — слабый эффект</li>';
            html += '<li>0.35 ≤ |D| &lt; 0.65 — умеренный эффект</li>';
            html += '<li>|D| ≥ 0.65 — сильный эффект</li>';
            html += '</ul>';

            return html;
        }
    });

    /********* Последовательность *********/
    API.addSequence([
        {
            inherit: 'resultsPage',
            questions: { inherit: 'resultsInfo' }
        }
    ]);

    return API.script;
});
