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
            '<% ',
            '  var r = (typeof global !== "undefined" && global.raceiat) ? global.raceiat : {};',
            '  var dRaw = (r.d !== undefined && r.d !== null) ? r.d : "";',
            '  var dNum = Number(dRaw);',
            '  var fb = r.feedback || "Недостаточно попыток для выявления результатов.";',
            '%>',

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
