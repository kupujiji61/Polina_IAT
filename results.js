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

    /********* Вопрос-«заглушка» с текстом *********/
    API.addQuestionsSet('resultsInfo', {
        type: 'info',
        name: 'iat_results_info',
        autoSubmit: false,
        decline: false,

        // ВАЖНО: это одна строка с EJS-шаблоном
        stem: [
            // --- БЛОК JS: достаём глобальные данные и считаем числа ---
            '<% ',
            '  var r    = (global && global.raceiat) ? global.raceiat : {};',      // весь объект
            '  var dRaw = (typeof r.d !== "undefined") ? r.d : null;',             // то, что туда записали
            '  var dNum = Number(dRaw);',                                          // пытаемся привести к числу
            '  var fb   = r.feedback || "";',                                      // текст интерпретации
            '%>',

            // --- ОТЛАДОЧНЫЙ БЛОК: СОДЕРЖИМОЕ GLOBAL.RACEIAT ---
            '<h3>Техническая информация (для настройки)</h3>',
            '<p><b>Содержимое <code>global.raceiat</code>:</b></p>',
            '<pre><%= JSON.stringify(r, null, 2) %></pre>',

            '<p><b>D-score (сырой, как сохранён в global.raceiat.d):</b> ',
            '<code><%= (dRaw === null ? "null" : String(dRaw)) %></code></p>',

            '<p><b>D-score (как число):</b> ',
            '<code><%= (isNaN(dNum) ? "NaN (не число)" : dNum.toFixed(2)) %></code></p>',

            '<p><b>Интерпретация (feedback):</b><br>',
            '<%= fb || "Интерпретация отсутствует" %></p>',

            '<hr>',

            // --- НОРМАЛЬНОЕ ОБЪЯСНЕНИЕ ДЛЯ УЧАСТНИКА ---
            '<p class="lead"><b>Что измеряет этот тест?</b></p>',
            '<p>Тест имплицитных ассоциаций (Implicit Association Test, IAT) измеряет скорость, с которой человек ',
            'соотносит разные категории (например, Полину и «хорошее») со словами и картинками.</p>',

            '<p>Предполагается, что чем быстрее вы реагируете, когда вместе появляются «согласующиеся» для вас ',
            'сочетания (например, Полина + приятные слова), тем сильнее автоматическая связь между ними.</p>',

            '<p>Положительное значение D-score означает более быструю реакцию при сочетании Полины с «хорошим» ',
            'по сравнению с альтернативными сочетаниями. Отрицательное значение — наоборот.</p>',

            '<p>Чем больше по модулю значение D-score, тем сильнее выражена ассоциация. Значения, близкие к 0, ',
            'показывают, что заметного перекоса в скорости реакций между сравниваемыми парами нет.</p>'
        ].join('')
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
