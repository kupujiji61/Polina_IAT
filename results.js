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

        stem: [
            '<% ',
            '  var r = {};',
            '  if (typeof global !== "undefined" && global && global.raceiat) {',
            '      r = global.raceiat;',
            '  } else if (typeof window !== "undefined" && window.global && window.global.raceiat) {',
            '      r = window.global.raceiat;',
            '  }',

            '  var dRaw = null;',
            '  if (r.d !== undefined && r.d !== null) {',
            '      dRaw = r.d;',
            '  }',

            '  var dNum = Number(dRaw);',
            '  var fb = r.feedback || "Интерпретация отсутствует";',
            '%>',

            '<h3>Ваш результат</h3>',

            '<p><b>D-score:</b> ',
            '<code><%= (dRaw === null ? "не рассчитан" : String(dRaw)) %></code></p>',

            '<p><b>D-score как число:</b> ',
            '<code><%= (isNaN(dNum) ? "NaN / не число" : dNum.toFixed(2)) %></code></p>',

            '<p><b>Интерпретация:</b><br>',
            '<%= fb %></p>',

            '<hr>',

            '<h3>Техническая информация</h3>',
            '<p><b>Содержимое global.raceiat:</b></p>',
            '<pre style="white-space: pre-wrap; font-size: 12px; background: #f7f7f7; padding: 12px; border: 1px solid #ddd;"><%= JSON.stringify(r, null, 2) %></pre>',

            '<hr>',

            '<p class="lead"><b>Что измеряет этот тест?</b></p>',

            '<p>Тест имплицитных ассоциаций (Implicit Association Test, IAT) измеряет скорость, с которой человек ',
            'соотносит разные категории, например Полину и «хорошее», со словами и картинками.</p>',

            '<p>Предполагается, что чем быстрее вы реагируете, когда вместе появляются «согласующиеся» для вас ',
            'сочетания, например Полина + приятные слова, тем сильнее автоматическая связь между ними.</p>',

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
